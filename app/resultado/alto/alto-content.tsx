"use client"

import { notFound } from "next/navigation"
import { ResultCard } from "@/components/ResultCard"
import { CrisisBanner } from "@/components/CrisisBanner"
import { Disclaimer } from "@/components/Disclaimer"
import { CurrentDate } from "@/components/CurrentDate"
import { PredictResponse } from "@/types/contrato"
import { RiArrowLeftLine as ArrowLeft, RiBrainLine as Brain, RiAlertLine as AlertCircle, RiPhoneLine as Phone, RiShieldLine as Shield, RiUserReceivedLine as UserCheck } from "@remixicon/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

export async function ResultadoAltoContent({ searchParams }: PageProps) {
  const params = await searchParams
  
  let response: PredictResponse
  try {
    response = JSON.parse(params.prediction)
  } catch {
    notFound()
  }

  if (response.prediction.label !== 'alto') {
    notFound()
  }

  const handleAction = (action: string) => {
    console.log(`Acción "${action}" clickeada - placeholder`)
    if (action === 'Consulta a un experto') {
      // Podría abrir modal con recursos de contacto
      alert('Placeholder: Aquí iría un directorio de psicólogos, orientadores escolares, y líneas de crisis.')
    }
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
        {/* Banner de crisis prominente */}
        <Alert variant="destructive" className="mb-6 border-2">
          <AlertTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Nivel de estrés ALTO detectado
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="font-medium mb-2">{response.prediction.message}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:8009112000"
                className="flex items-center justify-center gap-2 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-semibold text-lg hover:bg-destructive/90 transition-colors"
              >
                <Phone className="h-6 w-6" />
                <span>Llamar 800 911 2000</span>
                <span className="text-sm">(Línea de la Vida, 24/7)</span>
              </a>
              <Button variant="outline" size="lg" className="flex items-center gap-2" onClick={() => handleAction('Consulta a un experto')}>
                <UserCheck className="h-5 w-5" />
                Buscar orientación profesional
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold text-destructive mb-2">
            Nivel de estrés: ALTO
          </h1>
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

        {/* Recursos de crisis expandidos */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Recursos de apoyo inmediato en México
            </CardTitle>
            <CardDescription>
              No tienes que pasar por esto solo. Hay ayuda profesional disponible 24/7.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-destructive">Línea de la Vida</span>
                </div>
                <p className="text-lg font-mono text-destructive">800 911 2000</p>
                <p className="text-sm text-muted-foreground">Gratuita, confidencial, 24/7 (CONASAMA)</p>
              </div>
              <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-destructive">Emergencias</span>
                </div>
                <p className="text-lg font-mono text-destructive">911</p>
                <p className="text-sm text-muted-foreground">Emergencias médicas y de seguridad</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <h4 className="font-medium">Otros recursos:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>SAPTEL:</strong> 55 5259 8121 (CDMX, 24/7)</li>
                <li><strong>LOCATEL:</strong> 55 5658 1111 (CDMX, orientación)</li>
                <li><strong>Cruz Roja Mexicana:</strong> 55 5757 0303 / 55 5757 0304</li>
                <li><strong>Orientación escolar:</strong> Acude al área de psicología/prefectura de tu institución</li>
                <li><strong>Directorio CONASAMA:</strong> <a href="https://www.gob.mx/conasama" target="_blank" rel="noopener" className="underline text-primary">Centros de salud mental por estado</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recomendaciones específicas */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Próximos pasos recomendados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li><strong>Contacta ayuda profesional HOY</strong> (línea de crisis o psicólogo)</li>
              <li>Habla con alguien de confianza (familia, amigo, tutor)</li>
              <li>Acude al área de orientación/psicología de tu escuela</li>
              <li>Evita aislarte; mantén contacto social mínimo diario</li>
              <li>Prioriza sueño y alimentación básica</li>
              <li>No tomes decisiones importantes en este estado</li>
            </ol>
          </CardContent>
        </Card>

        <Disclaimer showModelWarning={true} />
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Evaluación completada · <CurrentDate locale="es-MX" /></p>
          <div className="flex items-center justify-center gap-2 text-destructive font-medium">
            <Phone className="h-4 w-4" />
            <a href="tel:8009112000" className="underline">800 911 2000</a>
            <span>·</span>
            <a href="tel:911" className="underline">911</a>
            <span>(24/7, gratuita)</span>
          </div>
        </div>
      </footer>
    </div>
  )
}