"use client"

import { notFound } from "next/navigation"
import { use } from "react"
import { ResultCard } from "@/components/ResultCard"
import { CrisisBanner } from "@/components/CrisisBanner"
import { CurrentDate } from "@/components/CurrentDate"
import { PredictResponse } from "@/types/contrato"
import { RiArrowLeftLine as ArrowLeft, RiBrainLine as Brain, RiAlertLine as AlertCircle, RiTimerLine as Timer, RiListOrdered as ListOrdered, RiCalendarLine as Calendar, RiBookOpenLine as BookOpen, RiCheckLine as Check } from "@remixicon/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

export function ResultadoMedioContent({ searchParams }: PageProps) {
  const params = use(searchParams)
  
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

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 mb-4">
            <AlertCircle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            Nivel de estrés: MEDIO
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {response.prediction.message}
          </p>
          
        </div>

        <ResultCard response={response} onActionClick={handleAction} />

        {/* Actividad destacada: Taller Eisenhower + Time Blocking */}
        <Card className="mt-10 border-yellow-200/50 dark:border-yellow-800/50 bg-yellow-50/30 dark:bg-yellow-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <Timer className="h-5 w-5" />
              Actividad recomendada: Taller Eisenhower + Time Blocking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tu nivel medio de estrés sugiere que la organización y priorización te ayudarán a recuperar el control.
              Este taller guiado de 15 min te enseña a clasificar tareas y bloquear tiempo efectivamente.
            </p>

            <div className="space-y-3 text-sm">
              <h4 className="font-medium text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                <ListOrdered className="h-4 w-4" />
                Pasos del taller:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Lista tus tareas:</strong> Escribe todo lo que tienes pendiente (académico, personal, extracurricular)</li>
                <li><strong>Clasifica con Matriz de Eisenhower:</strong> Urgente/Importante → Haz ya; Importante/No urgente → Programa; Urgente/No importante → Delega; Ni urgente ni importante → Elimina</li>
                <li><strong>Time Blocking semanal:</strong> Reserva bloques de 60-90 min para trabajo profundo, 30 min para tareas ligeras, incluye pausas y tiempo personal</li>
                <li><strong>Regla 1-3-5 diaria:</strong> 1 tarea grande, 3 medianas, 5 pequeñas cada día</li>
              </ol>
            </div>

            <Separator className="my-2" />

            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/recursos/guias/regla-1-3-5-prioridades-diarias" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ListOrdered className="h-4 w-4" />
                  Guía: Regla 1-3-5
                </Button>
              </Link>
              <Link href="/recursos/plantillas/planificador-semanal-con-bloques" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Timer className="h-4 w-4" />
                  Plantilla semanal
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              También revisa los factores principales detectados arriba para saber en qué enfocarte.
            </p>
          </CardContent>
        </Card>

        {/* Próximos pasos recomendados con recursos disponibles */}
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ListOrdered className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Próximos pasos recomendados
          </h2>
          
          <div className="space-y-3">
            <Link href="/recursos/talleres/eisenhower-time-blocking" className="block">
              <Card className="hover:shadow-md transition-shadow border-yellow-200/50 dark:border-yellow-800/50 group">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Timer className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        Taller: Eisenhower + Time Blocking
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Taller guiado de 15 min para clasificar tareas (urgente/importante) y bloquear tiempo en tu semana
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/recursos/guias/regla-1-3-5-prioridades-diarias" className="block">
              <Card className="hover:shadow-md transition-shadow border-yellow-200/50 dark:border-yellow-800/50 group">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <ListOrdered className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        Guía: Regla 1-3-5 para prioridades diarias
                      </p>
                      <p className="text-sm text-muted-foreground">
                        1 tarea grande, 3 medianas, 5 pequeñas cada día. Enfoca tu energía en lo importante
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/recursos/plantillas/planificador-semanal-con-bloques" className="block">
              <Card className="hover:shadow-md transition-shadow border-yellow-200/50 dark:border-yellow-800/50 group">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        Plantilla: Planificador semanal con bloques de tiempo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Planificador visual semanal con bloques para clases, estudio profundo, ejercicio, comidas y sueño
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/recursos/plantillas/planificador-semanal-preventivo" className="block">
              <Card className="hover:shadow-md transition-shadow border-yellow-200/50 dark:border-yellow-800/50 group">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        Plantilla: Planificador semanal preventivo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Versión completa para planificar tu semana con bloques de estudio, descanso y autocuidado
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/recursos/checklists/revision-semanal-habitos" className="block">
              <Card className="hover:shadow-md transition-shadow border-yellow-200/50 dark:border-yellow-800/50 group">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Check className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        Checklist: Revisión semanal de hábitos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Evalúa cada semana tu carga académica, sueño y estrés. Ajusta antes de que se acumule
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/recursos/lecturas/7-habitos-estudiantes-efectivos" className="block">
              <Card className="hover:shadow-md transition-shadow border-yellow-200/50 dark:border-yellow-800/50 group">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        Lectura: 7 Hábitos de estudiantes altamente efectivos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Basado en Stephen Covey: sé proactivo, comienza con el fin en mente, pon primero lo primero
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
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