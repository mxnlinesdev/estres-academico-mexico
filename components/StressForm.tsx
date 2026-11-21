"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RiCheckLine as Check } from "@remixicon/react"
import { evaluacionSchema, type EvaluacionFormData } from "@/lib/schema"
import { formToPredictRequest, generateStudentId } from "@/lib/conversions"
import { clasificarEstres } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { CONTRATO_RANGOS, APOYO_SOCIAL_MAP } from "@/types/contrato"

const APOYO_SOCIAL_OPTIONS = [
  { value: 'nada', label: 'Nada', description: 'Sin apoyo' },
  { value: 'poco', label: 'Poco', description: 'Apoyo limitado' },
  { value: 'bastante', label: 'Bastante', description: 'Buen apoyo' },
  { value: 'mucho', label: 'Mucho', description: 'Apoyo total' },
] as const

const EXTRACURRICULAR_OPTIONS = [
  { value: 'si', label: 'Sí', description: 'Participas en actividades extracurriculares' },
  { value: 'no', label: 'No', description: 'No participas en actividades extracurriculares' },
] as const

const QUESTIONS = [
  {
    id: 'horas_sueno',
    label: '¿Cuántas horas duermes al día, en promedio?',
    description: '',
    min: CONTRATO_RANGOS.horas_sueno.min,
    max: CONTRATO_RANGOS.horas_sueno.max,
    step: 0.5,
  },
  {
    id: 'horas_estudio_semana',
    label: '¿Cuántas horas estudias a la semana fuera de clase?',
    description: '',
    min: CONTRATO_RANGOS.horas_estudio_semana.min,
    max: CONTRATO_RANGOS.horas_estudio_semana.max,
    step: 1,
  },
  {
    id: 'apoyo_social',
    label: '¿Cuánto apoyo sientes de tu familia y amigos?',
    description: '',
  },
  {
    id: 'presion_academica',
    label: 'Del 0 al 10, ¿qué tan constante te sientes en tu ritmo académico?',
    description: '',
    min: CONTRATO_RANGOS.presion_academica.min,
    max: CONTRATO_RANGOS.presion_academica.max,
    step: 1,
  },
  {
    id: 'extracurriculares',
    label: '¿Participas en actividades extracurriculares?',
    description: '',
  },
  {
    id: 'promedio_0a10',
    label: '¿Cuál es tu promedio aproximado (0 a 10)?',
    description: '',
    min: CONTRATO_RANGOS.promedio_0a10.min,
    max: CONTRATO_RANGOS.promedio_0a10.max,
    step: 0.1,
  },
] as const

