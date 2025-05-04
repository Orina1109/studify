package org.studify.security.admin

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.studify.model.AdminToken
import org.studify.repository.AdminTokenRepository

/**
 * Implementation of AdminTokenValidator that validates tokens against the database
 * and tracks used tokens
 */
@Component
class AdminTokenValidatorImpl(
    private val adminTokenRepository: AdminTokenRepository
) : AdminTokenValidator {

    /**
     * Validates if the provided token exists in the database and has not been used
     * @param token The token to validate
     * @return True if the token exists in the database and has not been used, false otherwise
     */
    @Transactional(readOnly = true)
    override fun validateToken(token: String): Boolean {
        val adminToken = adminTokenRepository.findByToken(token) ?: return false
        return !adminToken.used
    }

    /**
     * Checks if a token has been used for admin registration
     * @param token The token to check
     * @return True if the token has been used, false otherwise
     */
    @Transactional(readOnly = true)
    override fun isTokenUsed(token: String): Boolean {
        val adminToken = adminTokenRepository.findByToken(token) ?: return false
        return adminToken.used
    }

    /**
     * Marks a token as used for admin registration by storing it in the database
     * @param token The token to mark as used
     */
    @Transactional
    override fun markTokenAsUsed(token: String) {
        // Check if token already exists
        val existingToken = adminTokenRepository.findByToken(token)

        if (existingToken == null) {
            // Create and save new token with used=true
            val adminToken = AdminToken(
                token = token,
                used = true
            )
            adminTokenRepository.save(adminToken)
        } else if (!existingToken.used) {
            // If token exists but not used, update it
            // Since AdminToken is immutable (data class), we need to create a new instance
            val updatedToken = existingToken.copy(used = true)
            adminTokenRepository.save(updatedToken)
        }
    }
}
