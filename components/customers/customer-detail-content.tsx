"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar, 
  Clock
} from "lucide-react";
import { mockCustomers } from "@/lib/mock-data";
import { format } from "date-fns";
import { CustomerTransactionsList } from "@/components/customers/customer-transactions-list";
import { CustomerChargebacksList } from "@/components/customers/customer-chargebacks-list";

interface CustomerDetailContentProps {
  customerId: string;
}

export function CustomerDetailContent({ customerId }: CustomerDetailContentProps) {
  const router = useRouter();
  
  const customer = mockCustomers.find(c => c.id === customerId);
  
  if (!customer) {
    return <div>Customer not found</div>;
  }
  
  return (
    <div className="grid gap-6">
      {/* Customer Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 md:items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Customer ID:</span>
                <span className="font-medium">{customer.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Wallet ID:</span>
                <span className="font-medium">{customer.walletId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined on {format(new Date(customer.joinDate), "dd MMMM yyyy")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="chargebacks">Chargebacks</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Overview</CardTitle>
              <CardDescription>
                Summary of customer information and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Overview content */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Customer Information */}
                <div>
                  <h3 className="mb-2 text-lg font-medium">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Full Name:</span>
                      <span>{customer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </div>
                
                {/* Account Information */}
                <div>
                  <h3 className="mb-2 text-lg font-medium">Account Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer ID:</span>
                      <span>{customer.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wallet ID:</span>
                      <span>{customer.walletId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Join Date:</span>
                      <span>{format(new Date(customer.joinDate), "dd MMMM yyyy")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                View customer's transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerTransactionsList customerId={customer.id} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chargebacks" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Chargeback Requests</CardTitle>
                <CardDescription>
                  View and manage chargeback requests submitted by this customer
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CustomerChargebacksList customerId={customer.id} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wallet" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>
                View customer's wallet details and balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Wallet content placeholder */}
              <div className="rounded-md border p-8 text-center">
                <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Wallet Information</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Wallet information would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage customer account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Settings content placeholder */}
              <div className="rounded-md border p-8 text-center">
                <User className="mx-auto h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Account Settings</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Account settings would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 