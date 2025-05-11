package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.studify.model.ErrorResponse
import org.studify.model.User
import org.studify.service.UserService

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun getAllUsers(): List<User> = userService.getAllUsers()

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun getUserById(@PathVariable id: Long): ResponseEntity<Any> {
        val user = userService.getUserById(id)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            val errorResponse = ErrorResponse(
                message = "User not found with ID: $id",
                code = "USER_NOT_FOUND"
            )
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse)
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun createUser(@RequestBody user: User): ResponseEntity<Any> {
        return try {
            val createdUser = userService.addUser(user)
            ResponseEntity.status(HttpStatus.CREATED).body(createdUser)
        } catch (e: IllegalArgumentException) {
            val errorResponse = ErrorResponse(
                message = e.message ?: "Invalid user data",
                code = "INVALID_USER_DATA"
            )
            ResponseEntity.badRequest().body(errorResponse)
        } catch (e: Exception) {
            val errorResponse = ErrorResponse(
                message = "An unexpected error occurred while creating user: ${e.message}",
                code = "USER_CREATION_ERROR"
            )
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse)
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun updateUser(
        @PathVariable id: Long,
        @RequestBody user: User
    ): ResponseEntity<Any> {
        val updatedUser = userService.updateUser(id, user)
        return if (updatedUser != null) {
            ResponseEntity.ok(updatedUser)
        } else {
            val errorResponse = ErrorResponse(
                message = "Failed to update user. User not found with ID: $id",
                code = "USER_UPDATE_FAILED"
            )
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse)
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun deleteUser(@PathVariable id: Long): ResponseEntity<Any> {
        val deleted = userService.deleteUser(id)
        return if (deleted) {
            ResponseEntity.noContent().build()
        } else {
            val errorResponse = ErrorResponse(
                message = "Failed to delete user. User not found with ID: $id",
                code = "USER_DELETE_FAILED"
            )
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse)
        }
    }

    @GetMapping("/profile")
    suspend fun getUserProfile(): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name

        val user = userService.getUserByUsername(username)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            val errorResponse = ErrorResponse(
                message = "User profile not found",
                code = "PROFILE_NOT_FOUND"
            )
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse)
        }
    }
}
