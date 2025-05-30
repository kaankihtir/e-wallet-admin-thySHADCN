"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const agreements = [
  {
    id: "AGR001",
    name: "Kullanıcı Sözleşmesi",
    type: "user",
    version: "3.2",
    effectiveDate: "01.01.2023",
    lastUpdated: "15.12.2022",
    approvalRequired: true,
    status: "active",
  },
  {
    id: "AGR002",
    name: "Gizlilik Politikası",
    type: "privacy",
    version: "2.5",
    effectiveDate: "01.01.2023",
    lastUpdated: "10.12.2022",
    approvalRequired: true,
    status: "active",
  },
  {
    id: "AGR003",
    name: "KVKK Aydınlatma Metni",
    type: "kvkk",
    version: "2.1",
    effectiveDate: "01.01.2023",
    lastUpdated: "12.12.2022",
    approvalRequired: true,
    status: "active",
  },
  {
    id: "AGR004",
    name: "Açık Rıza Metni",
    type: "consent",
    version: "1.8",
    effectiveDate: "01.01.2023",
    lastUpdated: "14.12.2022",
    approvalRequired: true,
    status: "active",
  },
  {
    id: "AGR005",
    name: "Mesafeli Satış Sözleşmesi",
    type: "distance",
    version: "2.0",
    effectiveDate: "01.01.2023",
    lastUpdated: "18.12.2022",
    approvalRequired: true,
    status: "active",
  },
  {
    id: "AGR006",
    name: "Çerez Politikası",
    type: "cookie",
    version: "1.5",
    effectiveDate: "01.01.2023",
    lastUpdated: "05.12.2022",
    approvalRequired: false,
    status: "active",
  },
  {
    id: "AGR007",
    name: "Ödeme Hizmetleri Çerçeve Sözleşmesi",
    type: "payment",
    version: "3.0",
    effectiveDate: "01.01.2023",
    lastUpdated: "20.12.2022",
    approvalRequired: true,
    status: "active",
  },
]

// Mock agreement content
const agreementContent = `
<h2>1. GİRİŞ</h2>
<p>İşbu Kullanıcı Sözleşmesi ("Sözleşme"), E-Cüzdan uygulamasını ("Uygulama") kullanımınızı düzenleyen hüküm ve koşulları içermektedir. Uygulamayı kullanarak bu Sözleşme'yi kabul etmiş sayılırsınız.</p>

<h2>2. HİZMETLERİN TANIMI</h2>
<p>Uygulama, elektronik para transferi, ödeme işlemleri, para yükleme ve çekme gibi finansal hizmetleri sunmaktadır. Bu hizmetler, 6493 sayılı Ödeme ve Menkul Kıymet Mutabakat Sistemleri, Ödeme Hizmetleri ve Elektronik Para Kuruluşları Hakkında Kanun ve ilgili mevzuat çerçevesinde sunulmaktadır.</p>

<h2>3. HESAP OLUŞTURMA VE KİMLİK DOĞRULAMA</h2>
<p>3.1. Uygulama'yı kullanabilmek için bir hesap oluşturmanız ve kimlik doğrulama sürecini tamamlamanız gerekmektedir.</p>
<p>3.2. Kimlik doğrulama süreci, 5549 sayılı Suç Gelirlerinin Aklanmasının Önlenmesi Hakkında Kanun ve ilgili mevzuat uyarınca zorunludur.</p>
<p>3.3. Hesap oluşturma sırasında verdiğiniz bilgilerin doğru, güncel ve eksiksiz olduğunu taahhüt edersiniz.</p>

<h2>4. KULLANIM KOŞULLARI</h2>
<p>4.1. Uygulama'yı yalnızca yasal amaçlar için kullanacağınızı kabul edersiniz.</p>
<p>4.2. Uygulama üzerinden gerçekleştirilen tüm işlemler kayıt altına alınmaktadır.</p>
<p>4.3. İşlem limitleri, hesap seviyenize göre belirlenmektedir. Limit artırımı için ek kimlik doğrulama adımlarını tamamlamanız gerekebilir.</p>

<h2>5. GÜVENLİK</h2>
<p>5.1. Hesap bilgilerinizi ve şifrenizi gizli tutmakla yükümlüsünüz.</p>
<p>5.2. Hesabınızda yetkisiz işlemler fark etmeniz durumunda derhal müşteri hizmetlerimize bildirimde bulunmalısınız.</p>

<h2>6. KOMİSYONLAR VE ÜCRETLER</h2>
<p>6.1. Uygulama üzerinden gerçekleştirilen işlemler için komisyon ve ücret tahsil edilebilir.</p>
<p>6.2. Güncel komisyon ve ücret tarifesi Uygulama içerisinde yer almaktadır.</p>

<h2>7. KİŞİSEL VERİLERİN KORUNMASI</h2>
<p>7.1. Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca işlenmektedir.</p>
<p>7.2. Kişisel verilerinizin işlenmesine ilişkin detaylı bilgi için Gizlilik Politikası'nı inceleyebilirsiniz.</p>

<h2>8. FİKRİ MÜLKİYET HAKLARI</h2>
<p>8.1. Uygulama ve içeriğine ilişkin tüm fikri mülkiyet hakları şirketimize aittir.</p>
<p>8.2. Uygulama'yı, içeriğini veya herhangi bir bölümünü kopyalama, değiştirme, dağıtma veya türev çalışmalar oluşturma hakkına sahip değilsiniz.</p>

<h2>9. SORUMLULUK SINIRLAMASI</h2>
<p>9.1. Uygulama "olduğu gibi" sunulmaktadır ve kesintisiz veya hatasız çalışacağı garanti edilmemektedir.</p>
<p>9.2. Mevzuatın izin verdiği ölçüde, doğrudan veya dolaylı zararlardan sorumlu olmayacağımızı kabul edersiniz.</p>

<h2>10. SÖZLEŞMENİN FESHİ</h2>
<p>10.1. Sözleşme'yi dilediğiniz zaman feshedebilirsiniz.</p>
<p>10.2. Sözleşme hükümlerinin ihlali durumunda hesabınızı askıya alma veya sonlandırma hakkımız saklıdır.</p>

<h2>11. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
<p>11.1. Bu Sözleşme'den doğan uyuşmazlıklarda Türkiye Cumhuriyeti kanunları uygulanacaktır.</p>
<p>11.2. Uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.</p>

<h2>12. DİĞER HÜKÜMLER</h2>
<p>12.1. Bu Sözleşme'nin herhangi bir hükmünün geçersiz olması, diğer hükümlerin geçerliliğini etkilemez.</p>
<p>12.2. Bu Sözleşme'de yapılacak değişiklikler, Uygulama üzerinden bildirilecektir.</p>
`

