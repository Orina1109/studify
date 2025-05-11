package org.studify.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.studify.model.*
import org.studify.repository.AppointmentRepository
import org.studify.repository.UserRepository
import java.time.LocalDateTime
import java.time.YearMonth
import java.time.format.DateTimeFormatter

@Service
class AppointmentService(
    private val appointmentRepository: AppointmentRepository,
    private val userRepository: UserRepository
) {
    private val dateFormatter = DateTimeFormatter.ISO_DATE_TIME

    @Transactional
    suspend fun createAppointment(teacherId: Long, request: AppointmentRequest): Appointment {
        val teacher = userRepository.findById(teacherId).orElseThrow {
            IllegalArgumentException("Teacher with ID $teacherId not found")
        }
        
        if (teacher.role != UserRole.TEACHER) {
            throw IllegalArgumentException("User with ID $teacherId is not a teacher")
        }
        
        val student = userRepository.findById(request.studentId).orElseThrow {
            IllegalArgumentException("Student with ID ${request.studentId} not found")
        }
        
        if (student.role != UserRole.STUDENT) {
            throw IllegalArgumentException("User with ID ${request.studentId} is not a student")
        }
        
        val appointmentTime = LocalDateTime.parse(request.appointmentTime, dateFormatter)
        
        val appointment = Appointment(
            name = request.name,
            description = request.description,
            appointmentTime = appointmentTime,
            meetingLink = request.meetingLink,
            teacher = teacher,
            student = student
        )
        
        return appointmentRepository.save(appointment)
    }
    
    @Transactional(readOnly = true)
    suspend fun getAppointmentsForCurrentAndNextMonth(studentId: Long): List<AppointmentListResponse> {
        val student = userRepository.findById(studentId).orElseThrow {
            IllegalArgumentException("Student with ID $studentId not found")
        }
        
        val currentMonth = YearMonth.now()
        val nextMonth = currentMonth.plusMonths(1)
        
        val startDate = currentMonth.atDay(1).atStartOfDay()
        val endDate = nextMonth.atEndOfMonth().atTime(23, 59, 59)
        
        val appointments = appointmentRepository.findByStudentAndDateRange(student, startDate, endDate)
        
        return appointments.map { appointment ->
            AppointmentListResponse(
                id = appointment.id,
                name = appointment.name,
                description = appointment.description,
                appointmentTime = appointment.appointmentTime.format(dateFormatter),
                meetingLink = appointment.meetingLink,
                teacherName = "${appointment.teacher.firstName ?: ""} ${appointment.teacher.lastName ?: ""}".trim(),
                studentId = appointment.student.id!!,
                createdAt = appointment.createdAt.format(dateFormatter)
            )
        }
    }
    
    @Transactional(readOnly = true)
    suspend fun getAppointmentById(id: Long): Appointment? {
        return appointmentRepository.findById(id).orElse(null)
    }
    
    @Transactional
    suspend fun deleteAppointment(id: Long): Boolean {
        if (!appointmentRepository.existsById(id)) {
            return false
        }
        appointmentRepository.deleteById(id)
        return true
    }
}