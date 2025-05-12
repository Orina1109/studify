package org.studify.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.studify.model.PickedTeacher
import org.studify.model.TeacherQuestion
import org.studify.model.User

@Repository
interface PickedTeacherRepository : JpaRepository<PickedTeacher, Long> {
    fun findByStudent(student: User): List<PickedTeacher>
    fun findByStudentAndPicked(student: User, picked: Boolean): List<PickedTeacher>
    fun findByStudentAndTeacherQuestion(student: User, teacherQuestion: TeacherQuestion): PickedTeacher?
    fun existsByStudentAndTeacherQuestion(student: User, teacherQuestion: TeacherQuestion): Boolean
}
