"use client"

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
  RiStarLine as Star
} from "@remixicon/react"

const opcionesBusqueda = [
  {
    titulo: 'En tu escuela (GRATIS)',
    descripcion: 'Tu primera opción. Todas las instituciones públicas y muchas privadas tienen servicio.',
    items: [
      'Psicología / Bienestar estudiantil / Orientación vocacional',
      'Prefectura / Trabajo social / Tutorías',
      'Servicio médico escolar (a veces tienen psicólogo)',
      'Pregunta en: Secretaría académica, Control escolar, Vinculación',
    ],
    icono: UserReceived,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    gratis: true,
  },
  {
    titulo: 'Servicios públicos de salud (GRATIS / BAJO COSTO)',
    descripcion: 'Instituciones gubernamentales con servicio psicológico accesible.',
    items: [
      'CONASAMA - Directorio nacional: gob.mx/conasama/directorio',
      'Secretarías de Salud estatales - Clínicas de Salud Mental',
      'IMSS / ISSSTE - Si tienes derechohabiencia (módulo psicología)',
      'Centros de Salud (Centros de Salud Mental Comunitarios)',
      'Hospitales generales públicos (área de salud mental)',
    ],
    icono: Shield,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    gratis: true,
  },
  {
    titulo: 'Universidades públicas (BAJO COSTO / GRATIS)',
    descripcion: 'Muchas ofrecen servicio a comunidad y público general a bajo costo.',
    items: [
      'UNAM - Clínica de Psicología (Coyoacán) / FES Iztacala / FES Zaragoza',
      'IPN - Centro de Servicios Psicológicos (UPIICSA, Zacatenco)',
      'UAM - Clínicas de Psicología (Xochimilco, Azcapotzalco, Lerma)',
      'UAM - Unidad de Apoyo Psicológico (UAP)',
      'Universidades estatales: busca "clínica psicología + nombre universidad"',
    ],
    icono: '🎓',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    gratis: false,
  },
  {
    titulo: 'Privado (COSTO VARIABLE)',
    descripcion: 'Psicólogos independientes, clínicas privadas, plataformas online.',
    items: [
      'Psicólogos cerca: Google Maps "psicólogo cerca de mí" + filtros',
      'Directorios: Doctoralia, Doctoralia México, Psicología y Mente',
      'Plataformas online: Terapify, Yana, BetterHelp (costo USD)',
      'Clínicas privadas: buscar "clínica psicológica + tu ciudad"',
      'Colegio de Psicólogos de tu estado: directorio de colegiados',
    ],
    icono: MapPin,
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
    gratis: false,
  },
] as const

const criteriosEleccion = [
  { titulo: 'Especialidad', descripcion: 'Ansiedad, depresión, TDAH, trauma, pareja, adolescentes, etc.' },
  { titulo: 'Enfoque terapéutico', descripcion: 'Cognitivo-conductual (TCC), humanista, psicoanálisis, EMDR, ACT, etc.' },
  { titulo: 'Modalidad', descripcion: 'Presencial, online, híbrida. Verifica qué ofrece.' },
  { titulo: 'Costo y forma de pago', descripcion: 'Por sesión, paquetes, escala móvil (según ingresos), seguros.' },
  { titulo: 'Disponibilidad horaria', descripcion: 'Horarios que encajen con tus clases/trabajo.' },
  { titulo: 'Química / confianza', descripcion: 'La relación terapéutica es clave. Si no hay "click", cambia.' },
] as const

const preguntasPrimeraSesion = [
  '¿Cuál es su enfoque terapéutico y experiencia con mi problema?',
  '¿Cuál es el costo por sesión? ¿Tienen escala móvil o paquetes?',
  '¿Cuál es la duración y frecuencia típica del tratamiento?',
  '¿Cómo manejan emergencias entre sesiones?',
  '¿Cuál es su política de cancelación?',
  '¿Tienen experiencia con estudiantes / mi grupo de edad?',
  '¿Ofrecen modalidad online / presencial / híbrida?',
] as const

const renderIcon = (icon: React.ComponentType<any> | string, className: string) => {
  if (typeof icon === 'string') {
    return <span className={className}>{icon}</span>
  }
  const IconComponent = icon
  return <IconComponent className={className} />
}

const handleCopyQuestions = () => {
  navigator.clipboard.writeText(preguntasPrimeraSesion.join('\n')).then(() => {
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
    toast.textContent = 'Preguntas copiadas al portapapeles'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  })
}

export default function BuscarPsicologoContent() {
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
            <h1 className="font-semibold text-foreground">Buscar ayuda</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <MapPin className="h-4 w-4" />
            <span>Guía de búsqueda</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Buscar psicólogo / orientador escolar cercano
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Guía paso a paso para encontrar apoyo profesional cerca de ti. Opciones gratuitas, públicas y privadas.
          </p>
        </header>

        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl text-center">
          <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
            ¿Necesitas ayuda AHORA?
          </p>
          <a 
            href="tel:8009112000"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="h-6 w-6" />
            <span>Llamar 800 911 2000 (24/7, gratis)</span>
          </a>
        </div>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Dónde buscar (ordenado por accesibilidad)</h2>
          
          {opcionesBusqueda.map((opcion, i) => (
            <Card key={i} className={`border-2 ${opcion.gratis ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10' : 'border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10'}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${opcion.color}`}>
                    {renderIcon(opcion.icono, "h-5 w-5")}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {opcion.titulo}
                      {opcion.gratis && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          GRATIS
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>{opcion.descripcion}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {opcion.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Cómo elegir: 6 criterios clave</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {criteriosEleccion.map((criterio, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="text-base">{criterio.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{criterio.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Preguntas para la primera sesión (llevarlas escritas)</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lleva estas preguntas escritas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                {preguntasPrimeraSesion.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-medium text-primary">{i + 1}.</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={handleCopyQuestions}>
              <FileText className="h-4 w-4" />
              Copiar preguntas
            </Button>
          </div>
        </section>

        <section className="mb-8">
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Si no hay "química" con el terapeuta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                La relación terapéutica es el predictor #1 de éxito. Si no hay "click", no es culpa tuya ni del terapeuta.
              </p>
              <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-300">
                <li>Es normal probar 2-3 terapeutas antes de encontrar "click"</li>
                <li>Puedes decir: "No siento que encaje, ¿me puedes recomendar a alguien más?"</li>
                <li>El terapeuta profesional lo entenderá y te referirá</li>
                <li>No tienes que explicar por qué, basta con "no siento conexión"</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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