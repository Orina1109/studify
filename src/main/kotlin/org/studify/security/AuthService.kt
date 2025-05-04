package org.studify.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.studify.model.AuthRequest
import org.studify.model.AuthResponse
import org.studify.model.User
import org.studify.security.token.TokenStorage
import org.studify.service.UserService
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*
import javax.crypto.SecretKey

@Service
class AuthService(
    private val userService: UserService,
    private val tokenStorage: TokenStorage,
    @Value("\${jwt.expiration:86400}") private val jwtExpirationSeconds: Long,
    @Value("\${jwt.issuer:studify}") private val jwtIssuer: String
) {
    // Generate a secure key for signing JWTs
    private val key: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512)
    
    /**
     * Authenticate a user and generate a JWT token
     */
    suspend fun authenticate(authRequest: AuthRequest): AuthResponse? {
        val user = userService.getUserByUsername(authRequest.username) ?: return null
        
        // Verify password hash
        if (user.passwordHash != authRequest.passwordHash) {
            return null
        }
        
        // Update last login time
        userService.updateLastLogin(user.id!!)
        
        // Generate and store token
        val token = generateToken(user)
        val expirationDate = LocalDateTime.now().plusSeconds(jwtExpirationSeconds)
        tokenStorage.saveToken(token, user.id, expirationDate)
        
        return AuthResponse(token, user)
    }
    
    /**
     * Validate a token and return the associated user
     */
    suspend fun validateTokenAndGetUser(token: String): User? {
        try {
            // First check if token exists in storage
            val userId = tokenStorage.getUserIdByToken(token) ?: return null
            
            // Then validate JWT signature and claims
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
            
            // Verify token hasn't expired
            val expiration = Date.from(
                LocalDateTime.now().plusSeconds(jwtExpirationSeconds)
                    .atZone(ZoneId.systemDefault())
                    .toInstant()
            )
            if (claims.expiration.before(Date())) {
                tokenStorage.invalidateToken(token)
                return null
            }
            
            // Verify the user ID in the token matches the one in storage
            val tokenUserId = claims.subject.toLong()
            if (tokenUserId != userId) {
                return null
            }
            
            return userService.getUserById(userId)
        } catch (e: Exception) {
            return null
        }
    }
    
    /**
     * Generate a JWT token for a user
     */
    private fun generateToken(user: User): String {
        val now = Date()
        val expiration = Date(now.time + jwtExpirationSeconds * 1000)
        
        return Jwts.builder()
            .setSubject(user.id.toString())
            .setIssuedAt(now)
            .setExpiration(expiration)
            .setIssuer(jwtIssuer)
            .claim("role", user.role.name)
            .claim("username", user.username)
            .signWith(key)
            .compact()
    }
    
    /**
     * Invalidate a user's token
     */
    suspend fun invalidateToken(token: String) {
        tokenStorage.invalidateToken(token)
    }
    
    /**
     * Invalidate all tokens for a user
     */
    suspend fun invalidateAllUserTokens(userId: Long) {
        tokenStorage.invalidateAllUserTokens(userId)
    }
}