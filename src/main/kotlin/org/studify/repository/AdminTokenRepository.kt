package org.studify.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.studify.model.AdminToken

/**
 * Repository for admin token operations
 */
@Repository
interface AdminTokenRepository : JpaRepository<AdminToken, String> {
    /**
     * Find an admin token by its token string
     * @param token The token string
     * @return The admin token or null if not found
     */
    fun findByToken(token: String): AdminToken?
}