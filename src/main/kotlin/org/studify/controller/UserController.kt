package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
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
    suspend fun getUserById(@PathVariable id: Long): ResponseEntity<User> {
        val user = userService.getUserById(id)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    suspend fun createUser(@RequestBody user: User): User {
        return userService.addUser(user)
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun updateUser(
        @PathVariable id: Long,
        @RequestBody user: User
    ): ResponseEntity<User> {
        val updatedUser = userService.updateUser(id, user)
        return if (updatedUser != null) {
            ResponseEntity.ok(updatedUser)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    suspend fun deleteUser(@PathVariable id: Long): ResponseEntity<Unit> {
        val deleted = userService.deleteUser(id)
        return if (deleted) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
