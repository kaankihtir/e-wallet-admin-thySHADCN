// Define the mock data for chargebacks and related entities

export const mockChargebacks = [
  {
    id: "CHB-1001",
    customerId: "CUST-5678",
    transactionId: "TRX-9876",
    type: "POS",
    amount: 1250.50,
    date: "2023-06-15",
    reason: "The transaction was charged multiple times but I only authorized it once",
    status: "pending_at_tkpay",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request via mobile app for a POS transaction",
        timestamp: "2023-06-15T14:32:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-06-15T14:35:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-1002",
    customerId: "CUST-1234",
    transactionId: "TRX-5432",
    type: "ATM",
    amount: 500.00,
    date: "2023-06-10",
    reason: "I attempted to withdraw 500 TL but the ATM did not dispense any cash, yet my account was debited",
    status: "pending_at_bank",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted an ATM cash withdrawal dispute via mobile app",
        timestamp: "2023-06-10T09:15:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-06-10T09:18:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review and will be processed in the Anahtar System",
        timestamp: "2023-06-10T11:30:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-1003",
    customerId: "CUST-7890",
    transactionId: "TRX-1357",
    type: "POS",
    amount: 799.99,
    date: "2023-06-05",
    reason: "I canceled this transaction with the merchant but the refund has not been processed yet",
    status: "pending_info",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request via mobile app",
        timestamp: "2023-06-05T16:42:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-06-05T16:45:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review and will be processed through Banksoft CTM",
        timestamp: "2023-06-06T10:15:00",
        responsible: "TKPAY"
      },
      {
        type: "info_requested",
        title: "Additional Information Requested",
        description: "Ziraat Bank requested proof of cancellation from the customer",
        timestamp: "2023-06-07T10:30:00",
        responsible: "ZiraatBank"
      }
    ]
  },
  {
    id: "CHB-1004",
    customerId: "CUST-2468",
    transactionId: "TRX-2468",
    type: "POS",
    amount: 349.50,
    date: "2023-05-28",
    reason: "The purchased product was defective and the merchant refused to issue a refund",
    status: "approved",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request via mobile app",
        timestamp: "2023-05-28T13:12:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-05-28T13:15:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review and will be processed through Banksoft CTM",
        timestamp: "2023-05-29T09:30:00",
        responsible: "TKPAY"
      },
      {
        type: "info_requested",
        title: "Additional Information Requested",
        description: "Ziraat Bank requested proof of defective product",
        timestamp: "2023-05-30T11:40:00",
        responsible: "ZiraatBank"
      },
      {
        type: "document_added",
        title: "Documents Uploaded",
        description: "TKPAY uploaded customer-provided photos of the defective product",
        timestamp: "2023-05-31T16:05:00",
        responsible: "TKPAY"
      },
      {
        type: "status_change",
        title: "Review in Progress",
        description: "Dispute is being reviewed by Ziraat Bank with the provided documentation",
        timestamp: "2023-06-01T09:30:00",
        responsible: "ZiraatBank"
      },
      {
        type: "approved",
        title: "Dispute Approved",
        description: "The dispute has been resolved in favor of the customer. Funds will be transferred to the pool account.",
        timestamp: "2023-06-10T14:20:00",
        responsible: "ZiraatBank"
      },
      {
        type: "status_change",
        title: "Funds Transferred to Pool Account",
        description: "The disputed amount has been transferred to the pool account",
        timestamp: "2023-06-11T10:15:00",
        responsible: "ZiraatBank"
      },
      {
        type: "status_change",
        title: "Customer Refunded",
        description: "The disputed amount has been refunded to the customer's wallet",
        timestamp: "2023-06-11T11:30:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-1005",
    customerId: "CUST-3691",
    transactionId: "TRX-3691",
    type: "ATM",
    amount: 1000.00,
    date: "2023-05-20",
    reason: "The ATM only dispensed 500 TL but my account was debited for 1000 TL",
    status: "rejected",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted an ATM cash withdrawal dispute via mobile app",
        timestamp: "2023-05-20T10:05:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-05-20T10:08:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review and will be processed in the Anahtar System",
        timestamp: "2023-05-21T11:45:00",
        responsible: "TKPAY"
      },
      {
        type: "info_requested",
        title: "Additional Information Requested",
        description: "Ziraat Bank requested ATM receipt and transaction details",
        timestamp: "2023-05-22T14:10:00",
        responsible: "ZiraatBank"
      },
      {
        type: "document_added",
        title: "Documents Uploaded",
        description: "TKPAY uploaded customer-provided ATM receipt",
        timestamp: "2023-05-23T09:45:00",
        responsible: "TKPAY"
      },
      {
        type: "status_change",
        title: "Review in Progress",
        description: "Dispute is being reviewed by Ziraat Bank with the provided documentation",
        timestamp: "2023-05-24T11:20:00",
        responsible: "ZiraatBank"
      },
      {
        type: "rejected",
        title: "Dispute Rejected",
        description: "The dispute has been rejected. ATM camera footage shows the full amount was dispensed.",
        timestamp: "2023-06-05T16:30:00",
        responsible: "ZiraatBank"
      },
      {
        type: "status_change",
        title: "Customer Notified",
        description: "The customer has been notified about the rejection of the dispute",
        timestamp: "2023-06-05T17:15:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-1006",
    customerId: "CUST-4812",
    transactionId: "TRX-4812",
    type: "POS",
    amount: 1750.25,
    date: "2023-06-12",
    reason: "I did not authorize this transaction. My card may have been compromised.",
    status: "pending_at_tkpay",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request for unauthorized transaction",
        timestamp: "2023-06-12T08:45:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-06-12T09:05:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-2001",
    customerId: "CUS001",
    transactionId: "TRX-9876",
    type: "POS",
    amount: 850.75,
    date: "2023-06-18",
    reason: "The merchant charged me twice for the same transaction",
    status: "pending_at_tkpay",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request via mobile app for a POS transaction",
        timestamp: "2023-06-18T14:32:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-06-18T14:35:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-2002",
    customerId: "CUS001",
    transactionId: "TRX-5432",
    type: "ATM",
    amount: 1000.00,
    date: "2023-06-10",
    reason: "ATM did not dispense cash but my account was debited",
    status: "pending_at_bank",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted an ATM cash withdrawal dispute via mobile app",
        timestamp: "2023-06-10T09:15:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-06-10T09:18:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review",
        timestamp: "2023-06-10T11:30:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-2003",
    customerId: "CUS001",
    transactionId: "TRX-1357",
    type: "POS",
    amount: 450.00,
    date: "2023-05-25",
    reason: "Product was defective and merchant refused refund",
    status: "approved",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request via mobile app",
        timestamp: "2023-05-25T16:42:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-05-25T16:45:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review",
        timestamp: "2023-05-26T10:15:00",
        responsible: "TKPAY"
      },
      {
        type: "approved",
        title: "Dispute Approved",
        description: "The dispute has been resolved in favor of the customer",
        timestamp: "2023-06-01T14:20:00",
        responsible: "ZiraatBank"
      },
      {
        type: "status_change",
        title: "Customer Refunded",
        description: "The disputed amount has been refunded to the customer's wallet",
        timestamp: "2023-06-01T15:30:00",
        responsible: "TKPAY"
      }
    ]
  },
  {
    id: "CHB-2004",
    customerId: "CUS001",
    transactionId: "TRX-2468",
    type: "POS",
    amount: 299.99,
    date: "2023-05-15",
    reason: "Unauthorized transaction - card was compromised",
    status: "rejected",
    timeline: [
      {
        type: "created",
        title: "Customer Submitted Dispute",
        description: "Customer submitted a chargeback request for unauthorized transaction",
        timestamp: "2023-05-15T08:45:00",
        responsible: "Customer"
      },
      {
        type: "status_tkpay_review",
        title: "Initial Review at TKPAY",
        description: "Dispute is being reviewed by TKPAY team before forwarding to the bank",
        timestamp: "2023-05-15T09:05:00",
        responsible: "TKPAY"
      },
      {
        type: "status_bank_review",
        title: "Forwarded to Ziraat Bank",
        description: "Dispute was forwarded to Ziraat Bank for review",
        timestamp: "2023-05-16T10:30:00",
        responsible: "TKPAY"
      },
      {
        type: "rejected",
        title: "Dispute Rejected",
        description: "Transaction was found to be legitimate based on card usage pattern",
        timestamp: "2023-05-20T16:30:00",
        responsible: "ZiraatBank"
      }
    ]
  }
];