export function StressForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EvaluacionFormData>({
    resolver: zodResolver(evaluacionSchema),
    defaultValues: {
      horas_sueno: 7,
      horas_estudio_semana: 10,
      apoyo_social: 'bastante',
      presion_academica: 5,
      extracurriculares: 'no',
      promedio_0a10: 7,
    },
  })

  const watchedValues = watch()

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: EvaluacionFormData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const studentId = generateStudentId()
      const request = formToPredictRequest(data, studentId)
      const response = await clasificarEstres(request)

      // Redirigir a la página de resultado correspondiente
      const level = response.prediction.label
      const params = new URLSearchParams({
        prediction: JSON.stringify(response),
      })
      router.push(`/resultado/${level}?${params.toString()}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al conectar con el modelo'
      setApiError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Evaluación de Estrés Académico</h1>
          <p className="text-muted-foreground">
            Responde 6 preguntas para conocer tu nivel de estrés y recibir recomendaciones personalizadas.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Pregunta {currentStep + 1} de {QUESTIONS.length}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">{currentQuestion.label}</CardTitle>
              <CardDescription>{currentQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {apiError && (
                <Alert variant="destructive">
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}

              {/* Pregunta 1: Horas de sueño - Slider */}
              {currentQuestion.id === 'horas_sueno' && (
                <div className="space-y-4">
                  <Slider
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={watchedValues.horas_sueno}
                    onValueChange={(v) => setValue('horas_sueno', v)}
                    aria-label="Horas de sueño"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentQuestion.min}h</span>
                    <span className="font-semibold text-foreground">{Number(watchedValues.horas_sueno ?? currentQuestion.min)}h</span>
                    <span>{currentQuestion.max}h</span>
                  </div>
                  {errors.horas_sueno && (
                    <p className="text-sm text-destructive error-message" role="alert" aria-live="polite">{errors.horas_sueno.message}</p>
                  )}
                </div>
              )}

              {/* Pregunta 2: Horas de estudio - Slider */}
              {currentQuestion.id === 'horas_estudio_semana' && (
                <div className="space-y-4">
                  <Slider
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={watchedValues.horas_estudio_semana}
                    onValueChange={(v) => setValue('horas_estudio_semana', v)}
                    aria-label="Horas de estudio por semana"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentQuestion.min}h</span>
                    <span className="font-semibold text-foreground">{Number(watchedValues.horas_estudio_semana ?? currentQuestion.min)}h</span>
                    <span>{currentQuestion.max}h</span>
                  </div>
                  {errors.horas_estudio_semana && (
                    <p className="text-sm text-destructive error-message" role="alert" aria-live="polite">{errors.horas_estudio_semana.message}</p>
                  )}
                </div>
              )}

              {/* Pregunta 3: Apoyo social - RadioGroup */}
              {currentQuestion.id === 'apoyo_social' && (
                <div className="space-y-3">
                  <RadioGroup
                    onValueChange={(v) => setValue('apoyo_social', v as EvaluacionFormData['apoyo_social'])}
                    value={watchedValues.apoyo_social}
                  >
                    {APOYO_SOCIAL_OPTIONS.map((option) => (
                      <RadioGroupItem key={option.value} value={option.value}>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                  {errors.apoyo_social && (
                    <p className="text-sm text-destructive error-message" role="alert" aria-live="polite">{errors.apoyo_social.message}</p>
                  )}
                </div>
              )}

              {/* Pregunta 4: Presión académica - Slider */}
              {currentQuestion.id === 'presion_academica' && (
                <div className="space-y-4">
                  <Slider
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={watchedValues.presion_academica}
                    onValueChange={(v) => setValue('presion_academica', v)}
                    aria-label="Presión académica"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentQuestion.min}</span>
                    <span className="font-semibold text-foreground">{Number(watchedValues.presion_academica ?? currentQuestion.min)}</span>
                    <span>{currentQuestion.max}</span>
                  </div>
                  {errors.presion_academica && (
                    <p className="text-sm text-destructive error-message" role="alert" aria-live="polite">{errors.presion_academica.message}</p>
                  )}
                </div>
              )}

              {/* Pregunta 5: Extracurriculares - RadioGroup */}
              {currentQuestion.id === 'extracurriculares' && (
                <div className="space-y-3">
                  <RadioGroup
                    onValueChange={(v) => setValue('extracurriculares', v as EvaluacionFormData['extracurriculares'])}
                    value={watchedValues.extracurriculares}
                  >
                    {EXTRACURRICULAR_OPTIONS.map((option) => (
                      <RadioGroupItem key={option.value} value={option.value}>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                  {errors.extracurriculares && (
                    <p className="text-sm text-destructive error-message" role="alert" aria-live="polite">{errors.extracurriculares.message}</p>
                  )}
                </div>
              )}

              {/* Pregunta 6: Promedio - Slider */}
              {currentQuestion.id === 'promedio_0a10' && (
                <div className="space-y-4">
                  <Slider
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={watchedValues.promedio_0a10}
                    onValueChange={(v) => setValue('promedio_0a10', v)}
                    aria-label="Promedio 0-10"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentQuestion.min}</span>
                    <span className="font-semibold text-foreground">
                      {(Number(watchedValues.promedio_0a10 ?? currentQuestion.min)).toFixed(1)}
                    </span>
                    <span>{currentQuestion.max}</span>
                  </div>
                  {errors.promedio_0a10 && (
                    <p className="text-sm text-destructive error-message" role="alert" aria-live="polite">{errors.promedio_0a10.message}</p>
                  )}
                </div>
              )}

              {/* Navegación */}
              <Separator className="my-4" />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Anterior
                </Button>
                <div className="flex gap-2">
                  {currentStep < QUESTIONS.length - 1 ? (
                    <Button type="button" onClick={handleNext} disabled={!!errors[currentQuestion.id as keyof EvaluacionFormData]}>
                      Siguiente
                    </Button>
                  ) : (
                    <Button type="button" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                      {isSubmitting ? 'Evaluando...' : 'Obtener resultado'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}