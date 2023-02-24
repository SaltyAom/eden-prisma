import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = new Elysia()
    .use(cors())
    .get('/', () => 'Hello Elysia')
    .get('/ai', async () => {
        return 'ai'

        // prisma.user.create({
        //     data: {
        //         name: 'saltyaom',
        //         email: 'saltyaom@gmail.com'
        //     }
        // })
    })
    .fn({
        mirror: async <T>(v: T) => v
    })
    .listen(8080)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
