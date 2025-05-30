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
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AddLanguageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Desteklenen diller listesi
const SUPPORTED_LANGUAGES = [
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flagCode: "za" },
  { code: "sq", name: "Albanian", nativeName: "Shqip", flagCode: "al" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flagCode: "sa" },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն", flagCode: "am" },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycanca", flagCode: "az" },
  { code: "eu", name: "Basque", nativeName: "Euskara", flagCode: "es" },
  { code: "be", name: "Belarusian", nativeName: "Беларуская", flagCode: "by" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flagCode: "bd" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flagCode: "bg" },
  { code: "ca", name: "Catalan", nativeName: "Català", flagCode: "es" },
  { code: "zh", name: "Chinese", nativeName: "中文", flagCode: "cn" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flagCode: "hr" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flagCode: "cz" },
  { code: "da", name: "Danish", nativeName: "Dansk", flagCode: "dk" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flagCode: "nl" },
  { code: "en", name: "English", nativeName: "English", flagCode: "gb" },
  { code: "et", name: "Estonian", nativeName: "Eesti", flagCode: "ee" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flagCode: "fi" },
  { code: "fr", name: "French", nativeName: "Français", flagCode: "fr" },
  { code: "gl", name: "Galician", nativeName: "Galego", flagCode: "es" },
  { code: "ka", name: "Georgian", nativeName: "ქართული", flagCode: "ge" },
  { code: "de", name: "German", nativeName: "Deutsch", flagCode: "de" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flagCode: "gr" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flagCode: "in" },
  { code: "ht", name: "Haitian Creole", nativeName: "Kreyòl ayisyen", flagCode: "ht" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flagCode: "il" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flagCode: "in" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flagCode: "hu" },
  { code: "is", name: "Icelandic", nativeName: "Íslenska", flagCode: "is" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flagCode: "id" },
  { code: "ga", name: "Irish", nativeName: "Gaeilge", flagCode: "ie" },
  { code: "it", name: "Italian", nativeName: "Italiano", flagCode: "it" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flagCode: "jp" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flagCode: "in" },
  { code: "kk", name: "Kazakh", nativeName: "Қазақша", flagCode: "kz" },
  { code: "ko", name: "Korean", nativeName: "한국어", flagCode: "kr" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu", flagCode: "lv" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flagCode: "lt" },
  { code: "mk", name: "Macedonian", nativeName: "Македонски", flagCode: "mk" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flagCode: "my" },
  { code: "mt", name: "Maltese", nativeName: "Malti", flagCode: "mt" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flagCode: "no" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flagCode: "ir" },
  { code: "pl", name: "Polish", nativeName: "Polski", flagCode: "pl" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flagCode: "pt" },
  { code: "ro", name: "Romanian", nativeName: "Română", flagCode: "ro" },
  { code: "ru", name: "Russian", nativeName: "Русский", flagCode: "ru" },
  { code: "sr", name: "Serbian", nativeName: "Српски", flagCode: "rs" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flagCode: "sk" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina", flagCode: "si" },
  { code: "es", name: "Spanish", nativeName: "Español", flagCode: "es" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flagCode: "tz" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flagCode: "se" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flagCode: "in" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flagCode: "in" },
  { code: "th", name: "Thai", nativeName: "ไทย", flagCode: "th" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flagCode: "tr" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flagCode: "ua" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flagCode: "pk" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flagCode: "vn" },
  { code: "cy", name: "Welsh", nativeName: "Cymraeg", flagCode: "gb-wls" }
]

export function AddLanguageDialog({ open, onOpenChange }: AddLanguageDialogProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [defaultTranslations, setDefaultTranslations] = useState<"empty" | "auto" | "copy">("auto")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const resetState = () => {
    setSelectedLanguage(null)
    setDefaultTranslations("auto")
    setIsLoading(false)
    setSuccess(false)
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetState()
    }
    onOpenChange(isOpen)
  }
  
  const selectedLanguageDetails = selectedLanguage 
    ? SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage) 
    : null
  
  const handleAddLanguage = () => {
    if (!selectedLanguage) {
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
          <DialogTitle>Yeni Dil Ekle</DialogTitle>
          <DialogDescription>
            Sisteme yeni bir dil ekleyin. Eklenen dil, tüm çeviri anahtarları için kullanılabilir olacaktır.
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="py-6">
            <Alert className="bg-green-500/10 border-green-500/20">
              <Check className="h-5 w-5 text-green-500" />
              <AlertTitle>Dil başarıyla eklendi</AlertTitle>
              <AlertDescription>
                Yeni dil sisteme başarıyla eklenmiştir. Şimdi çevirileri düzenleyebilirsiniz.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="grid gap-6 pt-4 pb-2">
              <div className="grid gap-3">
                <Label htmlFor="language">Dil</Label>
                <Select value={selectedLanguage || ""} onValueChange={setSelectedLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Bir dil seçin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {SUPPORTED_LANGUAGES.map(language => (
                      <SelectItem key={language.code} value={language.code}>
                        <div className="flex items-center">
                          <span className="mr-2">{language.name}</span>
                          <span className="text-muted-foreground text-sm">
                            ({language.nativeName})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedLanguageDetails && (
                <div className="grid gap-3">
                  <Label>Dil Bilgileri</Label>
                  <div className="grid grid-cols-3 gap-2 border rounded-md p-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Dil Kodu</div>
                      <div className="font-medium">{selectedLanguageDetails.code}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Yerel Ad</div>
                      <div className="font-medium">{selectedLanguageDetails.nativeName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Bayrak</div>
                      <div className="font-medium">
                        <img 
                          src={`https://flagcdn.com/w40/${selectedLanguageDetails.flagCode}.png`} 
                          alt={selectedLanguageDetails.name}
                          width={30}
                          className="rounded-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid gap-3">
                <Label htmlFor="default-translations">Başlangıç Çevirileri</Label>
                <Select value={defaultTranslations} onValueChange={(value) => setDefaultTranslations(value as any)}>
                  <SelectTrigger id="default-translations">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Otomatik çeviri (tavsiye edilir)</SelectItem>
                    <SelectItem value="copy">İngilizce çevirileri kopyala</SelectItem>
                    <SelectItem value="empty">Boş bırak</SelectItem>
                  </SelectContent>
                </Select>
                
                {defaultTranslations === "auto" && (
                  <Alert className="bg-blue-500/10 border-blue-500/20">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription>
                      Otomatik çeviri seçeneği, çeviri anahtarlarını seçilen dile çevirmeye çalışır. 
                      Bu çeviriler manuel olarak kontrol edilmelidir.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                İptal
              </Button>
              <Button 
                onClick={handleAddLanguage} 
                disabled={!selectedLanguage || isLoading}
              >
                {isLoading ? "Dil Ekleniyor..." : "Dil Ekle"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 