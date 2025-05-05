package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.studify.model.AuthRequest
import org.studify.model.AuthResponse
import org.studify.model.ErrorResponse
import org.studify.model.RegistrationRequest
import org.studify.security.AuthService

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/login")
    suspend fun login(@RequestBody authRequest: AuthRequest): ResponseEntity<Any> {
        return try {
            val authResponse = authService.authenticate(authRequest)
            ResponseEntity.ok(authResponse)
        } catch (e: AuthService.UserNotFoundException) {
            val errorResponse = ErrorResponse(
                message = "User does not exist.",
                code = "USER_NOT_EXISTS"
            )
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse)
        } catch (e: AuthService.InvalidCredentialsException) {
            val errorResponse = ErrorResponse(
                message = "Authentication failed. Invalid password.",
                code = "WRONG_CREDENTIALS"
            )
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse)
        } catch (e: Exception) {
            val errorResponse = ErrorResponse(
                message = "An unexpected error occurred during authentication: ${e.message}",
                code = "AUTH_ERROR"
            )
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse)
        }
    }

    @PostMapping("/logout")
    suspend fun logout(@RequestHeader("Authorization") authHeader: String?): ResponseEntity<Any> {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            val errorResponse = ErrorResponse(
                message = "Invalid authorization header. Header must be in format 'Bearer {token}'.",
                code = "INVALID_AUTH_HEADER"
            )
            return ResponseEntity.badRequest().body(errorResponse)
        }

        val token = authHeader.substring(7) // Remove "Bearer " prefix
        authService.invalidateToken(token)

        return ResponseEntity.ok().build()
    }

    /**
     * Register a new user
     * @param registrationRequest The registration request containing user details
     * @return The newly created user with a JWT token or an error response
     */
    @PostMapping("/register")
    suspend fun register(@RequestBody registrationRequest: RegistrationRequest): ResponseEntity<Any> {
        return try {
            val authResponse = authService.register(registrationRequest)
            ResponseEntity.status(HttpStatus.CREATED).body(authResponse)
        } catch (e: IllegalArgumentException) {
            val errorResponse = ErrorResponse(
                message = e.message ?: "Invalid registration request",
                code = "INVALID_REGISTRATION"
            )
            ResponseEntity.badRequest().body(errorResponse)
        } catch (e: Exception) {
            val errorResponse = ErrorResponse(
                message = "An unexpected error occurred during registration: ${e.message}",
                code = "REGISTRATION_ERROR"
            )
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse)
        }
    }
}
