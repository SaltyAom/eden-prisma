import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { fn } from 'shared'
import { ProgressIndicator } from 'ui'

interface Form {
    value: string
}

export default function A() {
    const {
        register,
        handleSubmit,
        formState: { errors: formError }
    } = useForm<Form, Error>()

    const {
        data,
        isLoading,
        mutate,
        error: apiError
    } = useMutation<any, Error, string>({
        mutationFn: fn.mirror
    })

    return (
        <form
            className="flex flex-col justify-center items-center gap-3 w-full min-h-screen"
            onSubmit={handleSubmit(({ value }) => mutate(value))}
        >
            {data ?? <h1>{data?.toString()}</h1>}

            {apiError && (
                <p className="text-red-500 font-medium">{apiError.message}</p>
            )}
            {formError.value && (
                <p className="text-red-500 font-medium">
                    {formError.value?.message?.toString()}
                </p>
            )}

            <hr />

            <input
                {...register('value')}
                placeholder="value"
                className="bg-gray-100 rounded px-2 py-1"
            />
            <button className="text-white bg-blue-500 rounded px-4 py-1">
                Send
            </button>
        </form>
    )
}
