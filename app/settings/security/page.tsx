"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  Fingerprint, 
  KeyRound, 
  RefreshCw,
  LogOut, 
  Plus,
  Laptop,
  Trash2,
  AlertTriangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for connected devices
const connectedDevices = [
  { 
    id: "device-1", 
    name: "MacBook Pro", 
    type: "Desktop", 
    lastActive: "Active now", 
    location: "Istanbul, Turkey", 
    isCurrent: true
  },
  { 
    id: "device-2", 
    name: "iPhone 13", 
    type: "Mobile", 
    lastActive: "2 hours ago", 
    location: "Istanbul, Turkey", 
    isCurrent: false
  },
  { 
    id: "device-3", 
    name: "iPad Pro", 
    type: "Tablet", 
    lastActive: "Yesterday", 
    location: "Ankara, Turkey", 
    isCurrent: false
  },
]

// Mock data for security keys (passkeys)
const securityKeys = [
  { 
    id: "key-1", 
    name: "MacBook Touch ID", 
    type: "Fingerprint", 
    createdAt: "Jan 15, 2023", 
    lastUsed: "Today"
  },
  { 
    id: "key-2", 
    name: "iPhone Face ID", 
    type: "Face Recognition", 
    createdAt: "Feb 3, 2023", 
    lastUsed: "Yesterday"
  }
]

