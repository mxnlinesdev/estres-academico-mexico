"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { StatCard, MEXICAN_STATS } from "@/components/StatCard"
import { Disclaimer } from "@/components/Disclaimer"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiBrainLine as Brain, 
  RiHeartLine as Heart, 
  RiUserCommunityLine as Users, 
  RiGraduationCapLine as GraduationCap, 
  RiAlertLine as AlertCircle, 
  RiArrowRightLine as ArrowRight, 
  RiCheckLine as Check,
  RiBookOpenLine as BookOpen,
  RiShieldLine as Shield,
  RiCloseLine as X
} from "@remixicon/react"

const FEATURES = [
  {
    icon: Brain,
    title: "Evaluacion rapida",
    description: "6 preguntas sencillas. Resultado inmediato.",
  },
  {
    icon: Heart,
    title: "Recomendaciones claras",
    description: "Segun tu nivel: tecnicas, manejo de ansiedad o derivacion a experto.",
  },
  {
    icon: Shield,
    title: "Factores explicados",
    description: "El modelo muestra que respuestas impulsan tu resultado.",
  },
]

const CONSECUENCIAS = [
  "Desercion escolar: 11.3% en media superior (ciclo 2023-2024)",
  "Riesgo de suicidio: tasa 10.2/100k en jovenes 15-29 anos (INEGI 2024)",
  "Ansiedad y depresion: hasta 50.9% en estudiantes (ENSANUT)",
  "Afectacion del rendimiento y calidad de vida",
  "Consecuencias fisicas: insomnio, fatiga, sistema inmune deprimido",
]

const SENALES_ALERTA = [
  "Cambios drasticos en sueno o alimentacion",
  "Irritabilidad, ansiedad o tristeza persistente",
  "Aislamiento social y perdida de interes",
  "Dificultad para concentrarse y caida del rendimiento",
  "Pensamientos de abandono o desesperanza",
]

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
        <ListItem key={i} icon={<X className="h-5 w-5 text-destructive/70" />}>
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

export function HomeContent() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <CrisisBanner />

      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive text-sm font-medium mb-6">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <span>Conciencia salva vidas: 800 911 2000 (Linea de la Vida, 24/7)</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Conscientizacion del{' '}
            <span className="text-primary">Estres Academico</span>
            {' '}en Mexico
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            El estres academico no gestionado es una de las principales causas de desercion escolar 
            y riesgo para la integridad de los estudiantes. Evalua tu nivel y accede a recursos de apoyo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/evaluacion">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Brain className="h-5 w-5" />
                Evaluar mi nivel de estres
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver datos en Mexico
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              6 preguntas
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              Resultado inmediato
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              Recomendaciones por nivel
            </span>
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              La realidad en Mexico: <span className="text-destructive">datos que importan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estadisticas oficiales mexicanas (INEGI, SEP, ENSANUT, CONASAMA).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {MEXICAN_STATS.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          <Separator className="my-8" />

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <X className="h-6 w-6 text-destructive" />
                  <CardTitle>Consecuencias del estres no gestionado</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ConsequencesList />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Check className="h-6 w-6 text-green-600" />
                  <CardTitle>Senales de alerta temprana</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <SenalesList />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como funciona la <span className="text-primary">evaluacion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              6 preguntas - Resultado - Recomendaciones segun tu nivel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {FEATURES.map((feature, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Las 6 preguntas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Cuantas horas duermes al dia? (4-8h)",
                  "Cuantas horas estudias a la semana? (4-20h)",
                  "Apoyo de familia y amigos? (Nada/Poco/Bastante/Mucho)",
                  "Presion academica del 0 al 10?",
                  "Actividades extracurriculares? (Si/No)",
                  "Promedio aproximado (0-10)?",
                ].map((q, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-sm">{q}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Niveles de estres y <span className="text-primary">rutas de accion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recomendaciones segun tu resultado (placeholders)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                level: 'bajo',
                label: 'Bajo',
                color: 'success',
                icon: Check,
                message: 'Nivel de estres bajo. Sigue cuidando tus habitos.',
                routes: ['Sigue asi', 'Conoce mas', 'Tecnicas de estudio'],
              },
              {
                level: 'medio',
                label: 'Medio',
                color: 'warning',
                icon: AlertCircle,
                message: 'Nivel de estres medio. Revisa los factores senalados.',
                routes: ['Tecnicas de estudio', 'Manejo de ansiedad', 'Disciplina'],
              },
              {
                level: 'alto',
                label: 'Alto',
                color: 'destructive',
                icon: AlertCircle,
                message: 'Nivel de estres alto. Acude a orientacion escolar.',
                routes: ['Consulta a un experto'],
              },
            ].map((level, i) => (
              <Card key={i} className={`h-full border ${level.color === 'destructive' ? 'border-destructive/20' : level.color === 'warning' ? 'border-yellow-300/20' : 'border-green-300/20'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={level.color as any} className="text-base px-3 py-1">
                      {level.label.toUpperCase()}
                    </Badge>
                    <level.icon className={`h-8 w-8 ${level.color === 'success' ? 'text-green-600' : level.color === 'warning' ? 'text-yellow-600' : 'text-destructive'}`} />
                  </div>
                  <CardTitle className="text-lg">{level.message}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {level.routes.map((route, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className={`h-4 w-4 ${level.color === 'success' ? 'text-green-600' : level.color === 'warning' ? 'text-yellow-600' : 'text-destructive'}`} />
                        <span>{route}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Listo para conocer tu nivel?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
                Menos de 2 minutos. Resultado inmediato con recomendaciones.
              </p>
              <Link href="/evaluacion">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  <Brain className="h-6 w-6" />
                  Comenzar evaluacion
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <Disclaimer showModelWarning={true} />
        </div>
      </section>

      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estres Academico Mexico - Herramienta de apoyo educativo</p>
          <p className="text-destructive font-medium">
            Crisis? Linea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratuita)
          </p>
        </div>
      </footer>
    </div>
  )
}