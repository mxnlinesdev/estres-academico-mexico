import { Alert, AlertDescription } from "@/components/ui/alert"
import { RiInformationLine as Info } from "@remixicon/react"
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
      <AlertDescription className="flex items-start gap-2 text-sm">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
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

export function ModelDisclaimer({ className }: { className?: string }) {
  return (
    <Alert variant="info" className={cn("border-primary/30 bg-primary/5", className)}>
      <AlertDescription className="flex items-start gap-2 text-sm">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-medium text-primary">
            <strong>Limitaciones del modelo:</strong>
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
            <li>Entrenado con datos de India (Kaggle rishavraj1232/student-early-stress-detection v2)</li>
            <li>Solo 1,100 registros del source_dataset == 'stress_survey'</li>
            <li>Accuracy: 86.06%, F1 macro: 86.03%, Recall alto: 90.91%</li>
            <li>No sustituye evaluación profesional</li>
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  )
}