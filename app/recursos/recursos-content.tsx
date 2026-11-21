"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiBookOpenLine as BookOpen,
  RiListOrdered as ListOrdered,
  RiFileTextLine as FileText,
  RiStarLine as Star,
  RiBrainLine as Brain,
  RiTimerLine as Timer,
  RiShieldLine as Shield,
  RiMapPinLine as MapPin,
  RiPhoneLine as Phone,
  RiHeartLine as Heart,
  RiStarLine as StarIcon,
  RiFileListLine as FileList,
  RiEditLine as Edit,
  RiArrowRightLine as ArrowRight,
} from "@remixicon/react"

const categorias = [
  {
    titulo: 'Lecturas',
    descripcion: 'Lecturas guiadas para reforzar hábitos positivos y prevenir el estrés.',
    icono: BookOpen,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    items: [
      { titulo: '7 Hábitos de estudiantes altamente efectivos', descripcion: 'Lectura guiada 15 min con reflexiones interactivas', href: '/recursos/lecturas/7-habitos-estudiantes-efectivos', badge: 'Lectura' },
    ]
  },
  {
    titulo: 'Talleres',
    descripcion: 'Talleres guiados paso a paso para desarrollar habilidades prácticas.',
    icono: Timer,
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    items: [
      { titulo: 'Taller: Matriz de Eisenhower + Time Blocking', descripcion: 'Clasifica tareas y bloquea tiempo en 15 min', href: '/recursos/talleres/eisenhower-time-blocking', badge: 'Taller' },
    ]
  },
  {
    titulo: 'Guías prácticas',
    descripcion: 'Guías accionables paso a paso para situaciones específicas.',
    icono: Shield,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    items: [
      { titulo: 'Regla 1-3-5: Prioridades diarias', descripcion: 'Método simple: 1 grande, 3 medianas, 5 pequeñas', href: '/recursos/guias/regla-1-3-5-prioridades-diarias', badge: 'Guía' },
      { titulo: 'Primeros pasos para buscar ayuda profesional', descripcion: 'Guía accionable 6 pasos para acceder a ayuda hoy', href: '/recursos/guias-ayuda/primeros-pasos-ayuda-profesional', badge: 'Guía' },
      { titulo: 'Llamar 800 911 2000 - Línea de la Vida', descripcion: 'Apoyo emocional 24/7, gratis, confidencial', href: '/recursos/guias-ayuda/llamar-800-911-2000', badge: 'Urgente' },
      { titulo: 'Buscar psicólogo / orientador cercano', descripcion: 'Guía para encontrar ayuda profesional cerca de ti', href: '/recursos/guias-ayuda/buscar-psicologo-orientador', badge: 'Guía' },
    ]
  },
  {
    titulo: 'Plantillas',
    descripcion: 'Plantillas descargables e imprimibles para organización y planificación.',
    icono: FileText,
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
    items: [
      { titulo: 'Planificador semanal preventivo', descripcion: 'Planificador visual con bloques de tiempo e impresión', href: '/recursos/plantillas/planificador-semanal-preventivo', badge: 'Plantilla' },
      { titulo: 'Planificador semanal con bloques de tiempo', descripcion: 'Versión interactiva con bloques arrastrables', href: '/recursos/plantillas/planificador-semanal-con-bloques', badge: 'Plantilla' },
    ]
  },
  {
    titulo: 'Checklists',
    descripcion: 'Listas de verificación interactivas para seguimiento de hábitos.',
    icono: FileList,
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200',
    items: [
      { titulo: 'Revisión semanal de hábitos', descripcion: 'Checklist interactivo 20 items · 10 min', href: '/recursos/checklists/revision-semanal-habitos', badge: 'Checklist' },
    ]
  },
] as const

export default function RecursosContent() {
  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Inicio</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Biblioteca de recursos</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Biblioteca de <span className="text-primary">recursos</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Lecturas, talleres, guías, plantillas y checklists para el manejo del estrés académico. 
            Todos los recursos son gratuitos y accesibles para todos.
          </p>
        </header>

        <section className="space-y-12">
          {categorias.map((categoria, catIndex) => (
            <section key={categoria.titulo} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoria.color}`}>
                    <categoria.icono className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{categoria.titulo}</h2>
                    <p className="text-muted-foreground">{categoria.descripcion}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoria.items.map((item, itemIndex) => (
                  <Card key={item.titulo} className="h-full hover:shadow-md transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{item.titulo}</CardTitle>
                          <CardDescription>{item.descripcion}</CardDescription>
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.badge === 'Urgente' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                          item.badge === 'Guía' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          item.badge === 'Taller' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                          item.badge === 'Lectura' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          item.badge === 'Plantilla' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                          item.badge === 'Checklist' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <Link href={item.href}>
                        <Button variant="outline" className="w-full justify-start gap-2 group">
                          <span>Acceder</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </section>

        <section className="mt-16 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda ahora?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Si estás en crisis o necesitas hablar con alguien ahora mismo, la Línea de la Vida está disponible 24/7, gratis y confidencial.
              </p>
              <a href="tel:8009112000">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  <Phone className="h-6 w-6" />
                  Llamar 800 911 2000
                </Button>
              </a>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estrés Académico México - Biblioteca de recursos educativos</p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7, gratuita)
          </p>
        </div>
      </footer>
    </div>
  )
}