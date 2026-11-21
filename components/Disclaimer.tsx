import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export function Disclaimer({ 
  className, 
  variant = 'info',
  showModelWarning = true 
}: { 
  className?: string
  variant?: 'info' | 'warning' | 'destructive'
  showModelWarning?: boolean
}) {
  return (
    <Alert variant={variant} className={className}>
      <AlertDescription className="text-sm">
        <div className="flex-1">
          <p className="font-medium">
            <strong>Herramienta de apoyo.</strong> No es un diagnóstico clínico.
          </p>
          {showModelWarning && (
            <p className="mt-1">
              El modelo fue entrenado con datos de estudiantes de la India 
              (<em>Student Early Stress Detection Dataset</em>) y puede no reflejar 
              completamente la realidad demográfica mexicana. Los resultados son orientativos.
            </p>
          )}
          <p className="mt-2">
            Si presentas síntomas de estrés severo, ansiedad o depresión, 
            busca apoyo profesional. En México: 
            <strong>Línea de la Vida 800 911 2000</strong> (gratuita, 24/7).
          </p>
        </div>
      </AlertDescription>
    </Alert>
  )
}