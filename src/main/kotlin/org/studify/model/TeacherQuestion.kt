package org.studify.model

import jakarta.persistence.CollectionTable
import jakarta.persistence.Column
import jakarta.persistence.ElementCollection
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne
import jakarta.persistence.Table
import java.time.LocalDateTime

enum class Gender {
    MALE, FEMALE, ANY
}

enum class Language {
    ENGLISH, GERMAN, FRENCH, JAPANESE, CHINESE, RUSSIAN
}

enum class TeacherLanguageLevel {
    B2, C1, C2, NATIVE
}

enum class TeachingFrequency {
    ONCE_A_WEEK, TWO_TO_THREE_TIMES_A_WEEK, DAILY, FLEXIBLE
}

enum class LessonDuration {
    THIRTY_MINUTES, FORTY_FIVE_MINUTES, NINETY_MINUTES, ANY
}

enum class PreferredTime {
    MORNING, DAY, EVENING, ANY
}

enum class TeachingStyle {
    FRIENDLY_AND_SUPPORTIVE, STRICT_AND_STRUCTURED, NEUTRAL_BUT_PROFESSIONAL
}

enum class FeedbackStyle {
    VERBAL, WRITTEN, TESTS, VIDEO_REVIEW
}

enum class TeachingMethod {
    VISUAL, AUDIO, KINESTHETIC
}

enum class ExplanationStyle {
    THROUGH_EXAMPLES, THROUGH_THEORY, THROUGH_PRACTICE, COMBINED_APPROACH
}

enum class HomeworkApproach {
    ALWAYS_ASSIGN, RARELY_ASSIGN, NEVER_ASSIGN
}

@Entity
@Table(name = "teacher_questions")
data class TeacherQuestion(
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
    val languageLevel: TeacherLanguageLevel,

    val timezone: String,

    @ElementCollection
    @CollectionTable(name = "teacher_teaching_goals", joinColumns = [JoinColumn(name = "teacher_question_id")])
    @Column(name = "goal")
    val teachingGoals: List<String>,

    @Enumerated(EnumType.STRING)
    val minStudentLevel: StudentLanguageLevel,

    @Enumerated(EnumType.STRING)
    val maxStudentLevel: StudentLanguageLevel,

    @ElementCollection
    @CollectionTable(name = "teacher_interests", joinColumns = [JoinColumn(name = "teacher_question_id")])
    @Column(name = "interest")
    val interests: List<String>,

    @Enumerated(EnumType.STRING)
    val teachingFrequency: TeachingFrequency,

    @Enumerated(EnumType.STRING)
    val lessonDuration: LessonDuration,

    @Enumerated(EnumType.STRING)
    val preferredTime: PreferredTime,

    val lessonPrice: String,

    @Enumerated(EnumType.STRING)
    val teachingStyle: TeachingStyle,

    @Enumerated(EnumType.STRING)
    val feedbackStyle: FeedbackStyle,

    @Enumerated(EnumType.STRING)
    val teachingMethod: TeachingMethod,

    @Enumerated(EnumType.STRING)
    val explanationStyle: ExplanationStyle,

    @Enumerated(EnumType.STRING)
    val homeworkApproach: HomeworkApproach,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
