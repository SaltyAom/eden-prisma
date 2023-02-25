import { Elysia, permission, t } from 'elysia'
import { cors } from '@elysiajs/cors'

import { PrismaClient } from '@prisma/client/edge'

const app = new Elysia()
    .use(cors())
    .get('/', () => 'Hello Elysia', {
        schema: {
            body: t.String({
                minLength: 8,
                maxLength: 8
            })
        }
    })
    .fn(({ permission }) => ({
        mirror: async <T extends string>(value: T) => {
            if (value === 'false') throw new Error("Value can't be false")

            return value
        },
        prisma: permission({
            value: new PrismaClient(),
            allow: ['user.create'],
            check: ({ match }) =>
                match({
                    'user.create': ([param]) => {
                        if (param.data.name === 'saltyaom')
                            throw new Error("Can't use name as 'saltyaom'")
                    }
                })
        })
    }))
    .listen(8080)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
