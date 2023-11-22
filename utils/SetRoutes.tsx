"use client"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';

const SetRoutes = (routes: Object) => {
    const location = usePathname()

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    useEffect(() => {
        const route: { title: string, description: string } = Object.values(routes).find(
            (r: any) => r.route === location
        );

        if(route){
            setTitle(route.title);
            setDescription(route.description)
        }
    }, [location, routes])

  return [title, description]
}

export default SetRoutes