import { useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { fn } from 'shared'
import { ProgressIndicator } from 'ui'

const userSchema = z.object({
    name: z.string().min(5),
    email: z.string().email()
})

type UserSchema = z.infer<typeof userSchema>

interface CreateUserResponse {
    name: string | null
}

export default function Web() {
    const {
        register,
        handleSubmit,
        formState: { errors: formError }
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    })

    const {
        mutate,
        isLoading,
        error: apiError,
        data: user
    } = useMutation<CreateUserResponse, Error, UserSchema>((data) =>
        fn.prisma.user.create({
            data,
            select: {
                name: true
            }
        })
    )

    const {
        mutate: deleteAll,
        isLoading: isDeleting,
        error: deletionError,
        data
    } = useMutation<unknown, Error>(() => fn.prisma.user.deleteMany())

    if (user)
        return (
            <main className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100">
                <div className="flex flex-col gap-4 w-full max-w-xs px-8 py-6 rounded-lg shadow-lg border bg-white">
                    <h1 className="text-gray-700 text-2xl font-medium text-center">
                        Welcome {user?.name ?? 'user'}
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                        Example using Prisma with Elysia Fn
                    </p>
                </div>
            </main>
        )

    return (
        <main className="flex flex-col justify-center items-center gap-8 w-full min-h-screen bg-gray-50">
            <form
                method="POST"
                className="flex flex-col gap-4 w-full max-w-xs px-8 pt-6 pb-8 rounded-lg shadow-lg border bg-white"
                onSubmit={handleSubmit((data) => mutate(data))}
            >
                <header className="flex flex-col justify-center items-center gap-2 w-full mb-2">
                    <h1 className="text-gray-700 text-3xl font-medium">
                        Sign Up
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Example using Prisma with Elysia Fn
                    </p>
                </header>

                <label className="flex flex-col gap-1 text-sm text-gray-500">
                    Email
                    <input
                        className="text-lg bg-gray-100 rounded px-4 py-2"
                        {...register('email')}
                        type="email"
                        placeholder="email"
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm text-gray-500">
                    Username
                    <input
                        className="text-lg bg-gray-100 rounded px-4 py-2"
                        {...register('name')}
                        type="text"
                        placeholder="Username"
                        required
                    />
                </label>

                {apiError && (
                    <p className="text-red-500 font-medium">
                        {apiError.message}
                    </p>
                )}
                {(formError.name || formError.email) && (
                    <p className="text-red-500 font-medium">
                        {formError.name?.message || formError.email?.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="flex justify-center items-center gap-2 text-lg font-medium text-white mt-2 py-2 bg-blue-500 active:scale-95 rounded-lg transition-all"
                    disabled={isLoading}
                >
                    Create
                    {isLoading && (
                        <div className="absolute pl-28">
                            <ProgressIndicator />
                        </div>
                    )}
                </button>
            </form>

            <footer className="flex flex-col gap-4">
                <button
                    className="flex justify-center items-center gap-3 text-lg hover:font-medium focus:font-medium text-red-300 hover:text-red-500 focus:text-red-500 mt-2 py-2 px-6 hover:bg-red-100/75 hover:bg-red-100/75 active:scale-95 rounded-lg transition-all"
                    onClick={() => deleteAll()}
                    disabled={isDeleting}
                >
                    Delete all
                    {isDeleting && <ProgressIndicator />}
                </button>

                {deletionError && (
                    <p className="text-red-500 font-medium">
                        {deletionError.message}
                    </p>
                )}
            </footer>
        </main>
    )
}
