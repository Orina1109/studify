package org.studify.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.studify.model.TeacherQuestion
import org.studify.model.User

@Repository
interface TeacherQuestionRepository : JpaRepository<TeacherQuestion, Long> {
    fun findByUser(user: User): TeacherQuestion?
    fun existsByUser(user: User): Boolean
}