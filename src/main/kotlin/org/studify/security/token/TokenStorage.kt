package org.studify.security.token

import java.time.LocalDateTime

/**
 * Interface for token storage operations.
 * This allows for different implementations (in-memory, database, etc.)
 * following the Dependency Inversion principle.
 */
interface TokenStorage {
    /**
     * Stores a token with the associated user ID and expiration time.
     */
    suspend fun saveToken(token: String, userId: Long, expiresAt: LocalDateTime)

    /**
     * Retrieves the user ID associated with a token.
     * Returns null if the token doesn't exist or has expired.
     */
    suspend fun getUserIdByToken(token: String): Long?

    /**
     * Invalidates a token.
     */
    suspend fun invalidateToken(token: String)

    /**
     * Invalidates all tokens for a specific user.
     */
    suspend fun invalidateAllUserTokens(userId: Long)

    /**
     * Removes expired tokens from storage.
     */
    suspend fun cleanupExpiredTokens()
}