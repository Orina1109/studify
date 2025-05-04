package org.studify.security.token

import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.util.concurrent.ConcurrentHashMap

/**
 * In-memory implementation of TokenStorage.
 * Uses ConcurrentHashMap for thread-safe operations.
 */
@Component
class InMemoryTokenStorage : TokenStorage {
    private data class TokenInfo(
        val userId: Long,
        val expiresAt: LocalDateTime
    )

    private val tokenStore = ConcurrentHashMap<String, TokenInfo>()

    override suspend fun saveToken(token: String, userId: Long, expiresAt: LocalDateTime) {
        tokenStore[token] = TokenInfo(userId, expiresAt)
    }

    override suspend fun getUserIdByToken(token: String): Long? {
        val tokenInfo = tokenStore[token] ?: return null

        // Check if token has expired
        if (LocalDateTime.now().isAfter(tokenInfo.expiresAt)) {
            invalidateToken(token)
            return null
        }

        return tokenInfo.userId
    }

    override suspend fun invalidateToken(token: String) {
        tokenStore.remove(token)
    }

    override suspend fun invalidateAllUserTokens(userId: Long) {
        tokenStore.entries.removeIf { it.value.userId == userId }
    }

    override suspend fun cleanupExpiredTokens() {
        val now = LocalDateTime.now()
        tokenStore.entries.removeIf { now.isAfter(it.value.expiresAt) }
    }
}