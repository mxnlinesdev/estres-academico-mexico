"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiUserReceivedLine as UserReceived,
  RiMapPinLine as MapPin,
  RiPhoneLine as Phone,
  RiShieldLine as Shield,
  RiInformationLine as Info,
  RiFileTextLine as FileText,
  RiStarLine as Star,
  RiHeartLine as Heart,
  RiStarLine as StarIcon,
  RiCheckLine as Check
} from "@remixicon/react"

const pasos = [
  {
    numero: 1,
    titulo: "Reconoce la señal",
    descripcion: "Has completado la evaluación y tu nivel es ALTO. Esto no es debilidad, es valentía pedir ayuda.",
    accion: "Di en voz alta: 'Necesito ayuda y la voy a buscar'. Escríbelo en un papel.",
    icono: Star,
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    urgente: false,
    telefono: ''
  },
  {
    numero: 2,
    titulo: "Contacto inmediato (AHORA)",
    descripcion: "Si sientes que puedes hacerte daño o estás en crisis aguda, llama YA.",
    accion: "Llama al 800 911 2000 (Línea de la Vida, 24/7, gratis, confidencial). Si hay riesgo inmediato: 911.",
    icono: Phone,
    color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    urgente: true,
    telefono: '800 911 2000'
  },
  {
    numero: 3,
    titulo: "Comparte con alguien de confianza (HOY)",
    descripcion: "No tienes que pasar solo por esto. Elige a una persona de tu círculo cercano.",
    accion: "Envía mensaje o llama a: familiar, amigo cercano, tutor, profesor de confianza. Di: 'Estoy pasando por un momento difícil y necesito apoyo'.",
    icono: Heart,
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200',
    urgente: false,
    telefono: ''
  },
  {
    numero: 4,
    titulo: "Acude a tu institución (ESTA SEMANA)",
    descripcion: "Tu escuela tiene recursos gratuitos. No necesitas ir solo.",
    accion: "Ve a: Psicología escolar / Bienestar estudiantil / Prefectura / Trabajo social. Pide cita: 'Necesito apoyo emocional, ¿cómo agendo cita?'",
    icono: UserReceived,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    urgente: false,
    telefono: ''
  },
  {
    numero: 5,
    titulo: "Busca profesional especializado (ESTA SEMANA)",
    descripcion: "Psicólogos, psiquiatras, terapeutas. Hay opciones públicas y privadas.",
    accion: 'Busca en: Directorio CONASAMA (gob.mx/conasama), Psicólogos cerca (Google Maps "psicólogo cerca de mí"), Seguro médico (IMSS/ISSSTE/seguro escolar), Clínicas universitarias.',
    icono: MapPin,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    urgente: false,
    telefono: ''
  },
  {
    numero: 6,
    titulo: "Prepara tu primera sesión",
    descripcion: "Llegar preparado reduce ansiedad y aprovecha mejor el tiempo.",
    accion: 'Escribe: 1) Qué sientes (ansiedad, tristeza, insomnio...), 2) Desde cuándo, 3) Qué te gustaría lograr, 4) Preguntas para el terapeuta. Lleva lista de medicamentos si tomas.',
    icono: '✍️',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    urgente: false,
    telefono: ''
  },
] as const

const recursosNacionales = [
  { nombre: 'Línea de la Vida (CONASAMA)', telefono: '800 911 2000', descripcion: 'Gratuita, confidencial, 24/7, todo México', urgente: true },
  { nombre: 'SAPTEL (CDMX)', telefono: '55 5259 8121', descripcion: '24/7, apoyo emocional y prevención suicidio', urgente: true },
  { nombre: 'LOCATEL (CDMX)', telefono: '55 5658 1111', descripcion: 'Orientación y canalización a servicios', urgente: false },
  { nombre: 'Cruz Roja Mexicana', telefono: '55 5757 0303 / 55 5757 0304', descripcion: 'Apoyo emocional y primeros auxilios psicológicos', urgente: true },
  { nombre: 'UNAM - Atención Psicológica', telefono: '55 5622 2288', descripcion: 'Servicio para comunidad UNAM y público general', urgente: false },
  { nombre: 'IPN - Orientación Psicológica', telefono: '55 5729 6000 ext 54321', descripcion: 'Servicio para comunidad politécnica', urgente: false },
] as const

const recursosPorEstado = [
  { estado: 'Ciudad de México', recursos: ['SAPTEL 55 5259 8121', 'LOCATEL 55 5658 1111', 'Instituto de la Juventud CDMX', 'Clínicas de Salud Mental SSA'] },
  { estado: 'Jalisco', recursos: ['SALME Jalisco 33 3030 5000', 'CRUZ ROJA Guadalajara 33 3615 5555', 'UdeG Psicología'] },
  { estado: 'Nuevo León', recursos: ['Cruz Roja Monterrey 81 8344 0011', 'UANL Psicología', 'Salud Mental NL'] },
  { estado: 'Puebla', recursos: ['BUAP Psicología 222 229 5500', 'Cruz Roja Puebla 222 232 5000', 'Salud Mental Puebla'] },
  { estado: 'Veracruz', recursos: ['UV Psicología 228 842 1700', 'Cruz Roja Veracruz 229 931 0000', 'Salud Mental Veracruz'] },
] as const

