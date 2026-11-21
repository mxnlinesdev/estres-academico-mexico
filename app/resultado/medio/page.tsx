import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ResultCard } from "@/components/ResultCard"
import { CrisisBanner } from "@/components/CrisisBanner"
import { Disclaimer } from "@/components/Disclaimer"
import { PredictResponse } from "@/types/contrato"
import { RiArrowLeftLine as ArrowLeft, RiBrainLine as Brain, RiAlertLine as AlertCircle } from "@remixicon/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Resultado: Estrés Medio - Evaluación Académica",
  description: "Tu nivel de estrés académico es medio. Revisa los factores señalados y considera las recomendaciones.",
}

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

async function ResultadoMedioContent({ searchParams }: PageProps) {
  const params = await searchParams
  
  let response: PredictResponse
  try {
    response = JSON.parse(params.prediction)
  } catch {
    notFound()
  }

  if (response.prediction.label !== 'medio') {
    notFound()
  }

  const handleAction = (action: string) => {
    console.log(`Acción "${action}" clickeada - placeholder`)
  }

  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/evaluacion" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Nueva evaluación</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Resultado de tu evaluación</h1>
          </div>
          <div className="w-36" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
            <AlertCircle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            Nivel de estrés: MEDIO
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {response.prediction.message}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              Confianza: {(response.prediction.confidence * 100).toFixed(1)}%
            </span>
            <span className="flex items-center gap-1">
              Modelo: {response.model_used}
            </span>
          </div>
        </div>

        <ResultCard response={response} onActionClick={handleAction} />

        <Card className="border-yellow-200/50 dark:border-yellow-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <AlertCircle className="h-5 w-5" />
              Áreas de atención recomendadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Tu evaluación muestra factores de estrés que merecen atención. 
              Considera implementar estrategias en estas áreas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Técnicas de estudio:</strong> Métodos activos (resumen, mapas mentales, pomodoro)</li>
              <li><strong>Manejo de ansiedad:</strong> Respiración diafragmática, mindfulness, actividad física</li>
              <li><strong>Disciplina para estudiar:</strong> Planificación semanal, metas pequeñas, ambiente libre de distracciones</li>
              <li>Revisa los factores principales detectados arriba</li>
            </ul>
          </CardContent>
        </Card>

        <Disclaimer showModelWarning={true} />
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Evaluación completada · {new Date().toLocaleDateString('es-MX')}</p>
          <p className="text-destructive font-medium">
            ¿Necesitas ayuda? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7)
          </p>
        </div>
      </footer>
    </div>
  )
}

export default async function ResultadoMedioPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ResultadoMedioContent searchParams={searchParams} />
    </Suspense>
  )
}