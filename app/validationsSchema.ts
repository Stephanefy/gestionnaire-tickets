import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is requires').max(255),
    description: z.string().min(1, 'Description is required'),
    status: z.string()
});

export const statusSchema = z.object({
    status: z.boolean()
})
