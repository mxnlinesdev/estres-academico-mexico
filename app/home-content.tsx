"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { StatCard, MEXICAN_STATS } from "@/components/StatCard"
import { Disclaimer, ModelDisclaimer } from "@/components/Disclaimer"
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
  RiInformationLine as Info
} from "@remixicon/react"

const FEATURES = [
  {
    icon: Brain,
    title: "Evaluación basada en IA",
    description: "Modelo de clasificación de 3 niveles (bajo/medio/alto) entrenado con dataset de alerta temprana estudiantil.",
  },
  {
    icon: Heart,
    title: "Recomendaciones personalizadas",
    description: "Según tu nivel, recibe rutas específicas: técnicas de estudio, manejo de ansiedad, o derivación a experto.",
  },
  {
    icon: Shield,
    title: "Factores explicables",
    description: "El modelo muestra los 2 factores principales que impulsan tu clasificación (empuje > 0.5).",
  },
]

const CONSECUENCIAS = [
  "Deserción escolar: 11.3% en media superior (ciclo 2023-2024)",
  "Riesgo de suicidio: tasa 10.2/100k en jóvenes 15-29 años (INEGI 2024)",
  "Ansiedad y depresión: hasta 50.9% en estudiantes (ENSANUT)",
  "Afectación del rendimiento académico y calidad de vida",
  "Consecuencias físicas: insomnio, fatiga crónica, sistema inmune deprimido",
]

const SENALES_ALERTA = [
  "Cambios drásticos en patrones de sueño o alimentación",
  "Irritabilidad, ansiedad o tristeza persistente",
  "Aislamiento social y pérdida de interés en actividades",
  "Dificultad para concentrarse y caída del rendimiento",
  "Pensamientos de abandono o desesperanza",
]

export function HomeContent() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Crisis Banner */}
      <CrisisBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <span>Conciencia salva vidas: 800 911 2000 (Línea de la Vida, 24/7)</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Conscientización del{' '}
            <span className="text-primary">Estrés Académico</span>
            {' '}en México
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            El estrés académico no gestionado es una de las principales causas de deserción escolar 
            y riesgo para la integridad de los estudiantes. Evalúa tu nivel, conoce los factores 
            de riesgo y accede a recursos de apoyo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/evaluacion">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Brain className="h-5 w-5" />
                Evaluar mi nivel de estrés
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver datos en México
            </Button>
          </div>

          {/* Badges de confianza */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              Modelo: 86% Accuracy
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              Recall alto: 91%
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              6 preguntas validadas
            </span>
            <span className="flex items-center gap-1">
              <Info className="h-4 w-4 text-primary" />
              Datos no mexicanos
            </span>
          </div>
        </div>
      </section>

      {/* Estadísticas México */}
      <section id="stats" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              La realidad en México: <span className="text-destructive">datos que importan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              El dataset original es de India, pero el problema es global. Aquí las estadísticas 
              oficiales mexicanas (INEGI, SEP, ENSANUT, CONASAMA) que contextualizan la urgencia.
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
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  Consecuencias del estrés no gestionado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {CONSECUENCIAS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <AlertCircle className="h-5 w-5 text-destructive/70 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  Señales de alerta temprana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {SENALES_ALERTA.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cómo funciona la evaluación */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo funciona la <span className="text-primary">evaluación</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              6 preguntas validadas científicamente → Modelo de clasificación → Resultado con factores explicados → Recomendaciones por nivel
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
                Preguntas de la evaluación
              </CardTitle>
              <CardDescription>
                Basadas en el contrato del modelo (6 features predictivas)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "¿Cuántas horas duermes al día? (4-8h)",
                  "¿Cuántas horas estudias a la semana fuera de clase? (4-20h)",
                  "¿Cuánto apoyo sientes de familia y amigos? (Nada/Poco/Bastante/Mucho)",
                  "¿Cuánta presión académica sientes del 0 al 10?",
                  "¿Participas en actividades extracurriculares? (Sí/No)",
                  "¿Cuál es tu promedio aproximado (0-10)?",
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

      {/* Niveles de estrés y rutas */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Niveles de estrés y <span className="text-primary">rutas de acción</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Según tu clasificación, recibirás recomendaciones específicas (placeholders funcionales)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                level: 'bajo',
                label: 'Bajo',
                color: 'success',
                icon: Check,
                message: 'Tus respuestas indican un nivel de estrés bajo. Sigue cuidando tus hábitos.',
                routes: ['Sigue así', 'Conoce más', 'Técnicas de estudio'],
              },
              {
                level: 'medio',
                label: 'Medio',
                color: 'warning',
                icon: AlertCircle,
                message: 'Tus respuestas indican un nivel de estrés medio. Revisa los factores señalados.',
                routes: ['Técnicas de estudio', 'Manejo de ansiedad', 'Disciplina para estudiar'],
              },
              {
                level: 'alto',
                label: 'Alto',
                color: 'destructive',
                icon: AlertCircle,
                message: 'Tus respuestas indican un nivel de estrés alto. Te recomendamos acercarte al área de orientación.',
                routes: ['Consulta a un experto'],
              },
            ].map((level, i) => (
              <Card key={i} className={`h-full border-2 ${level.color === 'destructive' ? 'border-destructive/30' : level.color === 'warning' ? 'border-yellow-300/30' : 'border-green-300/30'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={level.color as any} className="text-lg px-3 py-1">
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

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">¿Listo para conocer tu nivel?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
                La evaluación toma menos de 2 minutos. Obtén tu resultado inmediato con factores explicados 
                y recomendaciones personalizadas.
              </p>
              <Link href="/evaluacion">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  <Brain className="h-6 w-6" />
                  Comenzar evaluación
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto space-y-6">
          <Disclaimer showModelWarning={true} />
          <ModelDisclaimer />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estrés Académico México - Herramienta de apoyo educativo</p>
          <p>
            Modelo: <code className="bg-muted px-1 rounded">modelo_estres v1.0.0</code> | 
            Dataset: Kaggle rishavraj1232/student-early-stress-detection v2
          </p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratuita)
          </p>
        </div>
      </footer>
    </div>
  )
}