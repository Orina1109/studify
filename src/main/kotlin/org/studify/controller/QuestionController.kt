package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.studify.model.*
import org.studify.repository.StudentQuestionRepository
import org.studify.repository.TeacherQuestionRepository
import org.studify.service.UserService
import java.time.format.DateTimeFormatter

@RestController
@RequestMapping("/api/questions")
class QuestionController(
    private val userService: UserService,
    private val teacherQuestionRepository: TeacherQuestionRepository,
    private val studentQuestionRepository: StudentQuestionRepository
) {

    private val dateFormatter = DateTimeFormatter.ISO_DATE_TIME

    @PostMapping("/teacher")
    suspend fun submitTeacherQuestion(@RequestBody request: TeacherQuestionRequest): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        val teacherQuestion = TeacherQuestion(
            user = user,
            name = request.name,
            age = request.age,
            gender = request.gender,
            language = request.language,
            languageLevel = request.languageLevel,
            timezone = request.timezone,
            teachingGoals = request.teachingGoals,
            minStudentLevel = request.minStudentLevel,
            maxStudentLevel = request.maxStudentLevel,
            interests = request.interests,
            teachingFrequency = request.teachingFrequency,
            lessonDuration = request.lessonDuration,
            preferredTime = request.preferredTime,
            lessonPrice = request.lessonPrice,
            teachingStyle = request.teachingStyle,
            feedbackStyle = request.feedbackStyle,
            teachingMethod = request.teachingMethod,
            explanationStyle = request.explanationStyle,
            homeworkApproach = request.homeworkApproach
        )

        val savedQuestion = teacherQuestionRepository.save(teacherQuestion)
        
        // Update user's filledQuestions status if needed
        if (!user.filledQuestions) {
            userService.updateFilledQuestionsStatus(user.id!!, true)
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(mapToTeacherQuestionResponse(savedQuestion))
    }

    @PostMapping("/student")
    suspend fun submitStudentQuestion(@RequestBody request: StudentQuestionRequest): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        val studentQuestion = StudentQuestion(
            user = user,
            name = request.name,
            age = request.age,
            gender = request.gender,
            language = request.language,
            level = request.level,
            goals = request.goals,
            frequency = request.frequency,
            duration = request.duration,
            timezone = request.timezone,
            preferredTime = request.preferredTime,
            budget = request.budget,
            communicationStyle = request.communicationStyle,
            feedbackPreference = request.feedbackPreference,
            criticismResponse = request.criticismResponse,
            lessonFormat = request.lessonFormat,
            interests = request.interests,
            learningStyle = request.learningStyle,
            homeworkAttitude = request.homeworkAttitude
        )

        val savedQuestion = studentQuestionRepository.save(studentQuestion)
        
        // Update user's filledQuestions status if needed
        if (!user.filledQuestions) {
            userService.updateFilledQuestionsStatus(user.id!!, true)
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(mapToStudentQuestionResponse(savedQuestion))
    }

    @GetMapping("/teacher")
    suspend fun getTeacherQuestion(): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        val teacherQuestion = teacherQuestionRepository.findByUser(user) ?: return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse("Teacher question not found", "QUESTION_NOT_FOUND"))

        return ResponseEntity.ok(mapToTeacherQuestionResponse(teacherQuestion))
    }

    @GetMapping("/student")
    suspend fun getStudentQuestion(): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        val studentQuestion = studentQuestionRepository.findByUser(user) ?: return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse("Student question not found", "QUESTION_NOT_FOUND"))

        return ResponseEntity.ok(mapToStudentQuestionResponse(studentQuestion))
    }

    private fun mapToTeacherQuestionResponse(teacherQuestion: TeacherQuestion): TeacherQuestionResponse {
        return TeacherQuestionResponse(
            id = teacherQuestion.id,
            userId = teacherQuestion.user.id!!,
            name = teacherQuestion.name,
            age = teacherQuestion.age,
            gender = teacherQuestion.gender,
            language = teacherQuestion.language,
            languageLevel = teacherQuestion.languageLevel,
            timezone = teacherQuestion.timezone,
            teachingGoals = teacherQuestion.teachingGoals,
            minStudentLevel = teacherQuestion.minStudentLevel,
            maxStudentLevel = teacherQuestion.maxStudentLevel,
            interests = teacherQuestion.interests,
            teachingFrequency = teacherQuestion.teachingFrequency,
            lessonDuration = teacherQuestion.lessonDuration,
            preferredTime = teacherQuestion.preferredTime,
            lessonPrice = teacherQuestion.lessonPrice,
            teachingStyle = teacherQuestion.teachingStyle,
            feedbackStyle = teacherQuestion.feedbackStyle,
            teachingMethod = teacherQuestion.teachingMethod,
            explanationStyle = teacherQuestion.explanationStyle,
            homeworkApproach = teacherQuestion.homeworkApproach,
            createdAt = teacherQuestion.createdAt.format(dateFormatter)
        )
    }

    private fun mapToStudentQuestionResponse(studentQuestion: StudentQuestion): StudentQuestionResponse {
        return StudentQuestionResponse(
            id = studentQuestion.id,
            userId = studentQuestion.user.id!!,
            name = studentQuestion.name,
            age = studentQuestion.age,
            gender = studentQuestion.gender,
            language = studentQuestion.language,
            level = studentQuestion.level,
            goals = studentQuestion.goals,
            frequency = studentQuestion.frequency,
            duration = studentQuestion.duration,
            timezone = studentQuestion.timezone,
            preferredTime = studentQuestion.preferredTime,
            budget = studentQuestion.budget,
            communicationStyle = studentQuestion.communicationStyle,
            feedbackPreference = studentQuestion.feedbackPreference,
            criticismResponse = studentQuestion.criticismResponse,
            lessonFormat = studentQuestion.lessonFormat,
            interests = studentQuestion.interests,
            learningStyle = studentQuestion.learningStyle,
            homeworkAttitude = studentQuestion.homeworkAttitude,
            createdAt = studentQuestion.createdAt.format(dateFormatter)
        )
    }
}