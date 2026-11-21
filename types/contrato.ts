/**
 * Tipos derivados del contrato.json y la API de predicción
 */

// --- Formulario (entradas del usuario) ---
export interface FormData {
  horas_sueno: number;
  horas_estudio_semana: number;
  apoyo_social: 'nada' | 'poco' | 'bastante' | 'mucho';
  presion_academica: number;
  extracurriculares: 'si' | 'no';
  promedio_0a10: number;
}

// --- Request a la API ---
export interface PredictRequest {
  student_id: string;
  features: {
    sleep_hours_per_day: number;
    study_hours_per_week: number;
    social_support_score: number;
    academic_pressure_score: number;
    extracurricular_participation: number;
    gpa_score_avg: number;
  };
}

// --- Response de la API ---
export interface PredictResponse {
  student_id: string;
  source: string;
  model_used: string;
  prediction: {
    label: 'bajo' | 'medio' | 'alto';
    level: 0 | 1 | 2;
    message: string;
    confidence: number;
    probabilities: {
      bajo: number;
      medio: number;
      alto: number;
    };
  };
  top_factors: FactorDetail[];
  transformed_data: FactorDetail[];
  summary_vector: number[];
  disclaimer: string;
}

export interface FactorDetail {
  name: string;
  form_field: string;
  raw_value: number;
  processed_value: number;
  normalized_value: number;
  empuje: number;
  is_top_factor: boolean;
  factor_text: string;
  status: 'critico' | 'alerta' | 'normal';
}

// --- Niveles de estrés ---
export type StressLevel = 'bajo' | 'medio' | 'alto';

export interface StressLevelConfig {
  id: number;
  etiqueta: StressLevel;
  mensaje: string;
  rutas: string[];
}

// Configuración de rutas por nivel (placeholders)
export const STRESS_LEVEL_CONFIG: Record<StressLevel, StressLevelConfig> = {
  bajo: {
    id: 0,
    etiqueta: 'bajo',
    mensaje: 'Tus respuestas indican un nivel de estrés bajo. Sigue cuidando tus hábitos.',
    rutas: [
      'Sigue así',
      'Conoce más',
      'Técnicas de estudio',
    ],
  },
  medio: {
    id: 1,
    etiqueta: 'medio',
    mensaje: 'Tus respuestas indican un nivel de estrés medio. Revisa los factores señalados.',
    rutas: [
      'Técnicas de estudio',
      'Manejo de ansiedad',
      'Disciplina para estudiar',
    ],
  },
  alto: {
    id: 2,
    etiqueta: 'alto',
    mensaje: 'Tus respuestas indican un nivel de estrés alto. Te recomendamos acercarte al área de orientación de tu escuela.',
    rutas: [
      'Consulta a un experto',
    ],
  },
};

// --- Constantes del contrato para validación ---
export const CONTRATO_RANGOS = {
  horas_sueno: { min: 4, max: 8 },
  horas_estudio_semana: { min: 4, max: 20 },
  apoyo_social: { opciones: ['nada', 'poco', 'bastante', 'mucho'] as const },
  presion_academica: { min: 0, max: 10 },
  extracurriculares: { opciones: ['si', 'no'] as const },
  promedio_0a10: { min: 0, max: 10 },
} as const;

// Mapeo de apoyo social a valor numérico (según contrato)
export const APOYO_SOCIAL_MAP: Record<FormData['apoyo_social'], number> = {
  nada: 0,
  poco: 3.3,
  bastante: 6.7,
  mucho: 10,
};

// Orden de features para la API (según contrato.orden_entradas)
export const FEATURE_ORDER = [
  'sleep_hours_per_day',
  'study_hours_per_week',
  'social_support_score',
  'academic_pressure_score',
  'extracurricular_participation',
  'gpa_score_avg',
] as const;