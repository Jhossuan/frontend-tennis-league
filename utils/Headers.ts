import { GetToken } from "@/api/AuthToken"

export default async function GetHeaders() {

    const token = await GetToken()  
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        }
    }
    return headers
}