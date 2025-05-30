import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { User, Lock, AlertTriangle, CheckCircle } from "lucide-react"

interface ApprovalDialogProps {
  title: string
  description: string
  action: "approve" | "reject" | "request_info"
  onConfirm: (notes: string) => Promise<void>
  children: React.ReactNode
}

export function ApprovalDialog({
  title,
  description,
  action,
  onConfirm,
  children,
}: ApprovalDialogProps) {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [approver, setApprover] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleConfirm = async () => {
    if (!notes || !approver) return
    
    setLoading(true)
    try {
      await onConfirm(notes)
      setOpen(false)
      setNotes("")
      setApprover("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        {action === "reject" && (
          <div className="rounded-md bg-amber-50 p-3">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Attention Required</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>
                    You are about to reject this chargeback request. This action will notify the customer
                    and cannot be undone. Please provide a detailed explanation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter detailed explanation"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="approver">Approver ID</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="approver"
                placeholder="Enter your employee ID"
                className="pl-8"
                value={approver}
                onChange={(e) => setApprover(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your employee ID is required for audit purposes
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!notes || !approver || loading}
            variant={action === "reject" ? "destructive" : action === "approve" ? "default" : "secondary"}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                {action === "approve" && <CheckCircle className="mr-2 h-4 w-4" />}
                {action === "reject" && <AlertTriangle className="mr-2 h-4 w-4" />}
                {action === "request_info" && <Lock className="mr-2 h-4 w-4" />}
                Confirm {action.replace("_", " ")}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 