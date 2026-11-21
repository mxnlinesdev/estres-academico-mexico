import { Metadata } from "next"
import { StressForm } from "@/components/StressForm"
import { CrisisBanner } from "@/components/CrisisBanner"
import { RiArrowLeftLine as ArrowLeft, RiBrainLine as Brain } from "@remixicon/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Evaluación de Estrés Académico - México",
  description: "Responde 6 preguntas validadas para conocer tu nivel de estrés académico (bajo/medio/alto) y recibir recomendaciones personalizadas.",
}

export default function EvaluacionPage() {
  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-semibold text-foreground">Evaluación de Estrés Académico</h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main>
        <StressForm />
      </main>

      <footer className="border-t bg-muted/30 py-6 px-4">
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
          <p className="text-destructive font-medium">
            ¿Necesitas ayuda? Línea de la Vida: <a href="tel:8009112000" className="underline">800 911 2000</a> (24/7)
          </p>
        </div>
      </footer>
    </div>
  )
}