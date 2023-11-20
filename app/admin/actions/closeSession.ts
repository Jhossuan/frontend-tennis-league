'use server'
 
import { cookies } from 'next/headers'
 
export default async function closeSession() {
    cookies().delete('token')
}