import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { PrismaClient } from '@prisma/client/edge'

const app = new Elysia()
    .use(cors())
    .get('/', () => 'Hello Elysia')
    .fn(({ permission }) => ({
        prisma: permission({
            value: new PrismaClient(),
            allow: ['user.create'],
            check: ({ match }) =>
                match({
                    'user.create': ([param]) => {
                        if (!param.data.name)
                            throw new Error('Name is required')
                    }
                })
        })
    }))
    .listen(8080)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
