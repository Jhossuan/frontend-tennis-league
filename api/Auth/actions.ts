"use server"

import { ResponseType } from '@/types/app'
import { DecodedData, LoginI, RegisterI } from '@/types/auth'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function RegisterUser(data: RegisterI): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/auth/register`,
            data
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al registrar el usuario'
        }
    }
}

export async function LoginUser(data: LoginI): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/auth/login`,
            data
        )

        cookies().set('token', res.data.token)
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al iniciar sesion'
        }
    }
}

export async function SendCodeValidation(data: { email: string }): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/auth/validation-code`,
            data
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al enviar el codigo'
        }
    }
}

export async function ValidateAccount(data: { email: string, code: string }): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/auth/validate-code`,
            data
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al validar cuenta'
        }
    }
}

export async function ResetPassword(data: { email: string, password: string }): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.patch(
            `${process.env.API_URL}v1/auth/repassword`,
            data
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al crear contraseña'
        }
    }
}

export async function DecodedToken(token: string): Promise<ResponseType<DecodedData | string>> {
    try {
        const res = await fetch(
            `${process.env.API_URL}v1/auth/decoded?token=${token}`
        );

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error en la solicitud:', errorData);
            return {
                status: res.status,
                response: errorData.msg ?? 'Error al obtener datos'
            };
        }

        const data = await res.json();
        console.log('Respuesta exitosa:', data);

        return {
            status: res.status,
            response: data
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            response: 'Error al obtener datos'
        };
    }
}
