import { z } from 'zod';
import { CONTRATO_RANGOS } from '@/types/contrato';

/**
 * Esquema Zod para validación del formulario de evaluación
 * Rangos exactos según contrato.json
 */
export const evaluacionSchema = z.object({
  horas_sueno: z.number()
    .min(CONTRATO_RANGOS.horas_sueno.min, `Mínimo ${CONTRATO_RANGOS.horas_sueno.min} horas`)
    .max(CONTRATO_RANGOS.horas_sueno.max, `Máximo ${CONTRATO_RANGOS.horas_sueno.max} horas`),
  horas_estudio_semana: z.number()
    .min(CONTRATO_RANGOS.horas_estudio_semana.min, `Mínimo ${CONTRATO_RANGOS.horas_estudio_semana.min} horas/semana`)
    .max(CONTRATO_RANGOS.horas_estudio_semana.max, `Máximo ${CONTRATO_RANGOS.horas_estudio_semana.max} horas/semana`),
  apoyo_social: z.enum(CONTRATO_RANGOS.apoyo_social.opciones),
  presion_academica: z.number()
    .int('Debe ser un número entero')
    .min(CONTRATO_RANGOS.presion_academica.min, `Mínimo ${CONTRATO_RANGOS.presion_academica.min}`)
    .max(CONTRATO_RANGOS.presion_academica.max, `Máximo ${CONTRATO_RANGOS.presion_academica.max}`),
  extracurriculares: z.enum(CONTRATO_RANGOS.extracurriculares.opciones),
  promedio_0a10: z.number()
    .min(CONTRATO_RANGOS.promedio_0a10.min, `Mínimo ${CONTRATO_RANGOS.promedio_0a10.min}`)
    .max(CONTRATO_RANGOS.promedio_0a10.max, `Máximo ${CONTRATO_RANGOS.promedio_0a10.max}`),
});

export type EvaluacionFormData = z.infer<typeof evaluacionSchema>;