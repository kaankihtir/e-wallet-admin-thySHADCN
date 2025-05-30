import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AgreementsHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sözleşmeler</h1>
        <p className="text-muted-foreground">
          E-cüzdan uygulamanızın yasal sözleşmelerini ve kullanım koşullarını yönetin.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          BDDK ve MASAK düzenlemelerine uygun olarak hazırlanmış sözleşmeler ve politikalar.
        </p>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Sözleşme Ekle
        </Button>
      </div>
    </div>
  )
}

