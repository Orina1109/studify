package org.studify.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.studify.model.StudentQuestion
import org.studify.model.User

@Repository
interface StudentQuestionRepository : JpaRepository<StudentQuestion, Long> {
    fun findByUser(user: User): StudentQuestion?
    fun existsByUser(user: User): Boolean
}