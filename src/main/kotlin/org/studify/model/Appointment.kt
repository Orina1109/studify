package org.studify.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "appointments")
data class Appointment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val description: String,

    @Column(nullable = false)
    val appointmentTime: LocalDateTime,

    @Column(nullable = false)
    val meetingLink: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    val teacher: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    val student: User,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)

data class AppointmentRequest(
    val name: String,
    val description: String,
    val appointmentTime: String, // ISO format
    val meetingLink: String,
    val studentId: Long
)

data class AppointmentResponse(
    val id: Long?,
    val name: String,
    val description: String,
    val appointmentTime: String, // ISO format
    val meetingLink: String,
    val teacherId: Long,
    val studentId: Long,
    val createdAt: String
)

data class AppointmentListResponse(
    val id: Long?,
    val name: String,
    val description: String,
    val appointmentTime: String, // ISO format
    val meetingLink: String,
    val teacherName: String,
    val studentId: Long,
    val createdAt: String
)