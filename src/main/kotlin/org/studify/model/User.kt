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
    val firstName: String,
    val lastName: String,
    val email: String,
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