export function AgreementsTable() {
  const [selectedAgreement, setSelectedAgreement] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Sözleşme Adı</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Versiyon</TableHead>
              <TableHead>Yürürlük Tarihi</TableHead>
              <TableHead>Son Güncelleme</TableHead>
              <TableHead>Onay Gerekli</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agreements.map((agreement) => (
              <TableRow key={agreement.id}>
                <TableCell className="font-medium">{agreement.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {agreement.type === "user" && "Kullanıcı"}
                    {agreement.type === "privacy" && "Gizlilik"}
                    {agreement.type === "kvkk" && "KVKK"}
                    {agreement.type === "consent" && "Açık Rıza"}
                    {agreement.type === "distance" && "Mesafeli Satış"}
                    {agreement.type === "cookie" && "Çerez"}
                    {agreement.type === "payment" && "Ödeme Hizmetleri"}
                  </Badge>
                </TableCell>
                <TableCell>v{agreement.version}</TableCell>
                <TableCell>{agreement.effectiveDate}</TableCell>
                <TableCell>{agreement.lastUpdated}</TableCell>
                <TableCell>
                  {agreement.approvalRequired ? (
                    <Badge variant="default">Evet</Badge>
                  ) : (
                    <Badge variant="outline">Hayır</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={agreement.status === "active" ? "default" : "destructive"}>
                    {agreement.status === "active" ? "Aktif" : "Pasif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menüyü aç</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedAgreement(agreement)
                          setDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Görüntüle
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {selectedAgreement?.name} - v{selectedAgreement?.version}
            </DialogTitle>
            <DialogDescription>
              Yürürlük Tarihi: {selectedAgreement?.effectiveDate} | Son Güncelleme: {selectedAgreement?.lastUpdated}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="content" className="flex-1 overflow-hidden">
            <TabsList>
              <TabsTrigger value="content">İçerik</TabsTrigger>
              <TabsTrigger value="versions">Versiyon Geçmişi</TabsTrigger>
              <TabsTrigger value="stats">İstatistikler</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="overflow-auto p-4 border rounded-md mt-2">
              <div dangerouslySetInnerHTML={{ __html: agreementContent }} />
            </TabsContent>

            <TabsContent value="versions" className="overflow-auto p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Versiyon 3.2</div>
                    <div className="text-sm text-muted-foreground">15.12.2022 tarihinde güncellendi</div>
                  </div>
                  <Badge>Güncel</Badge>
                </div>

                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Versiyon 3.1</div>
                    <div className="text-sm text-muted-foreground">10.09.2022 tarihinde güncellendi</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Görüntüle
                  </Button>
                </div>

                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Versiyon 3.0</div>
                    <div className="text-sm text-muted-foreground">05.06.2022 tarihinde güncellendi</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Görüntüle
                  </Button>
                </div>

                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Versiyon 2.5</div>
                    <div className="text-sm text-muted-foreground">15.01.2022 tarihinde güncellendi</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Görüntüle
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="overflow-auto p-4 border rounded-md mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Onay İstatistikleri</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Toplam Kullanıcı:</span>
                      <span className="font-medium">45,231</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Onaylayan Kullanıcı:</span>
                      <span className="font-medium">42,876</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Onay Oranı:</span>
                      <span className="font-medium">94.8%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted mt-2">
                      <div className="h-2 w-[94.8%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Görüntülenme İstatistikleri</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Toplam Görüntülenme:</span>
                      <span className="font-medium">68,542</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ortalama Okuma Süresi:</span>
                      <span className="font-medium">2 dk 15 sn</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tam Okuma Oranı:</span>
                      <span className="font-medium">76.3%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted mt-2">
                      <div className="h-2 w-[76.3%] rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Versiyon Karşılaştırması</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Değişen Bölümler:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eklenen Kelime:</span>
                      <span className="font-medium">+245</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Çıkarılan Kelime:</span>
                      <span className="font-medium">-120</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Yasal Uyumluluk</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>BDDK Uyumluluğu:</span>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Tam Uyumlu
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>KVKK Uyumluluğu:</span>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Tam Uyumlu
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>MASAK Uyumluluğu:</span>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Tam Uyumlu
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Kapat
            </Button>
            <Button>Düzenle</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

