import React from 'react'
import Tournaments from './Tournaments'
import { GetUserData } from '@/api/AuthToken'

export default async function page() {


  const validateUser = await GetUserData()

  return (
    <>
        <Tournaments user={validateUser} />
    </>
  )
}
