"use server"

import { cookies } from "next/headers"
import { DecodedToken } from "./Auth/actions";
import { DecodedData } from "@/types/auth";

export async function GetToken () {
    const cookieStore = cookies();
    const token = cookieStore.get('token')
    return token
}

export async function GetUserData () {

    const cookieStore = cookies();
    const token = cookieStore.get('token')

    if(token){
        const { response } = await DecodedToken(token.value)
        return response
    }
    else return undefined

}