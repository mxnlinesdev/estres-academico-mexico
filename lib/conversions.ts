import { FormData, PredictRequest, APOYO_SOCIAL_MAP } from '@/types/contrato';

/**
 * Convierte los datos del formulario al formato que espera la API del modelo
 * Aplica las conversiones exactas definidas en contrato.json
 */
export function formToPredictRequest(form: FormData, studentId: string = 'web_user'): PredictRequest {
  return {
    student_id: studentId,
    features: {
      // sleep_hours_per_day: valor tal cual; recortar al rango [4, 8]
      sleep_hours_per_day: clamp(form.horas_sueno, 4, 8),

      // study_hours_per_week: valor tal cual; recortar al rango [4, 20]
      study_hours_per_week: clamp(form.horas_estudio_semana, 4, 20),

      // social_support_score: opciones: nada=0, poco=3.3, bastante=6.7, mucho=10
      social_support_score: APOYO_SOCIAL_MAP[form.apoyo_social],

      // academic_pressure_score: valor tal cual (entero 0–10)
      academic_pressure_score: Math.round(clamp(form.presion_academica, 0, 10)),

      // extracurricular_participation: sí=1, no=0
      extracurricular_participation: form.extracurriculares === 'si' ? 1 : 0,

      // gpa_score_avg: promedio en escala 0–10 multiplicado por 10
      gpa_score_avg: form.promedio_0a10 * 10,
    },
  };
}

/**
 * Clampa un valor entre min y max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Genera un ID único para el estudiante (basado en timestamp + random)
 */
export function generateStudentId(): string {
  return `web_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}