export const mockCustomers = [
  {
    id: "CUST-1234",
    name: "Mehmet Yılmaz",
    email: "mehmet.yilmaz@example.com",
    phone: "+90 532 123 4567",
    walletId: "WALLET-1234",
    joinDate: "2022-03-15"
  },
  {
    id: "CUST-5678",
    name: "Ayşe Demir",
    email: "ayse.demir@example.com",
    phone: "+90 536 567 8901",
    walletId: "WALLET-5678",
    joinDate: "2022-01-10"
  },
  {
    id: "CUST-7890",
    name: "Ali Çelik",
    email: "ali.celik@example.com",
    phone: "+90 533 789 0123",
    walletId: "WALLET-7890",
    joinDate: "2022-05-22"
  },
  {
    id: "CUST-2468",
    name: "Zeynep Kaya",
    email: "zeynep.kaya@example.com",
    phone: "+90 535 246 8024",
    walletId: "WALLET-2468",
    joinDate: "2022-02-18"
  },
  {
    id: "CUST-3691",
    name: "Mustafa Öztürk",
    email: "mustafa.ozturk@example.com",
    phone: "+90 534 369 1475",
    walletId: "WALLET-3691",
    joinDate: "2022-04-30"
  },
  {
    id: "CUST-4812",
    name: "Fatma Yıldız",
    email: "fatma.yildiz@example.com",
    phone: "+90 538 481 2453",
    walletId: "WALLET-4812",
    joinDate: "2022-06-05"
  }
];

export const mockDocuments = [
  {
    chargebackId: "CHB-1003",
    name: "Cancellation_Email.pdf",
    uploadDate: "2023-06-08T14:22:00",
    type: "communication"
  },
  {
    chargebackId: "CHB-1004",
    name: "Defective_Product_Photo_1.jpg",
    uploadDate: "2023-05-31T16:05:00",
    type: "product_evidence"
  },
  {
    chargebackId: "CHB-1004",
    name: "Defective_Product_Photo_2.jpg",
    uploadDate: "2023-05-31T16:05:00",
    type: "product_evidence"
  },
  {
    chargebackId: "CHB-1004",
    name: "Merchant_Communication.pdf",
    uploadDate: "2023-05-31T16:05:00",
    type: "communication"
  },
  {
    chargebackId: "CHB-1005",
    name: "ATM_Receipt.pdf",
    uploadDate: "2023-05-23T09:45:00",
    type: "receipt"
  }
]; 