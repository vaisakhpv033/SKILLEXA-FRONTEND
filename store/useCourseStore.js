import Categories from "@/app/admin/courses/categories/page";
import { create } from "zustand";

export const useCourseStore = create((set) => ({
  courseData: {
    title: "",
    subtitle: "",
    description: "",
    language: "EN",
    level: undefined,
    price_level_id: 1,
    topic: undefined,
    categories: undefined,
    requirements: [],
    outcome: [],
    targetAudience: [],
  },
  updateCourseData: (field, value) =>
    set((state) => ({
      courseData: { ...state.courseData, [field]: value },
    })),
  resetCourseData: () =>
    set({
      courseData: {
        title: "",
        subtitle: "",
        description: "",
        language: "EN",
        level: undefined,
        price_level_id: 1,
        topic: undefined,
        categories: undefined,
        requirements: [],
        outcome: [],
        targetAudience: [],
      },
    }),
}));
