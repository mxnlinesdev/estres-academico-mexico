"use client"

import { useState, useEffect } from "react"

export function CurrentDate({ locale = 'es-MX' }: { locale?: string }) {
  const [date, setDate] = useState<string>("")

  useEffect(() => {
    setDate(new Date().toLocaleDateString(locale))
  }, [locale])

  return <>{date}</>
}