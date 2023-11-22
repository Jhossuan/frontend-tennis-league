import React from 'react'
import UserInscriptions from './UserInscriptions'
import { GetUserData } from '@/api/AuthToken'

export default async function page() {
  const validateUser = await GetUserData()

  return (
    <>
      <UserInscriptions user={validateUser} />
    </>
  )
}
