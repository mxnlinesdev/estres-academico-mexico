"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { PredictResponse, FactorDetail, StressLevel, STRESS_LEVEL_CONFIG } from "@/types/contrato"
import { RiCheckLine as Check, RiAlertLine as AlertCircle, RiInformationLine as Info } from "@remixicon/react"

interface ResultCardProps {
  response: PredictResponse
  onActionClick?: (action: string) => void
}

const STATUS_CONFIG = {
  critico: { 
    label: 'Crítico', 
    variant: 'destructive' as const, 
    icon: AlertCircle, 
    color: 'text-destructive',
    guidance: 'Requiere atención inmediata. Prioriza reducir este factor hoy mismo.',
  },
  alerta: { 
    label: 'Alerta', 
    variant: 'warning' as const, 
    icon: Info, 
    color: 'text-yellow-600 dark:text-yellow-400',
    guidance: 'Monitorea y planifica mejoras graduales en los próximos días.',
  },
  normal: { 
    label: 'Normal', 
    variant: 'success' as const, 
    icon: Check, 
    color: 'text-green-600 dark:text-green-400',
    guidance: 'Mantén este hábito. Funciona como factor protector.',
  },
} as const

// Nombres amigables para cada factor (headings con capitalización correcta)
const FACTOR_LABELS: Record<string, string> = {
  sleep_hours_per_day: 'Horas de sueño',
  study_hours_per_week: 'Horas de estudio',
  social_support_score: 'Apoyo social',
  academic_pressure_score: 'Constancia académica',
  extracurricular_participation: 'Actividades extracurriculares',
  gpa_score_avg: 'Promedio académico',
}

// Genera texto descriptivo y accionable basado en el factor real (no placeholder)
function getFactorDescription(factor: FactorDetail): string {
  const { name, raw_value, empuje, status } = factor
  const pushDirection = empuje > 0 ? 'incrementa' : 'reduce'

  switch (name) {
    case 'sleep_hours_per_day':
      return `Dormir ${raw_value}h/día ${pushDirection} tu riesgo. ${status === 'critico' ? 'Prioriza dormir 7-8h.' : status === 'alerta' ? 'Intenta aumentar tu sueño gradualmente.' : 'Mantén tu horario de sueño actual.'}`

    case 'study_hours_per_week':
      return `Estudiar ${raw_value}h/semana ${pushDirection} tu estrés. ${status === 'critico' ? 'Considera reducir carga o mejorar eficiencia.' : status === 'alerta' ? 'Planifica bloques de estudio con descansos.' : 'Tu ritmo de estudio es adecuado.'}`

    case 'social_support_score':
      const supportLabels = { 0: 'nulo', 3.3: 'bajo', 6.7: 'moderado', 10: 'alto' }
      const label = supportLabels[raw_value as keyof typeof supportLabels] || `${raw_value}/10`
      return `Apoyo social ${label} ${pushDirection} tu riesgo. ${status === 'critico' ? 'Busca fortalecer tu red de apoyo activamente.' : status === 'alerta' ? 'Comparte tus preocupaciones con alguien de confianza.' : 'Tu red de apoyo es un factor protector.'}`

    case 'academic_pressure_score':
      return `Constancia académica ${raw_value}/10 ${pushDirection} tu riesgo. ${status === 'critico' ? 'Tu ritmo es inconstante, busca establecer rutinas.' : status === 'alerta' ? 'Tu constancia fluctúa, intenta mayor regularidad.' : 'Mantienes un ritmo académico constante.'}`

    case 'extracurricular_participation':
      return raw_value === 1 
        ? `Participas en actividades extracurriculares. ${status === 'critico' ? 'Considera reducir carga temporalmente.' : status === 'alerta' ? 'Asegura tiempo de recuperación.' : 'El balance es adecuado.'}`
        : `No haces actividades extracurriculares. ${status === 'critico' ? 'Considera añadir actividad recreativa.' : status === 'alerta' ? 'Podría ayudarte a desconectar.' : 'No es un factor de riesgo actual.'}`

    case 'gpa_score_avg':
      const promedio = (raw_value / 10).toFixed(1)
      return `Promedio ${promedio}/10 ${pushDirection} tu riesgo. ${status === 'critico' ? 'Enfócate en estrategias de estudio efectivas.' : status === 'alerta' ? 'Identifica materias prioritarias.' : 'Tu rendimiento académico es estable.'}`

    default:
      return `${factor.factor_text} ${pushDirection} tu riesgo.`
  }
}

export function ResultCard({ response, onActionClick }: ResultCardProps) {
  const { prediction, top_factors, transformed_data, disclaimer } = response
  const levelConfig = STRESS_LEVEL_CONFIG[prediction.label]
  const isAlto = prediction.label === 'alto'

  // Obtener los 2 factores principales (top_factors ya vienen filtrados)
  const mainFactors = top_factors.filter(f => f.is_top_factor)

  return (
    <div className="space-y-6">
      {/* Tarjeta principal de resultado */}
      <Card className={isAlto ? 'border-destructive/30 bg-destructive/5' : ''}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge 
              variant={prediction.label === 'bajo' ? 'success' : prediction.label === 'medio' ? 'warning' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {prediction.label.toUpperCase()}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{prediction.message}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Factores principales */}
          {mainFactors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Factores principales detectados</h3>
              <div className="space-y-3">
                {mainFactors.map((factor, index) => {
                  const config = STATUS_CONFIG[factor.status]
                  const Icon = config.icon
                  const factorLabel = FACTOR_LABELS[factor.name] || factor.name
                  return (
                    <div 
                      key={factor.name} 
                      className="px-6 py-4 border bg-muted/30 flex items-center gap-4"
                    >
                      <div className={`flex-shrink-0 ${config.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-base">{factorLabel}</span>
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getFactorDescription(factor)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Detalle completo de todos los factores (colapsable) */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-3 bg-muted/30 list-none">
              <span className="font-medium">Ver todos los factores ({transformed_data.length})</span>
              <span className="text-muted-foreground">▼</span>
            </summary>
            <div className="p-3 space-y-3">
              {transformed_data.map((factor) => {
                const config = STATUS_CONFIG[factor.status]
                const Icon = config.icon
                const factorLabel = FACTOR_LABELS[factor.name] || factor.name
                return (
                  <div key={factor.name} className="flex items-center gap-3 px-4 py-2 border bg-background border-border">
                    <div className="flex-shrink-0 flex items-center">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{factorLabel}</span>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {getFactorDescription(factor)}
                      </p>
                    </div>
                    <Progress value={factor.normalized_value * 100} className="w-32 h-1.5" />
                  </div>
                )
              })}
            </div>
          </details>
        </CardContent>
      </Card>

      {/* Acciones / Rutas */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-xl">Próximos pasos recomendados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {levelConfig.rutas.map((ruta, index) => (
              <Button
                key={ruta}
                variant={index === 0 && isAlto ? 'destructive' : 'default'}
                size="lg"
                className="w-full justify-start gap-3"
                onClick={() => onActionClick?.(ruta)}
              >
                {isAlto && index === 0 && <AlertCircle className="h-5 w-5" />}
                {!isAlto && index === 0 && <Check className="h-5 w-5 text-green-600" />}
                <span>{ruta}</span>
              </Button>
            ))}
          </div>
          {isAlto && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>¿Necesitas ayuda inmediata?</AlertTitle>
              <AlertDescription className="mt-2">
                <strong>Línea de la Vida: 800 911 2000</strong> (gratuita, 24/7)
                <br />
                También puedes contactar a los servicios de emergencia (911) o acudir al área de orientación de tu escuela.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}