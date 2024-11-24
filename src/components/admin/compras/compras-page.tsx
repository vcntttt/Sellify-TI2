"use client"

import { useEffect, useState } from "react"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import AdminSection from "../section-template"

async function getData(): Promise<Payment[]> {
  // Aquí simulas la llamada a la API
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // Agrega más datos si es necesario...
  ]
}

export default function ComprasPage() {
  const [data, setData] = useState<Payment[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await getData()
      setData(response)
    }
    fetchData()
  }, [])

  return (
    <AdminSection title="Compras">
      <DataTable columns={columns} data={data} />
    </AdminSection>
  )
}