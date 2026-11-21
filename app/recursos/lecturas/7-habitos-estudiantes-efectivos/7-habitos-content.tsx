"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiBookOpenLine as BookOpen, 
  RiCheckLine as Check,
  RiBrainLine as Brain,
  RiHeartLine as Heart,
  RiTimeLine as Time,
  RiListOrdered as ListOrdered,
  RiFileTextLine as FileText,
  RiStarLine as Star,
  RiPhoneLine as Phone
} from "@remixicon/react"

const habitos = [
  {
    numero: 1,
    titulo: "Sueño reparador (7-9 horas)",
    descripcion: "El cerebro consolida memoria durante el sueño. Prioriza horarios regulares: acuéstate y levántate a la misma hora, incluso fines de semana. Evita pantallas 1 hora antes de dormir.",
    icono: Time,
    tiempo: "2 min",
    reflexion: "¿A qué hora te acuestas normalmente? ¿Te despiertas descansado?"
  },
  {
    numero: 2,
    titulo: "Planificación semanal (domingo 15 min)",
    descripcion: "Cada domingo, revisa tu semana: clases, entregas, exámenes, tiempo personal. Usa un planificador visual. Bloquea tiempo para estudio profundo, ejercicio y descanso.",
    icono: ListOrdered,
    tiempo: "2 min",
    reflexion: "¿Tienes una vista semanal de tus compromisos?"
  },
  {
    numero: 3,
    titulo: "Estudio activo (no pasivo)",
    descripcion: "No solo releas. Usa: resúmenes en tus palabras, mapas mentales, flashcards, explica en voz alta, enseña a otro. La técnica Feynman: si no puedes explicarlo simple, no lo entiendes.",
    icono: Brain,
    tiempo: "2 min",
    reflexion: "¿Cómo estudias actualmente? ¿Relees o procesas activamente?"
  },
  {
    numero: 4,
    titulo: "Técnica Pomodoro (25/5)",
    descripcion: "Trabaja en bloques de 25 min + 5 min pausa. Cada 4 ciclos, pausa larga de 15-30 min. Mantiene foco y evita agotamiento. Usa app o timer físico.",
    icono: Time,
    tiempo: "2 min",
    reflexion: "¿Cuánto tiempo estudias seguido sin pausa?"
  },
  {
    numero: 5,
    titulo: "Ejercicio y movimiento diario",
    descripcion: "30 min actividad aeróbica mejora memoria, atención y estado de ánimo. Camina, corre, baila, yoga. Lo importante: constancia, no intensidad.",
    icono: Heart,
    tiempo: "1 min",
    reflexion: "¿Cuántos días a la semana mueves tu cuerpo intencionalmente?"
  },
  {
    numero: 6,
    titulo: "Revisión semanal (viernes 10 min)",
    descripcion: "¿Qué logré? ¿Qué quedó pendiente? ¿Qué funcionó? ¿Qué ajustar? Ajusta plan de la siguiente semana. Celebra logros, por pequeños que sean.",
    icono: Star,
    tiempo: "1 min",
    reflexion: "¿Cuándo fue la última vez que revisaste tu semana conscientemente?"
  },
  {
    numero: 7,
    titulo: "Red de apoyo y autocuidado",
    descripcion: "Comparte metas con alguien de confianza. Pide ayuda cuando la necesites. Mantén espacios de ocio sin culpa. El equilibrio previene el burnout.",
    icono: Heart,
    tiempo: "1 min",
    reflexion: "¿Con quién puedes compartir tus metas académicas?"
  },
] as const

function ListItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-muted-foreground">
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <span>{children}</span>
    </li>
  )
}

function ConsequencesList() {
  return (
    <ul className="space-y-3">
      {habitos.map((item, i) => (
        <ListItem key={i} icon={<Check className="h-5 w-5 text-green-600" />}>
          {item.titulo}
        </ListItem>
      ))}
    </ul>
  )
}

function SenalesList() {
  return (
    <ul className="space-y-3">
      {habitos.map((item, i) => (
        <ListItem key={i} icon={<Check className="h-5 w-5 text-green-600" />}>
          {item.titulo}
        </ListItem>
      ))}
    </ul>
  )
}

export default function Lectura7HabitosContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" role="status" aria-live="polite" id="toast-container"></div>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-destructive/30 bg-destructive/10 px-4 py-3 shadow-lg md:static md:border md:rounded-lg md:shadow-none md:bg-destructive/5 md:p-4" role="alert" aria-live="assertive">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6 text-destructive flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.34 16.5c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <p className="font-semibold text-destructive">¿Necesitas ayuda inmediata?</p>
              <p className="text-sm text-muted-foreground">
                No estás solo. Hay profesionales disponibles 24/7 para escucharte.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <a
              href="tel:8009112000"
              className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-medium hover:bg-destructive/90 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>800 911 2000</span>
              <span className="text-xs hidden sm:inline">(Línea de la Vida)</span>
            </a>
          </div>
        </div>
      </div>

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/recursos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Recursos</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Lectura guiada</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <article className="space-y-8">
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              <BookOpen className="h-4 w-4" />
              <span>Lectura guiada · ~15 min</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              7 Hábitos de estudiantes altamente efectivos
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Lectura guiada para reforzar y optimizar tus hábitos académicos. 
              Cada hábito incluye una reflexión para que lo personalices a tu realidad.
            </p>
          </header>

          <div className="bg-muted/30 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progreso de lectura</span>
              <span className="font-medium" id="progress-text">0%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                id="progress-bar" 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: '0%' }}
              />
            </div>
          </div>

          <section className="space-y-6">
            {habitos.map((habito, index) => (
              <section 
                key={habito.numero} 
                id={`habito-${habito.numero}`}
                className="bg-card border border-border rounded-xl p-6 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <habito.icono className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">{habito.numero}.</span>
                      <h3 className="text-xl font-bold text-foreground">{habito.titulo}</h3>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                        {habito.tiempo}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{habito.descripcion}</p>
                  </div>
                </div>

                <details className="group border-t border-border pt-4">
                  <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-primary hover:text-primary/80">
                    <Check className="h-4 w-4" />
                    <span>Reflexión personal</span>
                    <span className="ml-auto text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-3 p-4 bg-muted/30 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">{habito.reflexion}</p>
                    <textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="w-full min-h-[80px] p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      rows={3}
                      data-habito={habito.numero}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        const section = e.currentTarget.closest('section')
                        const nextSection = section?.nextElementSibling
                        if (nextSection) {
                          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                        const progress = Math.round(((index + 1) / habitos.length) * 100)
                        document.getElementById('progress-text')!.textContent = `${progress}%`
                        document.getElementById('progress-bar')!.style.width = `${progress}%`
                      }}
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Continuar →
                    </button>
                  </div>
                </details>
              </section>
            ))}
          </section>

          <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">¡Completaste la lectura!</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Los hábitos se construyen con pequeños pasos diarios. Elige uno para empezar esta semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/recursos/checklists/revision-semanal-habitos">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Check className="h-4 w-4" />
                  Checklist: Revisión semanal
                </Button>
              </Link>
              <Link href="/recursos/plantillas/planificador-semanal-preventivo">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <FileText className="h-4 w-4" />
                  Plantilla: Planificador preventivo
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
        </article>
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