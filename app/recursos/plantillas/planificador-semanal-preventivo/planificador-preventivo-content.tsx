"use client"

import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrisisBanner } from "@/components/CrisisBanner"
import { 
  RiArrowLeftLine as ArrowLeft, 
  RiFileTextLine as FileText,
  RiDownloadLine as Download,
  RiPrinterLine as Printer,
  RiCalendarLine as Calendar,
  RiTimeLine as Time,
  RiHeartLine as Heart,
  RiBrainLine as Brain,
  RiStarLine as Star
} from "@remixicon/react"

export const metadata: Metadata = {
  title: "Plantilla: Planificador semanal preventivo",
  description: "Planificador visual semanal con bloques de tiempo para organizar estudio, descanso y autocuidado.",
}

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const horas = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

const coloresCategoria = {
  estudio: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
  clase: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800',
  ejercicio: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
  comida: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800',
  descanso: 'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  sueno: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
  personal: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 border-pink-200 dark:border-pink-800',
  libre: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
}

const categorias = [
  { key: 'sueño', label: 'Sueño', icon: '🌙', color: 'sueño' },
  { key: 'clase', label: 'Clases', icon: '🏫', color: 'clase' },
  { key: 'estudio', label: 'Estudio profundo', icon: '📖', color: 'estudio' },
  { key: 'ejercicio', label: 'Ejercicio', icon: '🏃', color: 'ejercicio' },
  { key: 'comida', label: 'Comidas', icon: '🍽️', color: 'comida' },
  { key: 'descanso', label: 'Pausas/Descanso', icon: '☕', color: 'descanso' },
  { key: 'personal', label: 'Personal/Social', icon: '💬', color: 'personal' },
  { key: 'libre', label: 'Tiempo libre', icon: '🎮', color: 'libre' },
] as const

export default function PlanificadorPreventivoContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" role="status" aria-live="polite" id="toast-container"></div>
      <CrisisBanner />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/recursos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Recursos</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Planificador semanal</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <Calendar className="h-4 w-4" />
            <span>Plantilla · Descargable e imprimible</span>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Planificador semanal preventivo</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
            Planificador visual semanal con bloques de tiempo para organizar clases, estudio profundo, ejercicio, comidas, sueño y tiempo personal. 
            Diseñado para prevenir el estrés académico mediante planificación intencional.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => {
              const content = document.getElementById('planner-content')?.innerHTML
              const blob = new Blob([`
<!DOCTYPE html>
<html>
<head>
  <title>Planificador Semanal</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 20px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    th { background: #f3f4f6; }
    .block { padding: 4px 8px; border-radius: 4px; font-size: 11px; margin: 2px 0; display: inline-block; width: 100%; text-align: center; }
  </style>
</head>
<body>
  <h1 style="text-align:center">Planificador Semanal</h1>
  ${content}
</body>
</html>
              `], { type: 'text/html' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'planificador-semanal.html'
              a.click()
              URL.revokeObjectURL(url)
            }}>
              <Download className="h-4 w-4" />
              Exportar HTML
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => {
              navigator.clipboard.writeText(`
Planificador Semanal Preventivo
================================

Generado desde: Estrés Académico México
Fecha: ${new Date().toLocaleDateString('es-MX')}

Instrucciones:
1. Completa cada celda con tus actividades
2. Usa colores/códigos: 📖 Estudio | 🏫 Clases | 🏃 Ejercicio | 🍽️ Comidas | 🌙 Sueño | ☕ Pausas | 💬 Personal | 🎮 Libre
3. Imprime y tenlo visible

${dias.map(dia => `${dia.toUpperCase()}: ${Array(24).fill('[ ]').join(' | ')}`).join('\n')}

---
Generado desde estres-academico.mx/recursos
              `).then(() => {
                const toast = document.createElement('div')
                toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
                toast.textContent = 'Copiado al portapapeles'
                document.body.appendChild(toast)
                setTimeout(() => toast.remove(), 3000)
              })
            }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /></svg>
              Copiar texto
            </Button>
          </div>
        </header>

        <div id="planner-content" className="space-y-8">
          {dias.map((dia, diaIndex) => (
            <section key={dia} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-foreground capitalize">{dia}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" role="grid">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="w-20 px-2 py-2 text-left text-xs font-medium text-muted-foreground">Hora</th>
                      {Array(4).fill(0).map((_, i) => (
                        <th key={i} className="px-2 py-2 text-center text-xs font-medium text-muted-foreground">
                          Bloque {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {horas.map((hora, horaIndex) => (
                      <tr key={hora} className={horaIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                        <td className="w-20 px-2 py-1.5 text-left text-xs font-medium text-muted-foreground border-r border-border">
                          {hora}
                        </td>
                        {Array(4).fill(0).map((_, blockIndex) => (
                          <td key={blockIndex} className="px-1 py-1.5 border-r border-border last:border-r-0">
                            <div className="min-h-[48px] p-1 space-y-1">
                              {/* Placeholder para bloques arrastrables */}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Leyenda y descarga */}
        <section className="mt-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Leyenda de colores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(coloresCategoria).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <div className={`w-3 h-3 rounded ${value} border`} />
                    <span className="text-sm capitalize">{key}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Consejos para planificación efectiva
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">1.</span>Planifica el domingo por la noche (15 min)</li>
                <li className="flex items-start gap-2"><span className="text-primary">2.</span>Bloquea primero: sueño (7-9h), clases fijas, comidas</li>
                <li className="flex items-start gap-2"><span className="text-primary">3.</span>Agrega 2-3 bloques de estudio profundo (90 min c/u)</li>
                <li className="flex items-start gap-2"><span className="text-primary">4.</span>Incluye ejercicio (30 min), pausas cada 90 min, tiempo social</li>
                <li className="flex items-start gap-2"><span className="text-primary">4.</span>Deja 20% del tiempo libre para imprevistos</li>
                <li className="flex items-start gap-2"><span className="text-primary">5.</span>Revisa cada noche: ¿qué logré? ¿qué ajustar mañana?</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Navegación */}
        <nav className="flex items-center justify-between pt-4 border-t">
          <Link href="/recursos" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver a recursos
          </Link>
        </nav>
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>Estrés Académico México - Recursos educativos</p>
          <p className="text-destructive font-medium">
            ¿Crisis? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7)
          </p>
        </div>
      </footer>
    </div>
  )
}