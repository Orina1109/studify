package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.studify.model.*
import org.studify.repository.PickedTeacherRepository
import org.studify.repository.StudentQuestionRepository
import org.studify.repository.TeacherQuestionRepository
import org.studify.service.UserService
import java.time.format.DateTimeFormatter
import kotlin.math.abs

@RestController
@RequestMapping("/api/questions")
class QuestionController(
    private val userService: UserService,
    private val teacherQuestionRepository: TeacherQuestionRepository,
    private val studentQuestionRepository: StudentQuestionRepository,
    private val pickedTeacherRepository: PickedTeacherRepository
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
            photoData = request.photoData,
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
            photoData = request.photoData,
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
            photoData = teacherQuestion.photoData,
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
            photoData = studentQuestion.photoData,
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

    @GetMapping("/lookup")
    suspend fun lookupTeachers(): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        // Check if user is a student
        if (user.role != UserRole.STUDENT) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse("Only students can lookup teachers", "FORBIDDEN_OPERATION"))
        }

        // Get student question
        val studentQuestion = studentQuestionRepository.findByUser(user) ?: return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse("Student question not found", "QUESTION_NOT_FOUND"))

        // Get all teacher questions
        val teacherQuestions = teacherQuestionRepository.findAll()

        // Filter out teachers that are already picked by this student
        val filteredTeacherQuestions = teacherQuestions.filter { teacherQuestion ->
            !pickedTeacherRepository.existsByStudentAndTeacherQuestion(user, teacherQuestion)
        }

        // Calculate compatibility scores and sort by compatibility
        val teacherLookupResponses = filteredTeacherQuestions.map { teacherQuestion ->
            val compatibilityScore = calculateCompatibility(studentQuestion, teacherQuestion)
            TeacherLookupResponse(
                id = teacherQuestion.id,
                userId = teacherQuestion.user.id!!,
                name = teacherQuestion.name,
                age = teacherQuestion.age,
                photoData = teacherQuestion.photoData,
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
                createdAt = teacherQuestion.createdAt.format(dateFormatter),
                compatibilityScore = compatibilityScore
            )
        }.sortedBy { it.compatibilityScore } // Sort by ascending difference (lower is better)

        return ResponseEntity.ok(teacherLookupResponses)
    }

    @PostMapping("/choose_result")
    suspend fun chooseResult(@RequestBody request: ChooseResultRequest): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        // Check if user is a student
        if (user.role != UserRole.STUDENT) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse("Only students can choose teachers", "FORBIDDEN_OPERATION"))
        }

        // Get teacher question by ID
        val teacherQuestion = teacherQuestionRepository.findById(request.teacherId).orElse(null) ?: return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse("Teacher question not found", "QUESTION_NOT_FOUND"))

        // Check if there's already a record for this student and teacher
        val existingRecord = pickedTeacherRepository.findByStudentAndTeacherQuestion(user, teacherQuestion)

        if (existingRecord != null) {
            // Update existing record
            val updatedRecord = existingRecord.copy(picked = request.picked)
            pickedTeacherRepository.save(updatedRecord)
        } else {
            // Create new record
            val pickedTeacher = PickedTeacher(
                student = user,
                teacherQuestion = teacherQuestion,
                picked = request.picked
            )
            pickedTeacherRepository.save(pickedTeacher)
        }

        return ResponseEntity.ok(mapOf("success" to true))
    }

    @GetMapping("/get_picked")
    suspend fun getPickedTeachers(): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val user = userService.getUserByUsername(username) ?: return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse("User not found", "USER_NOT_FOUND"))

        // Check if user is a student
        if (user.role != UserRole.STUDENT) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse("Only students can get picked teachers", "FORBIDDEN_OPERATION"))
        }

        // Get picked teachers for this student
        val pickedTeachers = pickedTeacherRepository.findByStudentAndPicked(user, true)

        // Map to response
        val teacherLookupResponses = pickedTeachers.map { pickedTeacher ->
            val teacherQuestion = pickedTeacher.teacherQuestion
            TeacherLookupResponse(
                id = teacherQuestion.id,
                userId = teacherQuestion.user.id!!,
                name = teacherQuestion.name,
                age = teacherQuestion.age,
                photoData = teacherQuestion.photoData,
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
                createdAt = teacherQuestion.createdAt.format(dateFormatter),
                compatibilityScore = 0.0 // Not relevant for picked teachers
            )
        }

        return ResponseEntity.ok(teacherLookupResponses)
    }

    private fun calculateCompatibility(student: StudentQuestion, teacher: TeacherQuestion): Double {
        var totalDifference = 0.0
        val weights = mapOf(
            "language" to 1000.0,
            "level" to 80.0,
            "goals" to 7.0,
            "frequency" to 5.0,
            "duration" to 5.0,
            "timezone" to 2.0,
            "preferredTime" to 5.0,
            "budget" to 7.0,
            "communicationStyle" to 6.0,
            "feedbackStyle" to 5.0,
            "learningStyle" to 6.0,
            "homeworkAttitude" to 4.0,
            "interests" to 3.0
        )

        // Language match (exact match)
        if (student.language != teacher.language) {
            totalDifference += weights["language"]!!
        }

        // Level match (range match)
        if (student.level.ordinal < teacher.minStudentLevel.ordinal || 
            student.level.ordinal > teacher.maxStudentLevel.ordinal) {
            totalDifference += weights["level"]!!
        }

        // Goals match (list match)
        val goalsDifference = 1.0 - (student.goals.intersect(teacher.teachingGoals).size.toDouble() / 
                                   maxOf(student.goals.size, teacher.teachingGoals.size).toDouble())
        totalDifference += goalsDifference * weights["goals"]!!

        // Frequency match
        val frequencyMap = mapOf(
            Frequency.ONCE_A_WEEK to TeachingFrequency.ONCE_A_WEEK,
            Frequency.TWO_TO_THREE_TIMES_A_WEEK to TeachingFrequency.TWO_TO_THREE_TIMES_A_WEEK,
            Frequency.DAILY to TeachingFrequency.DAILY,
            Frequency.FLEXIBLE to TeachingFrequency.FLEXIBLE
        )
        if (frequencyMap[student.frequency] != teacher.teachingFrequency) {
            // If either is flexible, reduce the difference
            if (student.frequency == Frequency.FLEXIBLE || teacher.teachingFrequency == TeachingFrequency.FLEXIBLE) {
                totalDifference += weights["frequency"]!! * 0.5
            } else {
                totalDifference += weights["frequency"]!!
            }
        }

        // Duration match
        if (student.duration != teacher.lessonDuration) {
            // If either is ANY, reduce the difference
            if (student.duration == LessonDuration.ANY || teacher.lessonDuration == LessonDuration.ANY) {
                totalDifference += weights["duration"]!! * 0.5
            } else {
                totalDifference += weights["duration"]!!
            }
        }

        // Timezone match
        if (student.timezone != teacher.timezone) {
            totalDifference += weights["timezone"]!!
        }

        // Preferred time match
        if (student.preferredTime != teacher.preferredTime) {
            // If either is ANY, reduce the difference
            if (student.preferredTime == PreferredTime.ANY || teacher.preferredTime == PreferredTime.ANY) {
                totalDifference += weights["preferredTime"]!! * 0.5
            } else {
                totalDifference += weights["preferredTime"]!!
            }
        }

        // Budget match
        if (student.budget != teacher.lessonPrice) {
            // Calculate budget difference based on ordinal values
            val budgetDiff = abs(student.budget.ordinal - teacher.lessonPrice.ordinal)
            totalDifference += budgetDiff * weights["budget"]!! / Budget.values().size
        }

        // Communication style match
        val communicationStyleMap = mapOf(
            CommunicationStyle.FRIENDLY_AND_SUPPORTIVE to TeachingStyle.FRIENDLY_AND_SUPPORTIVE,
            CommunicationStyle.STRICT_AND_STRUCTURED to TeachingStyle.STRICT_AND_STRUCTURED,
            CommunicationStyle.NEUTRAL_BUT_PROFESSIONAL to TeachingStyle.NEUTRAL_BUT_PROFESSIONAL
        )
        if (communicationStyleMap[student.communicationStyle] != teacher.teachingStyle) {
            totalDifference += weights["communicationStyle"]!!
        }

        // Feedback style match
        val feedbackStyleMap = mapOf(
            FeedbackPreference.VERBAL to FeedbackStyle.VERBAL,
            FeedbackPreference.WRITTEN to FeedbackStyle.WRITTEN,
            FeedbackPreference.TESTS to FeedbackStyle.TESTS,
            FeedbackPreference.ANY to null
        )
        if (student.feedbackPreference != FeedbackPreference.ANY && 
            feedbackStyleMap[student.feedbackPreference] != teacher.feedbackStyle) {
            totalDifference += weights["feedbackStyle"]!!
        }

        // Learning style match
        val learningStyleMap = mapOf(
            LearningStyle.VISUAL to TeachingMethod.VISUAL,
            LearningStyle.AUDIO to TeachingMethod.AUDIO,
            LearningStyle.PRACTICE to TeachingMethod.KINESTHETIC
        )
        if (learningStyleMap[student.learningStyle] != teacher.teachingMethod) {
            totalDifference += weights["learningStyle"]!!
        }

        // Homework attitude match
        val homeworkCompatibility = when (student.homeworkAttitude) {
            HomeworkAttitude.LOVE -> when (teacher.homeworkApproach) {
                HomeworkApproach.ALWAYS_ASSIGN -> 0.0
                HomeworkApproach.RARELY_ASSIGN -> 0.5
                HomeworkApproach.NEVER_ASSIGN -> 1.0
            }
            HomeworkAttitude.NEUTRAL -> when (teacher.homeworkApproach) {
                HomeworkApproach.ALWAYS_ASSIGN -> 0.3
                HomeworkApproach.RARELY_ASSIGN -> 0.0
                HomeworkApproach.NEVER_ASSIGN -> 0.3
            }
            HomeworkAttitude.DISLIKE -> when (teacher.homeworkApproach) {
                HomeworkApproach.ALWAYS_ASSIGN -> 1.0
                HomeworkApproach.RARELY_ASSIGN -> 0.5
                HomeworkApproach.NEVER_ASSIGN -> 0.0
            }
        }
        totalDifference += homeworkCompatibility * weights["homeworkAttitude"]!!

        // Interests match (list match)
        val interestsDifference = 1.0 - (student.interests.intersect(teacher.interests).size.toDouble() / 
                                      maxOf(student.interests.size, teacher.interests.size).toDouble())
        totalDifference += interestsDifference * weights["interests"]!!

        return totalDifference
    }
}
