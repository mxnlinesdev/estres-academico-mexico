"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiListOrdered as ListOrdered,
  RiCheckLine as Check,
  RiStarLine as Star,
  RiBrainLine as Brain,
  RiTimerLine as Timer,
  RiEditLine as Edit,
  RiFileTextLine as FileText
} from "@remixicon/react"

const ejemplos = {
  '1-grande': [
    'Avanzar 2 capítulos de cálculo para examen del jueves',
    'Escribir 500 palabras del ensayo de historia',
    'Resolver 10 problemas de práctica de física',
    'Preparar diapositivas para exposición del viernes',
    'Completar informe de laboratorio de química',
  ],
  '3-medianas': [
    'Revisar flashcards de anatomía 20 min',
    'Resolver 5 problemas de práctica de cálculo',
    'Escribir introducción del ensayo',
    'Hacer resumen del capítulo 3 de biología',
    'Enviar email al profesor con dudas',
    'Organizar apuntes de la semana',
    'Revisar feedback de última entrega',
  ],
  '5-pequenas': [
    'Responder 3 emails pendientes',
    'Lavar ropa / tender cama',
    'Comprar víveres / snack saludable',
    'Contestar 2 WhatsApp importantes',
    'Preparar mochila/ropa para mañana',
    'Beber 2 vasos de agua',
    'Estirar 5 min / respirar profundo',
    'Guardar archivo / organizar escritorio',
    'Confirmar cita / horario de mañana',
    'Regar plantas / sacar basura',
  ],
} as const

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
    toast.textContent = 'Plantilla copiada al portapapeles'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  })
}

const handleCopyTemplate = () => {
  handleCopy(`1 GRANDE: 
3 MEDIANAS: 1) 2) 3)
5 PEQUEÑAS: 1) 2) 3) 4) 5)`)
}

const handleCopyToday = () => {
  handleCopy(`1-3-5 del ${new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
================================

1 GRANDE: 

3 MEDIANAS:
1) 
2) 
3) 

5 PEQUEÑAS:
1) 
2) 
3) 
4) 
5) 

---
Generado con regla 1-3-5 | Estrés Académico México`)
}

