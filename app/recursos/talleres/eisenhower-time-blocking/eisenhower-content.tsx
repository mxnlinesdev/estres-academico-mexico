"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiTimerLine as Timer, 
  RiListOrdered as ListOrdered,
  RiBrainLine as Brain,
  RiEditLine as Edit,
  RiCheckboxLine as Checkbox,
  RiArrowRightLine as ArrowRight,
  RiStarLine as Star
} from "@remixicon/react"

const cuadrantes = [
  {
    key: 'hacer-ya',
    titulo: 'HACER YA',
    subtitulo: 'Urgente + Importante',
    descripcion: 'Crisis, plazos inmediatos, emergencias, problemas que no pueden esperar.',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700',
    icono: '🔴',
    ejemplos: ['Examen mañana sin estudiar', 'Entrega de proyecto en 2 horas', 'Emergencia familiar', 'Síntomas de salud urgentes'],
    accion: 'Hazlo AHORA. Sin excusas.'
  },
  {
    key: 'programar',
    titulo: 'PROGRAMAR',
    subtitulo: 'Importante + No Urgente',
    descripcion: 'Metas a largo plazo, prevención, planificación, desarrollo de habilidades, relaciones.',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
    icono: '🟢',
    ejemplos: ['Estudio profundo para examen en 2 semanas', 'Ejercicio 3x/semana', 'Planificación semanal', 'Aprender nueva habilidad', 'Tiempo con familia/amigos'],
    accion: 'Ponle FECHA y HORA en tu calendario. Protégelo.'
  },
  {
    key: 'delegar',
    titulo: 'DELEGAR / REDUCIR',
    subtitulo: 'Urgente + No Importante',
    descripcion: 'Interrupciones, reuniones innecesarias, favores de otros, notificaciones triviales.',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
    icono: '🟡',
    ejemplos: ['WhatsApp grupal sin relevancia', 'Reunión sin agenda clara', 'Favores que no te corresponden', 'Notificaciones de redes sociales'],
    accion: 'Di NO, delega, automatiza o pospón.'
  },
  {
    key: 'eliminar',
    titulo: 'ELIMINAR',
    subtitulo: 'No Urgente + No Importante',
    descripcion: 'Perdedores de tiempo, scroll infinito, procrastinación disfrazada, perfeccionismo innecesario.',
    color: 'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600',
    icono: '⚪',
    ejemplos: ['Scroll infinito TikTok/IG', 'Ver series en binge', 'Reorganizar escritorio por 3ra vez', 'Leer noticias irrelevantes'],
    accion: 'Elimina sin culpa. Recupera tu tiempo.'
  },
] as const

const pasosTimeBlocking = [
  {
    numero: 1,
    titulo: 'Vuelca todo (Brain Dump)',
    descripcion: 'Escribe TODO lo que tienes en mente: tareas, ideas, preocupaciones, pendientes. No filtres, solo saca.',
    duracion: '5 min',
    accion: 'Escribe en papel o app todo lo que tengas en mente'
  },
  {
    numero: 2,
    titulo: 'Clasifica con Eisenhower',
    descripcion: 'Toma cada item y ponlo en su cuadrante. Sé honesto: ¿es realmente urgente? ¿Realmente importante?',
    duracion: '5 min',
    accion: 'Clasifica cada item en su cuadrante'
  },
  {
    numero: 3,
    titulo: 'Time Blocking semanal',
    descripcion: 'Abre tu calendario semanal. Bloquea primero: sueño, clases fijas, comidas. Luego agenda bloques de 90 min para cuadrante 2 (Programar).',
    duracion: '5 min',
    accion: 'Bloquea en tu calendario: sueño, clases, 2-3 bloques de 90 min para "Programar"'
  },
  {
    numero: 4,
    titulo: 'Regla 1-3-5 diaria',
    descripcion: 'Cada mañana: 1 tarea grande (cuadrante 2), 3 medianas (cuadrante 1/2), 5 pequeñas (cuadrante 1/3).',
    duracion: '2 min',
    accion: 'Define tu 1-3-5 de hoy'
  },
] as const

