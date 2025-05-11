package org.studify.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.studify.model.AuthRequest
import org.studify.model.AuthResponse
import org.studify.model.RegistrationRequest
import org.studify.model.User
import org.studify.model.UserRole
import org.studify.security.admin.AdminTokenValidator
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
    private val adminTokenValidator: AdminTokenValidator,
    @Value("\${jwt.expiration:86400}") private val jwtExpirationSeconds: Long,
    @Value("\${jwt.issuer:studify}") private val jwtIssuer: String
) {
    // Generate a secure key for signing JWTs
    private val key: SecretKey = Keys.hmacShaKeyFor(byteArrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32))

    /**
     * Authenticate a user and generate a JWT token
     * @return AuthResponse if authentication is successful, null otherwise
     * @throws UserNotFoundException if the user does not exist
     * @throws InvalidCredentialsException if the password is incorrect
     */
    suspend fun authenticate(authRequest: AuthRequest): AuthResponse? {
        val user = userService.getUserByUsername(authRequest.username) 
            ?: throw UserNotFoundException("User with username ${authRequest.username} not found")

        // Verify password hash
        if (user.passwordHash != authRequest.passwordHash) {
            throw InvalidCredentialsException("Invalid password for user ${authRequest.username}")
        }

        // Update last login time
        userService.updateLastLogin(user.id!!)

        // Generate and store token
        val token = generateToken(user)
        val expirationDate = LocalDateTime.now().plusSeconds(jwtExpirationSeconds)
        tokenStorage.saveToken(token, user.id, expirationDate)

        return AuthResponse(token, user)
    }

    class UserNotFoundException(message: String) : Exception(message)
    class InvalidCredentialsException(message: String) : Exception(message)

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
            print(e)
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

    /**
     * Register a new user
     * @param registrationRequest The registration request containing user details
     * @return AuthResponse containing the new user and a JWT token, or null if registration failed
     * @throws IllegalArgumentException if the request is invalid (e.g., missing admin token for ADMIN role)
     */
    suspend fun register(registrationRequest: RegistrationRequest): AuthResponse {
        // Validate admin token for ADMIN role
        if (registrationRequest.role == UserRole.ADMIN) {
            val adminToken = registrationRequest.adminToken
                ?: throw IllegalArgumentException("Admin token is required for ADMIN role")

            if (!adminTokenValidator.validateToken(adminToken)) {
                throw IllegalArgumentException("Invalid admin token")
            }

            // Mark the token as used
            adminTokenValidator.markTokenAsUsed(adminToken)
        }

        // Create user
        val user = User(
            username = registrationRequest.username,
            passwordHash = registrationRequest.passwordHash,
            email = registrationRequest.email,
            role = registrationRequest.role,
            firstName = registrationRequest.firstName,
            lastName = registrationRequest.lastName
        )

        // Add user to database
        val createdUser = userService.addUser(user)

        // Generate and store token
        val token = generateToken(createdUser)
        val expirationDate = LocalDateTime.now().plusSeconds(jwtExpirationSeconds)
        tokenStorage.saveToken(token, createdUser.id!!, expirationDate)

        return AuthResponse(token, createdUser)
    }
}
