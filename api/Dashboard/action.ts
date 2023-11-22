import { ResponseType } from "@/types/app"
import axios from "axios"
import { GetToken } from "../AuthToken"

export async function GetAllData(): Promise<ResponseType<Object | string>> {
    const token = await GetToken()  
    const headers =             {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        }
    }
    try {
        const res = await axios.get(
            `${process.env.API_URL}v1/user/all-data`,
            headers
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al obtener usuarios'
        }
    }
}