const tips = [
  'Protege tus bloques de "Programar" como si fueran clases: inamovibles.',
  'Usa bloques de 90 min (ciclo ultradiano) + 15-20 min pausa.',
  'Agrupa tareas similares: emails juntos, lecturas juntas, problemas juntos.',
  'Deja 20% del día sin planear para imprevistos y recuperación.',
  'Revisa al final del día: ¿qué completé? ¿qué mover? ¿qué eliminé?',
  'Revisión semanal (domingo 15 min): ajusta la semana entrante.',
] as const

export default function TallerEisenhowerContent() {
  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/recursos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Recursos</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Taller guiado</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <Timer className="h-4 w-4" />
            <span>Taller guiado · ~15 min</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Taller: Matriz de Eisenhower + Time Blocking
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Taller guiado de 15 min para clasificar tus tareas con la Matriz de Eisenhower 
            y bloquear tiempo efectivamente en tu calendario semanal.
          </p>
        </header>

        <div className="bg-muted/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso del taller</span>
            <span className="font-medium" id="progress-text">0%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div id="progress-bar" className="h-full bg-primary transition-all duration-300" style={{ width: '0%' }} />
          </div>
        </div>

        <section className="space-y-6">
          {pasosTimeBlocking.map((paso, index) => (
            <section 
              key={paso.numero} 
              id={`paso-${paso.numero}`}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-2xl font-bold">{paso.numero}</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-foreground">Paso {paso.numero}: {paso.titulo}</h3>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                      {paso.duracion}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span>⚡ Acción:</span>
                  <span>{paso.accion}</span>
                </div>
                
                {index === 0 && (
                  <textarea
                    className="w-full min-h-[120px] p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={6}
                    placeholder="Ej: Examen cálculo martes, proyecto historia viernes, lavar ropa, llamar a mamá, leer cap 3 biología, pagar tarjeta, ir al gym, reunirme con equipo proyecto, comprar víveres, dormir temprano..."
                  />
                )}
                
                {index === 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🔴 HACER YA</h4>
                      <textarea placeholder="Urgente + Importante..." className="w-full min-h-[60px] bg-transparent border-none focus:outline-none text-sm resize-none" rows={3}></textarea>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🟢 PROGRAMAR</h4>
                      <textarea placeholder="Importante + No Urgente..." className="w-full min-h-[60px] bg-transparent border-none focus:outline-none text-sm resize-none" rows={3}></textarea>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🟡 DELEGAR</h4>
                      <textarea placeholder="Urgente + No Importante..." className="w-full min-h-[60px] bg-transparent border-none focus:outline-none text-sm resize-none" rows={3}></textarea>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">⚪ ELIMINAR</h4>
                      <textarea placeholder="No Urgente + No Importante..." className="w-full min-h-[60px] bg-transparent border-none focus:outline-none text-sm resize-none" rows={3}></textarea>
                    </div>
                  </div>
                )}
                
                {index === 2 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Abre tu calendario (Google Calendar, Notion, papel) y bloquea:</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        <h5 className="font-semibold text-indigo-800 dark:text-indigo-200">🌙 SUEÑO</h5>
                        <p className="text-sm text-muted-foreground mt-1">Bloquea 7-9h (ej: 23:00-07:00)</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h5 className="font-semibold text-purple-800 dark:text-purple-200">🏫 CLASES FIJAS</h5>
                        <p className="text-sm text-muted-foreground mt-1">Horarios inamovibles</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                        <h5 className="font-semibold text-orange-800 dark:text-orange-200">🍽️ COMIDAS</h5>
                        <p className="text-sm text-muted-foreground mt-1">Horarios regulares</p>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">🟢 BLOQUES "PROGRAMAR" (Cuadrante 2)</h5>
                      <p className="text-sm text-muted-foreground mb-2">Agrega 2-3 bloques de 90 min para lo importante no urgente:</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        <input type="text" placeholder="Bloque 1: ej. Estudio cálculo 15:00-16:30" className="w-full p-2 text-sm border border-border rounded bg-background" />
                        <input type="text" placeholder="Bloque 2: ej. Proyecto historia 10:00-11:30" className="w-full p-2 text-sm border border-border rounded bg-background" />
                        <input type="text" placeholder="Bloque 3: ej. Ejercicio 18:30-19:00" className="w-full p-2 text-sm border border-border rounded bg-background" />
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🟡 PAUSAS Y RECUPERACIÓN</h5>
                      <p className="text-sm text-muted-foreground">Pausas de 15-20 min cada 90 min. Tiempo libre 20%.</p>
                    </div>
                  </div>
                )}
                
                {index === 3 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Define tu 1-3-5 de HOY:</p>
                    <div className="space-y-2">
                      <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                        <label className="block text-sm font-medium text-primary mb-1">1 TAREA GRANDE (Cuadrante 2 - Importante)</label>
                        <input type="text" placeholder="Ej: Avanzar 2 capítulos de cálculo para examen del jueves" className="w-full mt-1 p-2 text-sm border border-border rounded bg-background" />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">3 TAREAS MEDIANAS (Cuadrantes 1/2)</label>
                        <div className="space-y-1">
                          <input type="text" placeholder="1. Ej: Resolver 5 problemas de práctica" className="w-full p-2 text-sm border border-border rounded bg-background" />
                          <input type="text" placeholder="2. Ej: Escribir intro de ensayo historia" className="w-full p-2 text-sm border border-border rounded bg-background" />
                          <input type="text" placeholder="3. Ej: Revisar flashcards biología 15 min" className="w-full p-2 text-sm border border-border rounded bg-background" />
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">5 TAREAS PEQUEÑAS (Cuadrantes 1/3)</label>
                        <div className="space-y-1">
                          <input type="text" placeholder="1. Ej: Lavar ropa" className="w-full p-2 text-sm border border-border rounded bg-background" />
                          <input type="text" placeholder="2. Ej: Contestar emails pendientes" className="w-full p-2 text-sm border border-border rounded bg-background" />
                          <input type="text" placeholder="3. Ej: Comprar víveres" className="w-full p-2 text-sm border border-border rounded bg-background" />
                          <input type="text" placeholder="4. Ej: Llamar a mamá" className="w-full p-2 text-sm border border-border rounded bg-background" />
                          <input type="text" placeholder="5. Ej: Preparar mochila mañana" className="w-full p-2 text-sm border border-border rounded bg-background" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  const nextSection = document.getElementById(`paso-${paso.numero + 1}`)
                  if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  const progress = Math.round(((index + 1) / pasosTimeBlocking.length) * 100)
                  document.getElementById('progress-text')!.textContent = `${progress}%`
                  document.getElementById('progress-bar')!.style.width = `${progress}%`
                }}
                className="w-full sm:w-auto mt-4 text-primary font-medium hover:text-primary/80 flex items-center gap-1"
              >
                {index < pasosTimeBlocking.length - 1 ? (
                  <>
                    Siguiente paso
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Finalizar taller
                    <Star className="h-4 w-4" />
                  </>
                )}
              </button>
            </section>
          ))}
        </section>

        {/* Cuadrantes de Eisenhower */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Matriz de Eisenhower</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {cuadrantes.map((c, i) => (
              <Card key={i} className={c.color}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl">{c.icono}</span>
                      <span className="ml-2 text-lg font-bold">{c.titulo}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{c.subtitulo}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{c.descripcion}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                    {c.ejemplos.map((e, j) => <li key={j}>{e}</li>)}
                  </ul>
                  <div className="pt-2 border-t border-current/20">
                    <p className="text-xs font-medium text-foreground">{c.accion}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Claves para que funcione
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="/recursos/guias/regla-1-3-5-prioridades-diarias">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <ListOrdered className="h-4 w-4" />
                Guía: Regla 1-3-5
              </Button>
            </Link>
            <Link href="/recursos/plantillas/planificador-semanal-con-bloques">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Timer className="h-4 w-4" />
                Plantilla semanal
              </Button>
            </Link>
          </div>
        </section>

        <nav className="flex items-center justify-between pt-4 border-t">
          <Link href="/recursos" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver a recursos
          </Link>
        </nav>
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estrés Académico México - Herramienta de apoyo educativo</p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratuita)
          </p>
        </div>
      </footer>
    </div>
  )
}