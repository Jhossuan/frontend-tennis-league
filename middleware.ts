import { NextRequest, NextResponse } from "next/server";
import { GetUserData } from "./api/AuthToken";

export async function middleware(request: NextRequest) {
    
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    const user = await GetUserData()

    const adminRoutes = [
        "/admin",
        "/admin/users",
        "/admin/tournaments",
        "/admin/competitors",
    ]

    const userRoutes = [
        "/home",
        "/tournaments/inscriptions",
    ]

    const protectedRoutes = [...userRoutes, ...adminRoutes]
    const publicRoutes = [
        "/auth/login",
        "/auth/register",
        "/auth/repassword",
    ]

    if(!user && protectedRoutes.includes(pathname)){
        const absoluteURL = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString())
    }

    if( user ) {
        if (user.exp < Date.now() / 1000) {
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }

        if(user.type === 'regular' && adminRoutes.includes(pathname)){
            const absoluteURL = new URL('/', request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

        if(user.type === 'regular' && publicRoutes.includes(pathname)){
            const absoluteURL = new URL('/', request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

        if(user.type === 'admin' && pathname == '/'){
            const absoluteURL = new URL('/admin', request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

        if(user.type === 'admin' && publicRoutes.includes(pathname)){
            const absoluteURL = new URL('/admin', request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

        if(user.type === 'admin' && userRoutes.includes(pathname)){
            const absoluteURL = new URL('/admin', request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

    }
}