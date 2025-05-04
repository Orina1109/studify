package org.studify.security.admin

/**
 * Interface for validating admin registration tokens
 */
interface AdminTokenValidator {
    /**
     * Validates if the provided token is a valid admin registration token
     * @param token The token to validate
     * @return True if the token is valid, false otherwise
     */
    fun validateToken(token: String): Boolean

    /**
     * Checks if a token has been used for admin registration
     * @param token The token to check
     * @return True if the token has been used, false otherwise
     */
    fun isTokenUsed(token: String): Boolean

    /**
     * Marks a token as used for admin registration
     * @param token The token to mark as used
     */
    fun markTokenAsUsed(token: String)
}
