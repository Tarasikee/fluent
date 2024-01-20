import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
        GOOGLE_CLIENT_ID: z.string().optional(),
        GOOGLE_CLIENT_SECRET: z.string().optional(),
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
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

        NODE_ENV: process.env.NODE_ENV,

        POSTGRES_URL: process.env.POSTGRES_URL,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