const renderIcon = (icon: React.ComponentType<any> | string, className: string) => {
  if (typeof icon === 'string') {
    return <span className={className}>{icon}</span>
  }
  const IconComponent = icon
  return <IconComponent className={className} />
}

export default function GuiaPrimerosPasosContent() {
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
            <h1 className="font-semibold text-foreground">Guía de ayuda</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl text-center">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.34 16.5c-.77 1.333.192 3 1.732 3z" /></svg>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.34 16.5c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">¿Estás en crisis AHORA?</h3>
              <p className="text-red-700 dark:text-red-300 mt-1">
                Llama YA: <strong className="text-lg">800 911 2000</strong> (Línea de la Vida, 24/7, gratis)
                <br />Si riesgo inmediato: <strong>911</strong>
              </p>
            </div>
          </div>

        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium rounded-full">
            <Shield className="h-4 w-4" />
            <span>Guía de acción inmediata</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Guía: Primeros pasos para buscar ayuda profesional hoy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Has dado el paso más importante: reconocer que necesitas ayuda. Esta guía te acompaña paso a paso para acceder a apoyo profesional hoy mismo.
          </p>
        </header>

        <div className="bg-muted/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Pasos completados</span>
            <span className="font-medium" id="progress-text">0/6</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div id="progress-bar" className="h-full bg-primary transition-all duration-300" style={{ width: '0%' }} />
          </div>
        </div>

        <section className="space-y-6">
          {pasos.map((paso, index) => (
            <section 
              key={paso.numero} 
              id={`paso-${paso.numero}`}
              className={`bg-card border border-border rounded-xl p-6 space-y-4 ${paso.urgente ? 'border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${paso.color} flex items-center justify-center`}>
                  {renderIcon(paso.icono, "h-6 w-6")}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{paso.numero}.</span>
                    <h3 className="text-xl font-bold text-foreground">{paso.titulo}</h3>
                    {paso.urgente && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                        URGENTE
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  {renderIcon(paso.icono, "h-4 w-4")}
                  <span>Acción concreta:</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{paso.accion}</p>
                
                {paso.telefono && (
                  <a 
                    href={`tel:${paso.telefono.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Llamar ahora: {paso.telefono}
                  </a>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id={`paso-${paso.numero}-check`}
                    className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-ring"
                    onChange={(e) => {
                      const checked = (e.target as HTMLInputElement).checked
                      const completed = document.querySelectorAll('input[id^="paso-"][type="checkbox"]:checked').length
                      document.getElementById('progress-text')!.textContent = `${completed}/6`
                      document.getElementById('progress-bar')!.style.width = `${(completed / 6) * 100}%`
                    }}
                  />
                  <label htmlFor={`paso-${paso.numero}-check`} className="text-sm font-medium text-foreground cursor-pointer">
                    Marcar como completado
                  </label>
                </div>
              </div>
            </section>
          ))}
        </section>

        <section className="mt-8">
          <Card className="border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                Líneas de crisis nacionales (24/7, gratuitas)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recursosNacionales.map((recurso, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold ${recurso.urgente ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
                        {recurso.nombre}
                      </span>
                      {recurso.urgente && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                          URGENTE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{recurso.descripcion}</span>
                      <a 
                        href={`tel:${recurso.telefono.replace(/\s/g, '')}`}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Llamar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Recursos por estado (ejemplos)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recursosPorEstado.map((estado, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {estado.estado}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {estado.recursos.map((r, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Qué esperar en tu primera sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 dark:text-green-400" /> Confidencialidad total (salvo riesgo vital)</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 dark:text-green-400" /> Te preguntarán: qué sientes, desde cuándo, cómo afecta tu vida</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 dark:text-green-400" /> No hay respuestas "correctas": sé honesto</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 dark:text-green-400" /> Puedes preguntar: método, duración, costo, frecuencia</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 dark:text-green-400" /> Si no hay química: puedes cambiar de terapeuta</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                ¿Lista de espera o no hay cupo?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">Mientras esperas cita, usa estos recursos inmediatos:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Línea de la Vida <strong>800 911 2000</strong> (24/7) - apoyo emocional inmediato</li>
                <li>App <strong>"Yo Puedo"</strong> (CONASAMA) - herramientas autoguiadas gratis</li>
                <li>Grupos de apoyo entre pares (preguntar en tu escuela)</li>
                <li>Ejercicio diario 30 min + sueño 7-9h + rutina básica</li>
                <li>Escribe diario: qué sientes, qué necesitas, qué pequeño paso dar hoy</li>
              </ul>
            </CardContent>
          </Card>
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
          <p>Estrés Académico México - Recursos educativos</p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratis)
          </p>
        </div>
      </footer>
    </div>
  )
}