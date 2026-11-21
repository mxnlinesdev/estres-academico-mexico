import { Card, CardContent } from "@/components/ui/card"
import { RiAlertLine as AlertCircle, RiUserCommunityLine as Users, RiGraduationCapLine as GraduationCap, RiBrainLine as Brain, RiHeartLine as Heart } from "@remixicon/react"

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  description?: string
}

// Todas las stats usan color destructivo (rojo) por ser estadísticas graves de salud mental
const ICON_STYLE = "mx-auto mb-3 h-12 w-12 flex items-center justify-center bg-destructive/10 text-destructive"

export function StatCard({ icon: Icon, value, label, description }: StatCardProps) {
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardContent className="py-6">
        <div className={ICON_STYLE}>
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="text-sm font-medium text-muted-foreground mt-1">{label}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

// Estadísticas mexicanas para el landing - todas con estilo consistente
export const MEXICAN_STATS = [
  {
    icon: GraduationCap,
    value: '11.3%',
    label: 'Deserción media superior',
    description: 'Ciclo 2023-2024 (SEP/INEGI)',
  },
  {
    icon: Users,
    value: '9,051',
    label: 'Suicidios en 2024',
    description: 'Tasa 7.0/100k hab (INEGI EDR)',
  },
  {
    icon: Brain,
    value: '10.2',
    label: 'Tasa suicidio 15-29 años',
    description: 'Grupo con mayor tasa (INEGI 2024)',
  },
  {
    icon: Heart,
    value: '50.9%',
    label: 'Ansiedad en jóvenes CDMX',
    description: 'Centros PILARES (ENSANUT 2023-24)',
  },
  {
    icon: AlertCircle,
    value: '800 911 2000',
    label: 'Línea de la Vida',
    description: 'Gratuita, 24/7 (CONASAMA)',
  },
]