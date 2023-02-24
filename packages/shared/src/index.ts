import { eden } from '@elysiajs/eden'
import type { App } from 'server'

export const api = eden<App>('http://localhost:8080')
export const fn = api.$fn