export default function GuiaRegla135Content() {
  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/recursos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Recursos</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Guía práctica</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <ListOrdered className="h-4 w-4" />
            <span>Guía práctica · ~5 min lectura</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Regla 1-3-5: Prioridades diarias claras
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Método simple para definir prioridades diarias: 1 tarea grande, 3 medianas, 5 pequeñas. 
            Reduce la parálisis por decisión y da foco inmediato.
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              ¿Por qué funciona?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>El cerebro se paraliza ante listas infinitas. La regla 1-3-5 fuerza priorización realista:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>1 grande:</strong> Lo que mueve la aguja. Si solo logras esto, el día fue productivo.</li>
              <li><strong>3 medianas:</strong> Avance incremental. Mantienen proyectos en marcha.</li>
              <li><strong>5 pequeñas:</strong> Mantenimiento, admin, bienestar. Evitan acumulación.</li>
            </ul>
            <p className="text-primary text-sm">Total: 9 tareas máx. Realista para un día.</p>
          </CardContent>
        </Card>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground">Tu plantilla 1-3-5 de hoy</h2>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Completa tu 1-3-5 de HOY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <label className="block text-sm font-medium text-primary mb-2">1 TAREA GRANDE (Impacto alto)</label>
                <input 
                  type="text" 
                  placeholder="Ej: Avanzar 2 capítulos de cálculo para examen del jueves"
                  className="w-full mt-1 p-3 bg-background border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">3 TAREAS MEDIANAS</label>
                <div className="space-y-2">
                  <input type="text" placeholder="1. Ej: Resolver 5 problemas de práctica" className="w-full p-2 text-sm border border-border rounded bg-background" />
                  <input type="text" placeholder="2. Ej: Escribir intro de ensayo historia" className="w-full p-2 text-sm border border-border rounded bg-background" />
                  <input type="text" placeholder="3. Ej: Revisar flashcards biología 15 min" className="w-full p-2 text-sm border border-border rounded bg-background" />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">5 TAREAS PEQUEÑAS</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  <input type="text" placeholder="1. Ej: Responder 3 emails" className="w-full p-2 text-sm border border-border rounded bg-background" />
                  <input type="text" placeholder="2. Ej: Lavar ropa" className="w-full p-2 text-sm border border-border rounded bg-background" />
                  <input type="text" placeholder="3. Ej: Comprar snack saludable" className="w-full p-2 text-sm border border-border rounded bg-background" />
                  <input type="text" placeholder="4. Ej: Estirar 5 min" className="w-full p-2 text-sm border border-border rounded bg-background" />
                  <input type="text" placeholder="5. Ej: Preparar mochila mañana" className="w-full p-2 text-sm border border-border rounded bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={handleCopyTemplate}>
              <FileText className="h-4 w-4" />
              Copiar plantilla vacía
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleCopyToday}>
              <FileText className="h-4 w-4" />
              Copiar plantilla de hoy
            </Button>
          </div>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground">Ejemplos por contexto</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                contexto: 'Semana de exámenes',
                grande: 'Completar guía de repaso cálculo (3 capítulos)',
                medianas: ['Resolver 10 problemas tipo examen', 'Hacer mapa mental teoremas clave', 'Revisar errores tests anteriores'],
                pequenas: ['Revisar flashcards 15 min', 'Dormir 8h', 'Comer bien', 'Pausa 10 min cada hora', 'Dormir antes 23:00'],
              },
              {
                contexto: 'Semana normal + proyecto',
                grande: 'Avanzar 30% proyecto final (investigación + estructura)',
                medianas: ['Buscar 5 fuentes académicas', 'Esquema capítulos 1-3', 'Reunión 30 min con equipo'],
                pequenas: ['Responder 2 emails', 'Comprar café', 'Llamar mamá', 'Estirar 5 min', 'Preparar ropa mañana'],
              },
              {
                contexto: 'Semana ligera / recuperación',
                grande: 'Organizar todo el material del semestre (archivar, digitalizar)',
                medianas: ['Ordenar apuntes por materia', 'Subir notas a Notion/Drive', 'Hacer backup fotos/documentos'],
                pequenas: ['Eliminar apps inútiles', 'Limpiar escritorio', 'Regar plantas', 'Llamar amigo', 'Dormir siesta 20 min'],
              },
            ].map((ej, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    {ej.contexto}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
                    <span className="font-medium text-primary">1 Grande:</span> <span className="text-muted-foreground ml-2">{ej.grande}</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">3 Medianas:</div>
                    <ul className="list-decimal list-inside space-y-1 text-xs text-blue-700 dark:text-blue-300">
                      {ej.medianas.map(m => <li key={m}>{m}</li>)}
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">5 Pequeñas:</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      {ej.pequenas.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-primary/5 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Claves para que funcione
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span>Escríbelo la noche anterior o primera hora de la mañana</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span>La "1 grande" debe poder hacerse en 2-4 horas max</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span>Si surge emergencia: reprograma medianas/pequeñas, protege la grande</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">4.</span>Revisa al final del día: ¿qué completé? ¿qué mover a mañana?</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">5.</span>Si todo falló: ¿cuál era la 1 grande? Hazla mañana primero.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/recursos/talleres/eisenhower-time-blocking">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Timer className="h-4 w-4" />
              Taller: Eisenhower + Time Blocking
            </Button>
          </Link>
          <Link href="/recursos/plantillas/planificador-semanal-con-bloques">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Timer className="h-4 w-4" />
              Plantilla semanal
            </Button>
          </Link>
        </div>

        <nav className="flex items-center justify-between pt-4 border-t">
          <Link href="/recursos" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver a recursos
          </Link>
        </nav>
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estrés Académico México - Herramienta de apoyo educativo</p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratuita)
          </p>
        </div>
      </footer>
    </div>
  )
}