'use server'

import { z } from 'zod'

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    teamId: z.string(),
})

export async function sendInvite(_: unknown, formData: FormData) {
    'use server'

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        teamId: formData.get('teamId'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, teamId } = validatedFields.data
    console.log(email, teamId)
}
