package org.studify.security.token

import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.studify.model.Token
import org.studify.repository.TokenRepository
import java.time.LocalDateTime

/**
 * Database implementation of TokenStorage.
 * Uses JPA repository for database operations.
 */
@Component
@Primary
class DatabaseTokenStorage(private val tokenRepository: TokenRepository) : TokenStorage {
    
    @Transactional
    override suspend fun saveToken(token: String, userId: Long, expiresAt: LocalDateTime) {
        val tokenEntity = Token(
            token = token,
            userId = userId,
            expiresAt = expiresAt
        )
        tokenRepository.save(tokenEntity)
    }

    @Transactional(readOnly = true)
    override suspend fun getUserIdByToken(token: String): Long? {
        val tokenEntity = tokenRepository.findByToken(token) ?: return null

        // Check if token has expired
        if (LocalDateTime.now().isAfter(tokenEntity.expiresAt)) {
            invalidateToken(token)
            return null
        }

        return tokenEntity.userId
    }

    @Transactional
    override suspend fun invalidateToken(token: String) {
        tokenRepository.deleteById(token)
    }

    @Transactional
    override suspend fun invalidateAllUserTokens(userId: Long) {
        tokenRepository.deleteAllByUserId(userId)
    }

    @Transactional
    override suspend fun cleanupExpiredTokens() {
        tokenRepository.deleteAllExpired(LocalDateTime.now())
    }
}