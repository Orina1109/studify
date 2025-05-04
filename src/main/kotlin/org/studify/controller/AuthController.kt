package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.studify.model.AuthRequest
import org.studify.model.AuthResponse
import org.studify.model.RegistrationRequest
import org.studify.security.AuthService

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/login")
    suspend fun login(@RequestBody authRequest: AuthRequest): ResponseEntity<AuthResponse> {
        val authResponse = authService.authenticate(authRequest)

        return if (authResponse != null) {
            ResponseEntity.ok(authResponse)
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }

    @PostMapping("/logout")
    suspend fun logout(@RequestHeader("Authorization") authHeader: String?): ResponseEntity<Unit> {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build()
        }

        val token = authHeader.substring(7) // Remove "Bearer " prefix
        authService.invalidateToken(token)

        return ResponseEntity.ok().build()
    }

    /**
     * Register a new user
     * @param registrationRequest The registration request containing user details
     * @return The newly created user with a JWT token
     */
    @PostMapping("/register")
    suspend fun register(@RequestBody registrationRequest: RegistrationRequest): ResponseEntity<AuthResponse> {
        return try {
            val authResponse = authService.register(registrationRequest)
            ResponseEntity.status(HttpStatus.CREATED).body(authResponse)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }
}
