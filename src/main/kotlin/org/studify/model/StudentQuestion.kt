package org.studify.model

import jakarta.persistence.*
import java.time.LocalDateTime

// Reusing enums from TeacherQuestion.kt:
// Gender, Language, LessonDuration, PreferredTime

enum class StudentLanguageLevel {
    A1, A2, B1, B2, C1, C2, UNKNOWN
}

enum class Frequency {
    ONCE_A_WEEK, TWO_TO_THREE_TIMES_A_WEEK, DAILY, FLEXIBLE
}

enum class Budget {
    LOW, MEDIUM, HIGH
}

enum class CommunicationStyle {
    FRIENDLY_AND_SUPPORTIVE, STRICT_AND_STRUCTURED, NEUTRAL_BUT_PROFESSIONAL
}

enum class FeedbackPreference {
    VERBAL, WRITTEN, TESTS, ANY
}

enum class CriticismResponse {
    DETAILED_ERROR_ANALYSIS, CONSTRUCTIVE_ONLY, MINIMAL
}

enum class LessonFormat {
    STRUCTURED, CONVERSATION, MIXED
}

enum class LearningStyle {
    VISUAL, AUDIO, PRACTICE
}

enum class HomeworkAttitude {
    LOVE, NEUTRAL, DISLIKE
}

@Entity
@Table(name = "student_questions")
data class StudentQuestion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    val user: User,

    val name: String,
    val age: String,

    @Enumerated(EnumType.STRING)
    val gender: Gender,

    @Enumerated(EnumType.STRING)
    val language: Language,

    @Enumerated(EnumType.STRING)
    val level: StudentLanguageLevel,

    @ElementCollection
    @CollectionTable(name = "student_goals", joinColumns = [JoinColumn(name = "student_question_id")])
    @Column(name = "goal")
    val goals: List<String>,

    @Enumerated(EnumType.STRING)
    val frequency: Frequency,

    @Enumerated(EnumType.STRING)
    val duration: LessonDuration,

    val timezone: String,

    @Enumerated(EnumType.STRING)
    val preferredTime: PreferredTime,

    @Enumerated(EnumType.STRING)
    val budget: Budget,

    @Enumerated(EnumType.STRING)
    val communicationStyle: CommunicationStyle,

    @Enumerated(EnumType.STRING)
    val feedbackPreference: FeedbackPreference,

    @Enumerated(EnumType.STRING)
    val criticismResponse: CriticismResponse,

    @Enumerated(EnumType.STRING)
    val lessonFormat: LessonFormat,

    @ElementCollection
    @CollectionTable(name = "student_interests", joinColumns = [JoinColumn(name = "student_question_id")])
    @Column(name = "interest")
    val interests: List<String>,

    @Enumerated(EnumType.STRING)
    val learningStyle: LearningStyle,

    @Enumerated(EnumType.STRING)
    val homeworkAttitude: HomeworkAttitude,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
