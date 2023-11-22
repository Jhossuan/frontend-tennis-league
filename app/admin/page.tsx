import React from 'react'
import Dashboard from './Dashboard'
import { GetAllData } from '@/api/Dashboard/action'

export default async function page() {

  const dashboardData = await GetAllData()

  return (
      <Dashboard data={dashboardData.response} />
  )
}
