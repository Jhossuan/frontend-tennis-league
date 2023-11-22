"use server"

import { ResponseType } from "@/types/app"
import TournamentI from "@/types/tournament"
import axios from "axios"
import { GetToken } from "../AuthToken"
import GetHeaders from "@/utils/Headers"


export async function GetTournaments (): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.get(
            `${process.env.API_URL}v1/tournaments/get`
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

export async function CreateNewTournament (data: TournamentI): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/tournaments/create`,
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
            response: error.response.data ?? 'Error al crear torneo, intenta nuevamente'
        }
    }
}

export async function UpdateTournament (data: any): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
    try {
        const res = await axios.patch(
            `${process.env.API_URL}v1/tournaments/update`,
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
            response: error.response.data ?? 'Error al actualizar torneo, intenta nuevamente'
        }
    }
}

export async function DeleteTournament (data: any): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()

    try {
        const res = await axios.post(
            `${process.env.API_URL}v1/tournaments/delete`,
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
            response: error.response.data ?? 'Error al eliminar torneo, intenta nuevamente'
        }
    }
}

