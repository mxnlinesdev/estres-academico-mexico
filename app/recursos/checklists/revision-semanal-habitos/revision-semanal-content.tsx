"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiCheckLine as Check,
  RiListOrdered as ListOrdered,
  RiFileTextLine as FileText,
  RiStarLine as Star,
  RiRefreshLine as Refresh
} from "@remixicon/react"

const CONSECUENCIAS = [
  "Deserción escolar: 11.3% en media superior (ciclo 2023-2024)",
  "Riesgo de suicidio: tasa 10.2/100k en jóvenes 15-29 años (INEGI 2024)",
  "Ansiedad y depresión: hasta 50.9% en estudiantes (ENSANUT)",
  "Afectación del rendimiento y calidad de vida",
  "Consecuencias físicas: insomnio, fatiga, sistema inmune deprimido",
]

const SENALES_ALERTA = [
  "Cambios drásticos en sueño o alimentación",
  "Irritabilidad, ansiedad o tristeza persistente",
  "Aislamiento social y pérdida de interés",
  "Dificultad para concentrarse y caída del rendimiento",
  "Pensamientos de abandono o desesperanza",
]

const handleReset = () => {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    (cb as HTMLInputElement).checked = false
  })
  document.getElementById('total-progress')!.textContent = '0%'
  document.getElementById('total-progress-bar')!.style.width = '0%'
  document.getElementById('completed-count')!.textContent = '0 de 20 items completados'
  for (let i = 0; i < 5; i++) {
    const el = document.getElementById(`cat-progress-${i}`)
    if (el) el.textContent = '0%'
  }
}

const categorias = [
  {
    titulo: "Sueño y energía",
    icono: "🌙",
    items: [
      "Me acosté y desperté a horas similares cada día",
      "Dormí 7-9 horas la mayoría de las noches",
      "Me desperté sintiéndome descansado la mayoría de los días",
      "Evité pantallas 1 hora antes de dormir al menos 5 días",
    ]
  },
  {
    titulo: "Estudio y productividad",
    icono: "📚",
    items: [
      "Usé técnica Pomodoro o bloques de tiempo dedicados",
      "Completé mis 3 prioridades principales cada día",
      "Usé técnicas de estudio activo (resúmenes, mapas, flashcards)",
      "Revisé y ajusté mi plan semanal el domingo",
    ]
  },
  {
    titulo: "Cuerpo y movimiento",
    icono: "🏃",
    items: [
      "Hice al menos 30 min de actividad física 4+ días",
      "Tomé pausas activas cada 60-90 min de estudio",
      "Mantuve buena hidratación durante el día",
      "Comí comidas regulares y nutritivas",
    ]
  },
  {
    titulo: "Bienestar mental y social",
    icono: "💚",
    items: [
      "Compartí mis avances o preocupaciones con alguien",
      "Tuve tiempo de ocio sin culpa al menos 3 veces",
      "Practiqué alguna técnica de relajación (respiración, meditación)",
      "Celebré al menos 3 logros de la semana",
    ]
  },
  {
    titulo: "Planificación y organización",
    icono: "📅",
    items: [
      "Revisé y actualicé mi planificador semanal",
      "Identifiqué 3 prioridades para la próxima semana",
      "Agendé tiempo para ejercicio, ocio y descanso",
      "Preparé materiales para el lunes por la mañana",
    ]
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
      {CONSECUENCIAS.map((item, i) => (
        <ListItem key={i} icon={<Check className="h-5 w-5 text-green-600" />}>
          {item}
        </ListItem>
      ))}
    </ul>
  )
}

function SenalesList() {
  return (
    <ul className="space-y-3">
      {SENALES_ALERTA.map((item, i) => (
        <ListItem key={i} icon={<Check className="h-5 w-5 text-green-600" />}>
          {item}
        </ListItem>
      ))}
    </ul>
  )
}

export default function RevisionSemanalContent() {
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
            <h1 className="font-semibold text-foreground">Checklist semanal</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <ListOrdered className="h-4 w-4" />
            <span>Checklist interactivo &middot; ~10 min</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Revisión semanal de hábitos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revisa tu semana en 10 minutos. Marca lo que cumpliste, identifica patrones y planifica la siguiente semana.
          </p>
        </header>

        <div className="bg-muted/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso total</span>
            <span className="font-medium" id="total-progress">0%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div id="total-progress-bar" className="h-full bg-primary transition-all duration-300" style={{ width: '0%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center" id="completed-count">0 de 20 items completados</p>
        </div>

        <section className="space-y-6">
          {categorias.map((categoria, catIndex) => (
            <section key={categoria.titulo} className="bg-card border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{categoria.icono}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{categoria.titulo}</h3>
                  <p className="text-xs text-muted-foreground">4 items · Marca los que cumpliste</p>
                </div>
              </div>

              <ul className="space-y-3" role="group" aria-labelledby={`cat-${catIndex}-label`}>
                {categoria.items.map((item, itemIndex) => (
                  <li key={`${catIndex}-${itemIndex}`} className="group">
                    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer"
                        onChange={(e) => {
                          const checkbox = e.target as HTMLInputElement
                          const list = checkbox.closest('ul')
                          const checkboxes = list?.querySelectorAll('input[type="checkbox"]')
                          const checked = list?.querySelectorAll('input[type="checkbox"]:checked')
                          const total = checkboxes?.length || 0
                          const completed = checked?.length || 0
                          const progress = total > 0 ? Math.round((completed / total) * 100) : 0
                          
                          const catProgress = document.getElementById(`cat-progress-${catIndex}`)
                          if (catProgress) catProgress.textContent = `${Math.round((completed / 4) * 100)}%`
                          
                          const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
                          const allChecked = document.querySelectorAll('input[type="checkbox"]:checked')
                          const totalAll = allCheckboxes.length
                          const completedAll = allChecked.length
                          const progressAll = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0
                          
                          document.getElementById('total-progress')!.textContent = `${progressAll}%`
                          document.getElementById('total-progress-bar')!.style.width = `${progressAll}%`
                          document.getElementById('completed-count')!.textContent = `${completedAll} de ${totalAll} items completados`
                        }}
                      />
                      <span className="flex-1 text-sm text-foreground leading-relaxed group-hover:text-primary transition-colors">
                        {item}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>Progreso de esta categoría</span>
                <span className="font-medium" id={`cat-progress-${catIndex}`}>0%</span>
              </div>
            </section>
          ))}
        </section>

        <section className="space-y-4 pt-4 border-t">
          <div className="bg-muted/30 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Resumen de la semana</h3>
            <textarea
              placeholder="¿Qué funcionó bien? ¿Qué ajustar? ¿Qué logré esta semana?"
              className="w-full min-h-[100px] p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full sm:w-auto gap-2" onClick={handleReset} variant="outline">
              <Refresh className="h-4 w-4" />
              Reiniciar checklist
            </Button>
            <Link href="/recursos/plantillas/planificador-semanal-preventivo">
              <Button variant="default" className="w-full sm:w-auto gap-2">
                Siguiente: Planificador semanal &rarr;
              </Button>
            </Link>
          </div>
        </section>

        <nav className="flex items-center justify-between pt-4 border-t">
          <Link href="/recursos/lecturas/7-habitos-estudiantes-efectivos" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Volver a la lectura
          </Link>
          <Link href="/recursos" className="text-sm text-muted-foreground hover:text-foreground">
            Todos los recursos
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