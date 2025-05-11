package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.studify.model.*
import org.studify.service.AppointmentService
import org.studify.service.UserService
import java.time.format.DateTimeFormatter

@RestController
@RequestMapping("/api/appointments")
class AppointmentController(
    private val appointmentService: AppointmentService,
    private val userService: UserService
) {
    private val dateFormatter = DateTimeFormatter.ISO_DATE_TIME

    @PostMapping
    suspend fun createAppointment(@RequestBody request: AppointmentRequest): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        if (user.role != UserRole.TEACHER) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse("Only teachers can create appointments", "FORBIDDEN"))
        }

        try {
            val appointment = appointmentService.createAppointment(user.id!!, request)
            return ResponseEntity.status(HttpStatus.CREATED).body(mapToAppointmentResponse(appointment))
        } catch (e: IllegalArgumentException) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse(e.message ?: "Invalid request", "BAD_REQUEST"))
        }
    }

    @GetMapping("/list")
    suspend fun getAppointmentList(): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        if (user.role != UserRole.STUDENT) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse("Only students can view appointment lists", "FORBIDDEN"))
        }

        try {
            val appointments = appointmentService.getAppointmentsForCurrentAndNextMonth(user.id!!)
            return ResponseEntity.ok(appointments)
        } catch (e: IllegalArgumentException) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse(e.message ?: "Invalid request", "BAD_REQUEST"))
        }
    }

    private fun mapToAppointmentResponse(appointment: Appointment): AppointmentResponse {
        return AppointmentResponse(
            id = appointment.id,
            name = appointment.name,
            description = appointment.description,
            appointmentTime = appointment.appointmentTime.format(dateFormatter),
            meetingLink = appointment.meetingLink,
            teacherId = appointment.teacher.id!!,
            studentId = appointment.student.id!!,
            createdAt = appointment.createdAt.format(dateFormatter)
        )
    }
}