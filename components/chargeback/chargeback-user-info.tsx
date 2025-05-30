"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { mockCustomers } from "@/lib/mock-data"
import { format } from "date-fns"

interface ChargebackUserInfoProps {
  customerId: string;
}

export function ChargebackUserInfo({ customerId }: ChargebackUserInfoProps) {
  const customer = mockCustomers.find(c => c.id === customerId) || {
    id: customerId,
    name: "Unknown Customer",
    email: "unknown@example.com",
    phone: "-",
    walletId: "-",
    joinDate: new Date().toISOString()
  }
  
  const nameInitials = customer.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{nameInitials}</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-lg font-medium">{customer.name}</h3>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
            <p className="text-sm text-muted-foreground">{customer.phone}</p>
          </div>
          
          <div className="w-full pt-2">
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="text-muted-foreground">Customer ID:</div>
              <div className="text-right">{customer.id}</div>
              
              <div className="text-muted-foreground">Wallet ID:</div>
              <div className="text-right">{customer.walletId}</div>
              
              <div className="text-muted-foreground">Joined:</div>
              <div className="text-right">
                {format(new Date(customer.joinDate), "dd MMM yyyy")}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 