"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiPhoneLine as Phone,
  RiShieldLine as Shield,
  RiTimeLine as Time,
  RiInformationLine as Info,
  RiHeartLine as Heart,
  RiMapPinLine as MapPin
} from "@remixicon/react"

const mythCards = [
  { mito: '"Mis problemas no son tan graves"', realidad: 'Si te afecta, es grave. No hay umbral mínimo de sufrimiento.' },
  { mito: '"Me van a juzgar / me van a internar"', realidad: 'Escuchan sin juzgar. Solo internan si hay riesgo vital inminente Y tú lo aceptas.' },
  { mito: '"Es gratis pero la llamada me cuesta"', realidad: 'Es 100% gratis desde fijo o celular. No consume saldo ni minutos.' },
  { mito: '"Ya llamé y no me ayudaron"', realidad: 'Cada llamada es distinta. Hay turnos rotativos. Vuelve a llamar.' },
  { mito: '"Solo es para suicidio"', realidad: 'Es para CUALQUIER malestar emocional: ansiedad, duelo, estrés, soledad, dudas.' },
  { mito: '"Ya probé terapia y no funcionó"', realidad: 'Cada terapeuta es distinto. La línea te orienta a opciones que SÍ funcionen.' },
].map((item, i) => (
  <Card key={i} className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
    <CardContent className="flex items-start gap-3">
      <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div>
        <p className="font-medium text-yellow-800 dark:text-yellow-200">{item.mito}</p>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">{item.realidad}</p>
      </div>
    </CardContent>
  </Card>
))

export default function LineaVidaContent() {
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
            <h1 className="font-semibold text-foreground">Línea de la Vida</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Phone className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-700 dark:text-red-300">800 911 2000</h1>
              <p className="text-red-600 dark:text-red-400 mt-1">Línea de la Vida (CONASAMA)</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">Gratuita</p>
              <p className="text-sm text-red-600 dark:text-red-400">Sin costo desde cualquier teléfono</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">Confidencial</p>
              <p className="text-sm text-red-600 dark:text-red-400">Tu privacidad está protegida</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">24/7</p>
              <p className="text-sm text-red-600 dark:text-red-400">Disponible todo el año</p>
            </div>
          </div>

          <a 
            href="tel:8009112000"
            className="mt-6 inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            <Phone className="h-6 w-6" />
            <span>Llamar ahora: 800 911 2000</span>
          </a>
        </div>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">¿Qué pasa cuando llamas?</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Time className="h-5 w-5" />
                  Disponible 24/7
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Disponible las 24 horas, los 365 días del año. No importa la hora, siempre hay alguien al otro lado.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Confidencial y gratis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>La llamada es gratuita desde cualquier teléfono (fijo o celular). Tu información es confidencial.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Apoyo emocional
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Psicólogos y consejeros capacitados te escuchan sin juzgar. Te ayudan a calmar la crisis y encontrar opciones.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Canalización
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Si necesitas atención presencial, te orientan a servicios cercanos: psicólogos, clínicas, hospitales.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">¿Cuándo llamar?</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.34 16.5c-.77 1.333.192 3 1.732 3z" /></svg>
                  LLAMA YA (Crisis aguda)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1 text-red-700 dark:text-red-300">
                  <li>Piensas en hacerte daño o suicidarte</li>
                  <li>Tienes plan concreto para hacerte daño</li>
                  <li>Sientes que no puedes más, no ves salida</li>
                  <li>Alguien más está en peligro inminente</li>
                  <li>Crisis de pánico severa, no puedes respirar</li>
                </ul>
                <p className="text-red-700 dark:text-red-300 font-medium mt-2">Si es riesgo inmediato para tu vida: llama al 911</p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.34 16.5c-.77 1.333.192 3 1.732 3z" /></svg>
                  LLAMA PRONTO (Malestar fuerte)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1 text-yellow-800 dark:text-yellow-300">
                  <li>Ansiedad intensa que no pasa, ataques de pánico recurrentes</li>
                  <li>Tristeza profunda &#62;2 semanas, no disfrutas nada</li>
                  <li>Insomnio severo, no duermes hace días</li>
                  <li>Pensamientos recurrentes de no valer, culpa excesiva</li>
                  <li>Aislamiento total, no quieres ver a nadie</li>
                  <li>Uso de alcohol/drogas para "aguantar"</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  LLAMA PARA ORIENTACIÓN (Dudas)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                  <li>No sabes si lo que sientes es "normal" o necesita ayuda</li>
                  <li>Quieres saber qué servicios hay cerca de ti</li>
                  <li>Necesitas info sobre trámites: cita psicólogo, trámites escolares</li>
                  <li>Quieres apoyar a un amigo/compañero y no sabes cómo</li>
                  <li>Dudas sobre confidencialidad, costos, trámites</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Mitos que te impiden llamar</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {mythCards}
          </div>
        </section>

        <section className="text-center py-8">
          <div className="bg-red-600 text-white rounded-xl p-8 space-y-4">
            <h2 className="text-2xl font-bold">No tienes que pasar solo por esto</h2>
            <p className="text-red-100 max-w-xl mx-auto">
              Hay personas dispuestas a escucharte ahora mismo. La llamada dura lo que necesites. 
              No hay problema demasiado pequeño ni demasiado grande.
            </p>
            <a 
              href="tel:8009112000"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-red-600 text-lg font-semibold rounded-lg hover:bg-red-50 transition-colors w-full sm:w-auto"
            >
              <Phone className="h-6 w-6" />
              <span>Llamar ahora: 800 911 2000</span>
            </a>
            <p className="text-red-200 text-sm mt-4">
              Gratis · Confidencial · 24/7 · Todo México
            </p>
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
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estrés Académico México - Recursos educativos</p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratis)
          </p>
        </div>
      </footer>
    </div>
  )
}