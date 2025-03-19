import { z } from "zod";

export const basicInfoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subtitle: z.string().min(5, "Subtitle must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  level: z.coerce.number().int().min(1).max(4, "Please select a valid course level"),
  price_level_id: z.coerce.number().int().positive("Please select a price level"),
  categories: z.coerce.number().int().positive("Please select a Category"),
  topic: z.coerce.number().int().positive("Please select a sub category")
});
