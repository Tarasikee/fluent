import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
        GOOGLE_CLIENT_ID: z.string().optional(),
        GOOGLE_CLIENT_SECRET: z.string().optional(),
        NEXTAUTH_SECRET:
            process.env.NODE_ENV === 'production'
                ? z.string()
                : z.string().optional(),
        POSTGRES_URL: z.string().url().optional(),
        POSTGRES_PRISMA_URL: z.string().url().optional(),
        POSTGRES_URL_NON_POOLING: z.string().url().optional(),

        POSTGRES_USER: z.string().optional(),
        POSTGRES_HOST: z.string().optional(),
        POSTGRES_PASSWORD: z.string().optional(),
        POSTGRES_DATABASE: z.string().optional(),
    },
    client: {
    },
    runtimeEnv: {
        GOOGLE_CLIENT_ID: undefined,
        GOOGLE_CLIENT_SECRET: undefined,

        NODE_ENV: undefined,
        NEXTAUTH_SECRET: undefined,

        POSTGRES_URL: undefined,
        POSTGRES_PRISMA_URL: undefined,
        POSTGRES_URL_NON_POOLING: undefined,
        POSTGRES_USER: undefined,
        POSTGRES_HOST: undefined,
        POSTGRES_PASSWORD: undefined,
        POSTGRES_DATABASE: undefined,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
