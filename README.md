# Estrés Académico México

Sitio web informativo y de evaluación para la conscientización del estrés académico en México, con el objetivo de reducir la deserción escolar y prevenir consecuencias graves en la salud mental de los estudiantes.

## Características

- **Landing page informativa** con estadísticas mexicanas oficiales (INEGI, SEP, ENSANUT, CONASAMA)
- **Evaluación de 6 preguntas** basada en modelo ML validado
- **Clasificación en 3 niveles**: Bajo, Medio, Alto
- **Factores explicables** (top 2 factores con empuje > 0.5)
- **Recomendaciones personalizadas** por nivel (placeholders)
- **Banner de crisis permanente** con Línea de la Vida 800 911 2000
- **Disclaimers prominentes** sobre limitaciones del modelo

## Stack Tecnológico

- **Next.js 16** (App Router, Turbopack)
- **React 19** con React Compiler
- **Tailwind CSS 4** + **shadcn/ui** (componentes base-ui/react)
- **TypeScript** estricto
- **Zod** + **React Hook Form** para validación
- **Remixicon** para iconografía

## Estructura del Proyecto

```
app/
├── layout.tsx              # Layout raíz + Toaster + metadata
├── page.tsx                # Landing page (Server Component)
├── home-content.tsx        # Contenido interactivo del landing (Client Component)
├── evaluacion/
│   └── page.tsx            # Formulario de 6 preguntas
├── api/
│   └── clasificar/
│       └── route.ts        # Proxy a API externa del modelo
├── resultado/
│   ├── bajo/page.tsx       # Resultado nivel bajo
│   ├── medio/page.tsx      # Resultado nivel medio
│   └── alto/page.tsx       # Resultado nivel alto + recursos de crisis
components/
├── ui/                     # Componentes shadcn/ui personalizados
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── slider.tsx
│   ├── radio-group.tsx
│   ├── label.tsx
│   ├── progress.tsx
│   ├── alert.tsx
│   ├── badge.tsx
│   ├── separator.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   └── use-toast.ts
├── StressForm.tsx          # Formulario principal de evaluación
├── ResultCard.tsx          # Tarjeta de resultado con probabilidades y factores
├── StatCard.tsx            # Cards de estadísticas mexicanas
├── CrisisBanner.tsx        # Banner fijo con línea de crisis
├── Disclaimer.tsx          # Disclaimers (general y modelo)
types/
├── contrato.ts             # Tipos derivados de contrato.json
lib/
├── schema.ts               # Esquema Zod con validaciones exactas
├── conversions.ts          # Conversión formulario → API request
├── api.ts                  # Cliente para llamar a la API del modelo
└── utils.ts                # Utilidades (cn)
```

## Modelo de Predicción

El modelo espera 6 features en este orden (según `contrato.json`):

1. `sleep_hours_per_day` (4-8h, clamp)
2. `study_hours_per_week` (4-20h, clamp)
3. `social_support_score` (0, 3.3, 6.7, 10 según opción)
4. `academic_pressure_score` (0-10 entero)
5. `extracurricular_participation` (0 o 1)
6. `gpa_score_avg` (promedio 0-10 × 10)

Respuesta esperada (según `predict_response.json`):
- `prediction.label`: "bajo" | "medio" | "alto"
- `prediction.probabilities`: { bajo, medio, alto }
- `top_factors`: factores con `is_top_factor: true`
- `transformed_data`: todos los factores con empuje, status, etc.

## Instalación y Desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar producción
pnpm start

# Lint
pnpm lint

# Formatear
pnpm format
```

## Variables de Entorno

Crear `.env.local` basado en `.env.example`:

```env
MODEL_API_URL=http://127.0.0.1:8000/predict
# MODEL_API_KEY=tu_api_key_si_requiere
```

## API del Modelo

El endpoint `/api/clasificar` actúa como proxy hacia tu API FastAPI externa:

**Request:**
```json
{
  "student_id": "web_1234567890_abc123",
  "features": {
    "sleep_hours_per_day": 7,
    "study_hours_per_week": 15,
    "social_support_score": 6.7,
    "academic_pressure_score": 5,
    "extracurricular_participation": 0,
    "gpa_score_avg": 80
  }
}
```

**Response esperada:**
```json
{
  "student_id": "web_1234567890_abc123",
  "source": "live",
  "model_used": "fallback_heuristic",
  "prediction": {
    "label": "medio",
    "level": 1,
    "message": "Tus respuestas indican un nivel de estrés medio...",
    "confidence": 0.5611,
    "probabilities": { "bajo": 0.1038, "medio": 0.5611, "alto": 0.335 }
  },
  "top_factors": [...],
  "transformed_data": [...],
  "summary_vector": [...],
  "disclaimer": "Herramienta de apoyo. No es un diagnóstico clínico..."
}
```

## Estadísticas Mexicanas Incluidas

- **Deserción media superior 2023-2024**: 11.3% (SEP/INEGI)
- **Suicidios 2024 (10+ años)**: 9,051, tasa 7.0/100k hab (INEGI EDR)
- **Tasa suicidio jóvenes 15-29 años**: 10.2/100k (grupo con mayor tasa)
- **Ansiedad en jóvenes CDMX**: 50.9% (ENSANUT 2023-24)
- **Línea de la Vida**: 800 911 2000 (CONASAMA, 24/7)

## Rutas de Acción por Nivel (Placeholders)

| Nivel | Rutas |
|-------|-------|
| **Bajo** | "Sigue así" · "Conoce más" · "Técnicas de estudio" |
| **Medio** | "Técnicas de estudio" · "Manejo de ansiedad" · "Disciplina para estudiar" |
| **Alto** | **"Consulta a un experto"** (prominente) + Línea de crisis 800 911 2000 |

## Disclaimer Importante

> **Herramienta de apoyo. No es un diagnóstico clínico.**
> El modelo fue entrenado con datos de estudiantes de la India (Kaggle rishavraj1232/student-early-stress-detection v2, solo 1,100 registros del source_dataset == 'stress_survey') y puede no reflejar completamente la realidad demográfica mexicana. Los resultados son orientativos.
> 
> Si presentas síntomas de estrés severo, ansiedad o depresión, busca apoyo profesional. En México: **Línea de la Vida 800 911 2000** (gratuita, 24/7).

## Licencia

Proyecto educativo para conscientización del estrés académico en México.