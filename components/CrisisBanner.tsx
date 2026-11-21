"use client"

import { RiAlertLine as AlertCircle, RiPhoneLine as Phone, RiCloseLine as X } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function CrisisBanner({ className, dismissible = true }: { className?: string; dismissible?: boolean }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-destructive/30 bg-destructive/10 px-4 py-3 shadow-lg",
        "md:static md:border md:shadow-none md:bg-destructive/5 md:p-4",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-destructive">¿Necesitas ayuda inmediata?</p>
            <p className="text-sm text-muted-foreground">
              No estás solo. Hay profesionales disponibles 24/7 para escucharte.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <a
            href="tel:8009112000"
            className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 font-medium hover:bg-destructive/90 transition-colors"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>800 911 2000</span>
            <span className="text-xs hidden sm:inline">(Línea de la Vida)</span>
          </a>
          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDismissed(true)}
              aria-label="Cerrar banner de crisis"
              className="text-muted-foreground hover:text-foreground md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}