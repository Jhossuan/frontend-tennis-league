"use server"

import { ResponseType } from "@/types/app"
import axios from "axios"
import { GetToken } from "../AuthToken"
import GetHeaders from "@/utils/Headers"

export async function GetCompetitors (): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
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
    const headers = await GetHeaders()
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

export async function SuscribeCompetitor (data: { uid: string, tid: string }): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/competitors/register`,
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

export async function GetUserSubscriptions (uid: string): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
    try {
        const res = await axios.get(
            `${process.env.API_URL}v1/tournaments/userTournaments?uid=${uid}`,
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