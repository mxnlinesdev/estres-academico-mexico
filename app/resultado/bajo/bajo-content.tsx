"use client"

import { notFound } from "next/navigation"
import { ResultCard } from "@/components/ResultCard"
import { CrisisBanner } from "@/components/CrisisBanner"
import { Disclaimer } from "@/components/Disclaimer"
import { CurrentDate } from "@/components/CurrentDate"
import { PredictResponse } from "@/types/contrato"
import { RiArrowLeftLine as ArrowLeft, RiBrainLine as Brain, RiCheckboxCircleFill as CheckCircle2 } from "@remixicon/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

export async function ResultadoBajoContent({ searchParams }: PageProps) {
  const params = await searchParams
  
  let response: PredictResponse
  try {
    response = JSON.parse(params.prediction)
  } catch {
    notFound()
  }

  // Verificar que sea nivel bajo
  if (response.prediction.label !== 'bajo') {
    notFound()
  }

  const handleAction = (action: string) => {
    console.log(`Acción "${action}" clickeada - placeholder`)
    // TODO: Implementar navegación real a recursos
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
        {/* Header de resultado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            Nivel de estrés: BAJO
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

        {/* Tarjeta principal de resultado */}
        <ResultCard response={response} onActionClick={handleAction} />

        {/* Mensaje motivacional */}
        <Card className="border-green-200/50 dark:border-green-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              ¡Excelente! Mantén estos hábitos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Tu evaluación indica que estás manejando bien los factores de estrés académico. 
              Los hábitos de sueño, estudio y apoyo social están en rangos saludables.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Prioriza mantener tu rutina de sueño (7-8 horas)</li>
              <li>Continúa con tu equilibrio estudio-vida personal</li>
              <li>Valora y fortalece tu red de apoyo familiar y social</li>
              <li>Explora técnicas de estudio para optimizar tu tiempo</li>
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Disclaimer showModelWarning={true} />
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Evaluación completada · <CurrentDate locale="es-MX" /></p>
          <p className="text-destructive font-medium">
            ¿Necesitas ayuda? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7)
          </p>
        </div>
      </footer>
    </div>
  )
}