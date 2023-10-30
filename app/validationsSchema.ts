import { z } from "zod";

export const creatIsueeSchema = z.object({
    title: z.string().min(1, 'Title is requires').max(255),
    description: z.string().min(1, 'Description is required')
});
