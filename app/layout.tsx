import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Raleway, Montserrat } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const montserratHeading = Montserrat({ subsets: ['latin'], variable: '--font-heading' })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-sans' })
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        raleway.variable,
        montserratHeading.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  )
}