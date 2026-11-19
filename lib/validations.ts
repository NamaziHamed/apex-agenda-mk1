import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type credentialsProps = z.infer<typeof credentialsSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.email("Invalid Email Address"),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/(?=.*\d)/, {
        message: "Password must contain at least one number",
      }),
    confirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm;
    },
    {
      message: "Passwords do not match",
      path: ["confirm"],
    }
  );

export type registerProps = z.infer<typeof registerSchema>;

export const categorySchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title should not be less than 3 characters" }),
  icon: z.string().nullable(),
  createdAt: z.iso.date(),
  userId: z.string(),
});

export type categoryProps = z.infer<typeof categorySchema>;

export const categoryFormSchema = z.object({
  icon: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(3, { message: "Title should not be less than 3 characters" })
    .max(50, { message: "Title should not be more than 50 characters" }),
});

export type categoryFormSchema = z.infer<typeof categoryFormSchema>;

export const taskPayloadSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  isToday: z.boolean().optional(),
  setTodayDate: z.string().optional(),
  isImportant: z.boolean().optional(),
  categoryId: z.string().nullable().optional(),
});

export type TaskPayload = z.infer<typeof taskPayloadSchema>;

export const tasksChema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title cannot be empty."),
  description: z.string().optional().nullable(),
  reminder: z.iso.datetime().optional().nullable(),
  dueDate: z.iso.datetime().optional().nullable(),
  completedAt: z.iso.datetime().optional().nullable(),
  completed: z.boolean(),
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  isToday: z.boolean().optional(),
  setTodayDate: z.iso.datetime().optional().nullable(),
  isImportant: z.boolean().optional(),
  categoryId: z.string().nullable().optional(),
});

export type tasksChemaProps = z.infer<typeof tasksChema>;

/** Fields a user may change through PATCH /api/tasks/[taskId]. */
export const taskUpdateSchema = z
  .object({
    title: z.string().trim().min(1, "Title cannot be empty."),
    description: z.string().nullable(),
    reminder: z.iso.datetime({ offset: true }).nullable(),
    dueDate: z.iso.datetime({ offset: true }).nullable(),
    completedAt: z.iso.datetime({ offset: true }).nullable(),
    setTodayDate: z.iso.datetime({ offset: true }).nullable(),
    isImportant: z.boolean(),
    completed: z.boolean(),
    isToday: z.boolean(),
    categoryId: z.string().nullable(),
  })
  .partial();

export const editTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title cannot be empty."),
  description: z.string().optional().nullable(),
  reminder: z.iso.datetime().optional().nullable(),
  dueDate: z.iso.datetime().optional().nullable(),
  isImportant: z.boolean().optional(),
  completed: z.boolean().optional(),
  completedAt: z.iso.datetime().optional().nullable(),
  categoryId: z.string().nullable().optional(),
  isToday: z.boolean().optional(),
  setTodayDate: z.iso.datetime().optional().nullable(),
});

export type editTaskProps = z.infer<typeof editTaskSchema>;
