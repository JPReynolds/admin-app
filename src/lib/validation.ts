import { z } from "zod";
import dayjs from "dayjs";

export const UserFormSchema = z.object({
    firstName: z.string().optional().nullable(),
    lastName: z.string().min(1, "Last Name is required"),
    dateOfBirth: z.coerce.date()
        .refine((date) => 
            dayjs(date).isBefore(dayjs()), {
                message: "Date of birth cannot be in the future"
            }
        ),
});