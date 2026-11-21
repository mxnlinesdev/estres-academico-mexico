import { PredictRequest, PredictResponse } from '@/types/contrato';

const API_URL = process.env.MODEL_API_URL || 'http://127.0.0.1:8000/predict';

/**
 * Llama a la API de predicción del modelo de estrés
 */
export async function clasificarEstres(request: PredictRequest): Promise<PredictResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(request),
    // Timeout de 30 segundos
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Error desconocido');
    throw new Error(`Error en la API del modelo: ${response.status} - ${errorText}`);
  }

  const data = await response.json() as PredictResponse;
  return data;
}

/**
 * Verifica si la API del modelo está disponible
 */
export async function checkModelHealth(): Promise<boolean> {
  try {
    const response = await fetch(API_URL.replace('/predict', '/health'), {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}