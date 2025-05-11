package org.studify.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.studify.model.Appointment
import org.studify.model.User
import java.time.LocalDateTime

@Repository
interface AppointmentRepository : JpaRepository<Appointment, Long> {
    fun findByTeacher(teacher: User): List<Appointment>
    fun findByStudent(student: User): List<Appointment>
    
    @Query("SELECT a FROM Appointment a WHERE a.student = :student AND a.appointmentTime BETWEEN :startDate AND :endDate ORDER BY a.appointmentTime")
    fun findByStudentAndDateRange(
        @Param("student") student: User,
        @Param("startDate") startDate: LocalDateTime,
        @Param("endDate") endDate: LocalDateTime
    ): List<Appointment>
    
    @Query("SELECT a FROM Appointment a WHERE a.teacher = :teacher AND a.appointmentTime BETWEEN :startDate AND :endDate ORDER BY a.appointmentTime")
    fun findByTeacherAndDateRange(
        @Param("teacher") teacher: User,
        @Param("startDate") startDate: LocalDateTime,
        @Param("endDate") endDate: LocalDateTime
    ): List<Appointment>
}