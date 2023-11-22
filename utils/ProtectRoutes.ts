"use client"
import { GetUserData } from "@/api/AuthToken"
import { redirect, usePathname } from "next/navigation"

export const protectRoutes = async() =>{

    const pathname = usePathname()
    console.log("pathname", pathname)

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


    const user = await GetUserData()

    
    if(!user && protectedRoutes.includes(pathname)){
        return redirect('/')
    }

    if(user){
        console.log(user)
        if(user.type === 'regular' && adminRoutes.includes(pathname)){
            return redirect('/')
        }

        if(user.type === 'regular' && publicRoutes.includes(pathname)){
            return redirect('/')
        }

        if(user.type === 'admin' && pathname == '/'){
            return redirect('/admin')
        }

        if(user.type === 'admin' && publicRoutes.includes(pathname)){
            return redirect('/admin')
        }

        if(user.type === 'admin' && userRoutes.includes(pathname)){
            return redirect('/admin')
        }
    }

}