export interface RegisterI {
    name: string
    email: string
    password: string
    phone: string
    userType: string
}

export interface LoginI {
    email: string
    password: string
}

export interface DecodedData {
    name: string
    email: string
    id: string
    type: string
    exp: any
    iat: any
}


