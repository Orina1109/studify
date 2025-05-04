package org.studify.model

import java.time.LocalDate

data class Student(
    val id: Long? = null,
    val firstName: String,
    val lastName: String,
    val email: String,
    val birthDate: LocalDate? = null,
    val enrollmentDate: LocalDate = LocalDate.now()
)