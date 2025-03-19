export const CourseLevel = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
};

export const CourseStatus = {
    DRAFT: 0,
    PENDING: 1,
    PUBLISHED: 2,
    ARCHIVED: 3,
};

export const LanguageChoices = {
    ENGLISH: "EN",
    SPANISH: "ES",
    FRENCH: "FR",
    HINDI: "HI",
    OTHER: "OT",
};

export const PriceLevel = {
    id: Number,
    name: String,
    amount: Number,
};

export const CourseDetail = {
    detail_type: ["requirement", "outcome", "target_audience"],
    description: String,
    subtitle: String,
    language: LanguageChoices,
    level: CourseLevel,
    price_level_id: Number,
    topic_id: Number,
    requirements: Array,
    outcomes: Array,
    targetAudience: Array,
};