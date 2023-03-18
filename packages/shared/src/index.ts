import { edenFn } from '@elysiajs/eden'
import type { App } from 'server'

export const fn = edenFn<App>('http://localhost:8080')
