import { Metadata } from "next"
import { HomeContent } from "./home-content"

export const metadata: Metadata = {
  title: {
    default: "Estrés Académico México - Conscientización y Evaluación",
    template: "%s | Estrés Académico México",
  },
  description: "Sitio informativo sobre estrés académico en México. Evalúa tu nivel de estrés (bajo/medio/alto) con modelo ML y recibe recomendaciones personalizadas. Incluye línea de crisis 800 911 2000.",
  keywords: [
    "estrés académico",
    "salud mental estudiantes",
    "deserción escolar México",
    "evaluación estrés",
    "prevención suicidio estudiantes",
    "ansiedad académica",
    "bienestar estudiantil",
  ],
  authors: [{ name: "Estrés Académico México" }],
  creator: "Estrés Académico México",
  publisher: "Estrés Académico México",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://estres-academico.mx",
    siteName: "Estrés Académico México",
    title: "Estrés Académico México - Conscientización y Evaluación",
    description: "Evalúa tu nivel de estrés académico y conoce recursos de apoyo en México. Línea de crisis: 800 911 2000.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Estrés Académico México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estrés Académico México",
    description: "Evalúa tu estrés académico y accede a recursos de apoyo. 800 911 2000",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function HomePage() {
  return <HomeContent />
}