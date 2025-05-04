package org.studify.security.admin

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

/**
 * Default implementation of AdminTokenValidator that validates against a predefined token value
 * This is a placeholder implementation for testing that doesn't actually store used tokens
 */
@Component
class DefaultAdminTokenValidator(
    @Value("\${admin.registration.token}") private val adminToken: String
) : AdminTokenValidator {

    /**
     * Validates if the provided token matches the predefined admin token
     * @param token The token to validate
     * @return True if the token matches the predefined admin token, false otherwise
     */
    override fun validateToken(token: String): Boolean {
        return token == adminToken
    }

    /**
     * Checks if a token has been used for admin registration
     * This is a placeholder implementation that always returns false
     * @param token The token to check
     * @return Always false as this implementation doesn't track token usage
     */
    override fun isTokenUsed(token: String): Boolean {
        // Placeholder implementation that doesn't track token usage
        return false
    }

    /**
     * Marks a token as used for admin registration
     * This is a placeholder implementation that doesn't actually store the token
     * @param token The token to mark as used
     */
    override fun markTokenAsUsed(token: String) {
        // Placeholder implementation that doesn't store tokens
        // No operation needed
    }
}
