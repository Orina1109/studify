package org.studify.model

/**
 * Standard error response for API endpoints
 * @param message Human-readable error message
 * @param code Optional error code for client-side error handling
 * @param details Optional additional details about the error
 */
data class ErrorResponse(
    val message: String,
    val code: String? = null,
    val details: Map<String, Any>? = null
)