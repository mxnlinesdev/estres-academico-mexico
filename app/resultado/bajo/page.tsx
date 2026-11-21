import { Metadata } from "next"
import { Suspense } from "react"
import { ResultadoBajoContent } from "./bajo-content"

export const metadata: Metadata = {
  title: "Resultado: Estrés Bajo - Evaluación Académica",
  description: "Tu nivel de estrés académico es bajo. Sigue manteniendo tus buenos hábitos.",
}

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

export default async function ResultadoBajoPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ResultadoBajoContent searchParams={searchParams} />
    </Suspense>
  )
}