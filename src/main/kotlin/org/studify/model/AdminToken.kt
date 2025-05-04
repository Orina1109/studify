package org.studify.model

import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * Entity representing an admin registration token in the database.
 */
@Entity
@Table(name = "admin_tokens")
data class AdminToken(
    @Id
    @Column(length = 500)
    val token: String,
    
    @Column(nullable = false)
    val used: Boolean = false,
    
    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)