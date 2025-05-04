package org.studify.model

import java.time.LocalDateTime

enum class UserRole {
    STUDENT,
    TEACHER,
    ADMIN
}

data class User(
    val id: Long? = null,
    val username: String,
    val passwordHash: String,
    val role: UserRole,
    val email: String,
    val firstName: String? = null,
    val lastName: String? = null,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val lastLogin: LocalDateTime? = null
)

data class AuthRequest(
    val username: String,
    val passwordHash: String
)

data class AuthResponse(
    val token: String,
    val user: User
)

data class RegistrationRequest(
    val username: String,
    val passwordHash: String,
    val email: String,
    val role: UserRole,
    val firstName: String? = null,
    val lastName: String? = null,
    val adminToken: String? = null
)