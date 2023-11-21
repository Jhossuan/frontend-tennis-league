import { DecodedToken } from "@/api/Auth/actions";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    const cookie = request.cookies.get('token');
    const token = cookie?.value;

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

    if(!token && protectedRoutes.includes(pathname)){
        const absoluteURL = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString())
    }

    if( token ) {
        url.pathname = "/not-found"
        
        const { response: user } = await DecodedToken(token)

        if (user.exp < Date.now() / 1000) {
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }

        if(user.type === 'regular' && adminRoutes.includes(pathname)){
            const absoluteURL = new URL('/home', request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

        if(user.type === 'regular' && publicRoutes.includes(pathname)){
            const absoluteURL = new URL('/home', request.nextUrl.origin);
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