"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Check, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AddKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mevcut anahtar grupları
const KEY_GROUPS = [
  "common",
  "auth",
  "dashboard",
  "transactions",
  "customers",
  "errors",
  "validations",
  "emails",
  "notifications"
]

export function AddKeyDialog({ open, onOpenChange }: AddKeyDialogProps) {
  const [keyGroup, setKeyGroup] = useState<string>(KEY_GROUPS[0])
  const [keyName, setKeyName] = useState<string>("")
  const [keyDescription, setKeyDescription] = useState<string>("")
  const [englishValue, setEnglishValue] = useState<string>("")
  const [customGroup, setCustomGroup] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCustomGroup, setShowCustomGroup] = useState(false)
  
  const resetState = () => {
    setKeyGroup(KEY_GROUPS[0])
    setKeyName("")
    setKeyDescription("")
    setEnglishValue("")
    setCustomGroup("")
    setIsLoading(false)
    setSuccess(false)
    setError(null)
    setShowCustomGroup(false)
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetState()
    }
    onOpenChange(isOpen)
  }
  
  const validateKey = () => {
    const actualGroup = showCustomGroup ? customGroup : keyGroup
    
    if (!actualGroup) {
      setError("Lütfen bir grup seçin veya yeni bir grup adı girin")
      return false
    }
    
    if (!keyName) {
      setError("Lütfen bir anahtar adı girin")
      return false
    }
    
    // Anahtar adı için basit bir doğrulama
    if (!/^[a-zA-Z0-9_.-]+$/.test(keyName)) {
      setError("Anahtar adı yalnızca harf, rakam, alt çizgi, nokta ve kısa çizgi içerebilir")
      return false
    }
    
    if (!englishValue) {
      setError("Lütfen İngilizce (referans) değeri girin")
      return false
    }
    
    setError(null)
    return true
  }
  
  const getFullKeyName = () => {
    const actualGroup = showCustomGroup ? customGroup : keyGroup
    return `${actualGroup}.${keyName}`
  }
  
  const handleAddKey = () => {
    if (!validateKey()) {
      return
    }
    
    setIsLoading(true)
    
    // Gerçek uygulamada burada bir API çağrısı olacak
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      
      // Başarı mesajı gösterdikten sonra diyalogu kapat
      setTimeout(() => {
        handleOpenChange(false)
      }, 1500)
    }, 1000)
  }
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yeni Çeviri Anahtarı Ekle</DialogTitle>
          <DialogDescription>
            Sisteme yeni bir çeviri anahtarı ekleyin. Tüm dillerde bu anahtarın çevirisi olmalıdır.
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="py-6">
            <Alert className="bg-green-500/10 border-green-500/20">
              <Check className="h-5 w-5 text-green-500" />
              <AlertTitle>Çeviri anahtarı başarıyla eklendi</AlertTitle>
              <AlertDescription>
                <strong>{getFullKeyName()}</strong> anahtarı sisteme başarıyla eklenmiştir. Şimdi tüm dillerdeki çevirilerini düzenleyebilirsiniz.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="grid gap-6 pt-4 pb-2">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-3">
                <Label htmlFor="key-group">Anahtar Grubu</Label>
                {!showCustomGroup ? (
                  <>
                    <Select value={keyGroup} onValueChange={setKeyGroup}>
                      <SelectTrigger id="key-group">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {KEY_GROUPS.map(group => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      className="mt-1"
                      onClick={() => setShowCustomGroup(true)}
                    >
                      Özel Grup Ekle
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      id="custom-group"
                      placeholder="Örn: admin, settings, payment"
                      value={customGroup}
                      onChange={(e) => setCustomGroup(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-1"
                      onClick={() => {
                        setShowCustomGroup(false)
                        setCustomGroup("")
                      }}
                    >
                      Mevcut Grupları Kullan
                    </Button>
                  </>
                )}
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="key-name">Anahtar Adı</Label>
                <Input
                  id="key-name"
                  placeholder="Örn: submit, cancel, welcome_message"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                />
                
                <div className="text-sm text-muted-foreground">
                  Tam anahtar: <strong>{getFullKeyName()}</strong>
                </div>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="key-description">Açıklama (isteğe bağlı)</Label>
                <Input
                  id="key-description"
                  placeholder="Bu anahtar ne için kullanılıyor?"
                  value={keyDescription}
                  onChange={(e) => setKeyDescription(e.target.value)}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="english-value">İngilizce (Referans) Değeri</Label>
                <Textarea
                  id="english-value"
                  placeholder="İngilizce çeviri metni"
                  value={englishValue}
                  onChange={(e) => setEnglishValue(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                İptal
              </Button>
              <Button 
                onClick={handleAddKey} 
                disabled={isLoading}
              >
                {isLoading ? "Anahtar Ekleniyor..." : "Anahtar Ekle"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 