export default function SecuritySettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [passwordlessEnabled, setPasswordlessEnabled] = useState(true)
  const [showQRCode, setShowQRCode] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showAddPasskey, setShowAddPasskey] = useState(false)
  const [passkeyName, setPasskeyName] = useState("")
  
  // Password reset function
  const handlePasswordReset = () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    
    // In a real app, call API to change password
    console.log("Password changed successfully")
    setShowPasswordChange(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    
    // Show success message
    alert("Password changed successfully")
  }
  
  // Add new passkey function
  const handleAddPasskey = () => {
    // In a real app, call WebAuthn API to register a new passkey
    console.log("Registering new passkey:", passkeyName)
    setShowAddPasskey(false)
    setPasskeyName("")
    
    // Show success message
    alert("New passkey registered successfully")
  }
  
  // Toggle 2FA function
  const handle2FAToggle = () => {
    if (twoFactorEnabled) {
      // In a real app, you'd want to confirm before disabling 2FA
      if (confirm("Are you sure you want to disable two-factor authentication? This will make your account less secure.")) {
        setTwoFactorEnabled(false)
      }
    } else {
      // Show QR code setup dialog
      setShowQRCode(true)
    }
  }
  
  // Setup 2FA function
  const handleSetup2FA = () => {
    // In a real app, verify the code and enable 2FA
    setTwoFactorEnabled(true)
    setShowQRCode(false)
    alert("Two-factor authentication enabled successfully")
  }
  
  return (
    <Tabs defaultValue="password">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
        <TabsTrigger value="passkeys">Passkeys</TabsTrigger>
        <TabsTrigger value="devices">Connected Devices</TabsTrigger>
      </TabsList>
      
      {/* Password Tab */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Manage your password settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-4">
              <div className="space-y-0.5">
                <div className="font-medium">Change password</div>
                <div className="text-sm text-muted-foreground">Update your password regularly to keep your account secure</div>
              </div>
              <Button onClick={() => setShowPasswordChange(true)}>
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-4">
              <div className="space-y-0.5">
                <div className="font-medium">Password reset</div>
                <div className="text-sm text-muted-foreground">Send a password reset link to your email</div>
              </div>
              <Button variant="outline">Send Reset Link</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-4">
              <div className="space-y-0.5">
                <div className="font-medium">Password requirements</div>
                <div className="text-sm text-muted-foreground">
                  <ul className="list-disc pl-4 space-y-1 mt-1">
                    <li>At least 8 characters long</li>
                    <li>Must include uppercase and lowercase letters</li>
                    <li>Must include at least one number</li>
                    <li>Must include at least one special character</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Two-Factor Authentication Tab */}
      <TabsContent value="2fa">
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Secure your account with 2FA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-4">
              <div className="space-y-0.5">
                <div className="font-medium">Authenticator app</div>
                <div className="text-sm text-muted-foreground">
                  Use an authenticator app like Google Authenticator or Authy to get verification codes
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {twoFactorEnabled ? (
                  <Badge variant="outline" className="border-green-500 text-green-500">Enabled</Badge>
                ) : (
                  <Badge variant="outline" className="border-gray-500 text-gray-500">Disabled</Badge>
                )}
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handle2FAToggle}
                />
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-4">
              <div className="space-y-0.5">
                <div className="font-medium">Recovery codes</div>
                <div className="text-sm text-muted-foreground">
                  Recovery codes can be used to access your account if you lose your 2FA device
                </div>
              </div>
              <Button variant="outline" disabled={!twoFactorEnabled}>View Recovery Codes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Passkeys Tab */}
      <TabsContent value="passkeys">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Passkeys & Security Keys</CardTitle>
              <CardDescription>Manage passwordless authentication methods</CardDescription>
            </div>
            <Button onClick={() => setShowAddPasskey(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Passkey
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-4">
              <div className="space-y-0.5">
                <div className="font-medium">Passwordless login</div>
                <div className="text-sm text-muted-foreground">
                  Use security keys or biometric authentication instead of passwords
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {passwordlessEnabled ? (
                  <Badge variant="outline" className="border-green-500 text-green-500">Enabled</Badge>
                ) : (
                  <Badge variant="outline" className="border-gray-500 text-gray-500">Disabled</Badge>
                )}
                <Switch
                  checked={passwordlessEnabled}
                  onCheckedChange={setPasswordlessEnabled}
                />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Your security keys</h3>
              {securityKeys.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>{key.type}</TableCell>
                        <TableCell>{key.createdAt}</TableCell>
                        <TableCell>{key.lastUsed}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will remove the security key from your account. You will no longer be able to use it for authentication.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600">Remove Key</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="rounded-md border p-8 text-center">
                  <Fingerprint className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-sm font-medium">No security keys</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You haven't added any security keys yet.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setShowAddPasskey(true)}>
                    Add Your First Security Key
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Connected Devices Tab */}
      <TabsContent value="devices">
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Manage devices that are logged into your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectedDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {device.type === "Desktop" && <Laptop className="h-5 w-5 text-muted-foreground" />}
                        {device.type === "Mobile" && <Smartphone className="h-5 w-5 text-muted-foreground" />}
                        <div>
                          <div className="font-medium">{device.name}</div>
                          <div className="text-sm text-muted-foreground">{device.type}</div>
                        </div>
                        {device.isCurrent && (
                          <Badge className="ml-2" variant="outline">Current</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{device.lastActive}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>
                      {!device.isCurrent && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <LogOut className="h-4 w-4 mr-2" />
                              Sign Out
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Sign out from this device?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will sign out {device.name} from your account. You'll need to sign in again on that device.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Sign Out</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              <AlertTriangle className="inline-block h-4 w-4 mr-1" />
              Don't recognize a device? Sign out from it and change your password immediately.
            </div>
            <Button variant="destructive">
              Sign Out All Other Devices
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Password Change Dialog */}
      <Dialog open={showPasswordChange} onOpenChange={setShowPasswordChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to change it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordChange(false)}>Cancel</Button>
            <Button onClick={handlePasswordReset}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Setup 2FA Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan this QR code with your authenticator app. Then enter the verification code below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="bg-black p-2 mb-4">
              {/* Placeholder for QR code - in real app, render an actual QR code */}
              <div className="w-48 h-48 bg-white p-2 flex items-center justify-center">
                <div className="text-black text-center text-sm">
                  QR Code for 2FA setup
                  <br /><br />
                  (This is a placeholder in the demo)
                </div>
              </div>
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input 
                id="verification-code" 
                placeholder="Enter 6-digit code"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQRCode(false)}>Cancel</Button>
            <Button onClick={handleSetup2FA}>Verify and Enable</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Passkey Dialog */}
      <Dialog open={showAddPasskey} onOpenChange={setShowAddPasskey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Passkey</DialogTitle>
            <DialogDescription>
              Set up a passkey to sign in without using a password
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <Label htmlFor="passkey-name">Passkey Name</Label>
              <Input 
                id="passkey-name" 
                placeholder="e.g. MacBook Touch ID" 
                value={passkeyName}
                onChange={(e) => setPasskeyName(e.target.value)}
              />
            </div>
            <div className="mt-4 rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Fingerprint className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">What are passkeys?</h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <p>
                      Passkeys are a safer and easier alternative to passwords. They use biometric data like your fingerprint, face or a security key to authenticate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPasskey(false)}>Cancel</Button>
            <Button onClick={handleAddPasskey}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
} 