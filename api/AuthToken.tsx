"use server"

import { cookies } from "next/headers"
import { DecodedToken } from "./Auth/actions";

export async function GetToken () {
    const cookieStore = cookies();
    const token = cookieStore.get('token')
    console.log(token)
    return token
}

export async function GetUserData () {

    const cookieStore = cookies();
    const token = cookieStore.get('token')

    if(token){
        const { response } = await DecodedToken(token.value)
        return response
    }
    else "Usuario no encontrado"

}