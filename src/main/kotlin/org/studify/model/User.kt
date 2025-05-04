package org.studify.model

import jakarta.persistence.*
import java.time.LocalDateTime

enum class UserRole {
    STUDENT,
    TEACHER,
    ADMIN
}

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true, nullable = false)
    val username: String,

    @Column(nullable = false)
    val passwordHash: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val role: UserRole,

    @Column(nullable = false)
    val email: String,

    val firstName: String? = null,
    val lastName: String? = null,

    @Column(nullable = false)
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
