import { NextRequest, NextResponse } from "next/server"
import { PredictRequest, PredictResponse } from "@/types/contrato"

const MODEL_API_URL = process.env.MODEL_API_URL || "http://127.0.0.1:8000/predict"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as PredictRequest

    // Validación básica del request
    if (!body.features || typeof body.student_id !== 'string') {
      return NextResponse.json(
        { error: "Formato de request inválido. Se requiere student_id y features." },
        { status: 400 }
      )
    }

    // Validar que todas las features requeridas estén presentes
    const requiredFeatures = [
      'sleep_hours_per_day',
      'study_hours_per_week',
      'social_support_score',
      'academic_pressure_score',
      'extracurricular_participation',
      'gpa_score_avg',
    ] as const

    for (const feature of requiredFeatures) {
      if (typeof body.features[feature] !== 'number') {
        return NextResponse.json(
          { error: `Feature requerida faltante o inválida: ${feature}` },
          { status: 400 }
        )
      }
    }

    // Llamar a la API del modelo
    const response = await fetch(MODEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
      // Timeout de 30 segundos
      signal: AbortSignal.timeout(30000),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Error desconocido en la API del modelo")
      console.error(`Model API error: ${response.status}`, errorText)
      return NextResponse.json(
        { error: `Error en el modelo de predicción: ${response.status}` },
        { status: 502 }
      )
    }

    const data = await response.json() as PredictResponse

    // Validar respuesta básica
    if (!data.prediction || !data.prediction.label || !data.top_factors) {
      return NextResponse.json(
        { error: "Respuesta inválida del modelo" },
        { status: 502 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Timeout: el modelo tardó demasiado en responder" },
        { status: 504 }
      )
    }

    console.error("Error en /api/clasificar:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  try {
    const healthUrl = MODEL_API_URL.replace("/predict", "/health")
    const response = await fetch(healthUrl, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    })
    
    return NextResponse.json({
      status: response.ok ? "healthy" : "unhealthy",
      model_api: MODEL_API_URL,
      model_api_reachable: response.ok,
    })
  } catch {
    return NextResponse.json({
      status: "unhealthy",
      model_api: MODEL_API_URL,
      model_api_reachable: false,
    }, { status: 503 })
  }
}