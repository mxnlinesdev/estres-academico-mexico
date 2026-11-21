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
  critico: { label: 'Crítico', variant: 'destructive' as const, icon: AlertCircle, color: 'text-destructive' },
  alerta: { label: 'Alerta', variant: 'warning' as const, icon: Info, color: 'text-yellow-600 dark:text-yellow-400' },
  normal: { label: 'Normal', variant: 'success' as const, icon: Check, color: 'text-green-600 dark:text-green-400' },
} as const

export function ResultCard({ response, onActionClick }: ResultCardProps) {
  const { prediction, top_factors, transformed_data, disclaimer } = response
  const levelConfig = STRESS_LEVEL_CONFIG[prediction.label]
  const isAlto = prediction.label === 'alto'

  // Obtener los 2 factores principales (top_factors ya vienen filtrados)
  const mainFactors = top_factors.filter(f => f.is_top_factor)

  // Array de probabilidades para evitar problemas de parsing en JSX
  const probabilityItems = [
    { key: 'bajo', label: 'Bajo', color: 'success' },
    { key: 'medio', label: 'Medio', color: 'warning' },
    { key: 'alto', label: 'Alto', color: 'destructive' },
  ] as const

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
            <span className="text-sm text-muted-foreground">
              Confianza: {(prediction.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <CardTitle className="text-2xl">{prediction.message}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Probabilidades */}
          <div>
            <h3 className="text-sm font-medium mb-3">Distribución de probabilidades</h3>
            <div className="space-y-3">
              {probabilityItems.map(({ key, label, color }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-medium">{(prediction.probabilities[key] * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={prediction.probabilities[key] * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Factores principales */}
          {mainFactors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Factores principales detectados</h3>
              <div className="space-y-3">
                {mainFactors.map((factor, index) => {
                  const config = STATUS_CONFIG[factor.status]
                  const Icon = config.icon
                  return (
                    <div 
                      key={factor.name} 
                      className="p-4 border rounded-lg bg-muted/30 flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 ${config.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{factor.factor_text}</span>
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Empuje: {factor.empuje.toFixed(2)} | 
                          Valor: {factor.raw_value} | 
                          Normalizado: {(factor.normalized_value * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Detalle completo de todos los factores (colapsable) */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-3 bg-muted/30 rounded-lg list-none">
              <span className="font-medium">Ver todos los factores ({transformed_data.length})</span>
              <span className="text-muted-foreground">▼</span>
            </summary>
            <div className="p-3 space-y-3">
              {transformed_data.map((factor) => {
                const config = STATUS_CONFIG[factor.status]
                const Icon = config.icon
                return (
                  <div key={factor.name} className="flex items-center gap-3 p-2 rounded bg-background border">
                    <Icon className={`h-4 w-4 flex-shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{factor.factor_text}</span>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Empuje: {factor.empuje.toFixed(2)} | Valor: {factor.raw_value} | Norm: {(factor.normalized_value * 100).toFixed(0)}%
                      </div>
                    </div>
                    <Progress value={factor.normalized_value * 100} className="w-32 h-1.5" />
                  </div>
                )
              })}
            </div>
          </details>

          {/* Disclaimer */}
          <Alert variant="info">
            <AlertDescription className="text-sm">{disclaimer}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Acciones / Rutas */}
      <Card>
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