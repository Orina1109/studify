package org.studify.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "picked_teachers")
data class PickedTeacher(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    val student: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_question_id", nullable = false)
    val teacherQuestion: TeacherQuestion,

    @Column(nullable = false)
    val picked: Boolean = false,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)