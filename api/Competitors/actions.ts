"use server"

import { ResponseType } from "@/types/app"
import axios from "axios"
import { GetToken } from "../AuthToken"

export async function GetCompetitors (): Promise<ResponseType<Object | string>> {
    const token = await GetToken()  
    const headers =             {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        }
    }
    try {
        const res = await axios.get(
            `${process.env.API_URL}v1/competitors/get`,
            headers
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al obtener datos, recarga la pagina'
        }
    }
}

export async function UnsuscribeCompetitors (data: { uid: string, tid: string }): Promise<ResponseType<Object | string>> {
    const token = await GetToken()  
    const headers =             {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        }
    }
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/competitors/unsuscribe`,
            data,
            headers
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al obtener datos, recarga la pagina'
        }
    }
}