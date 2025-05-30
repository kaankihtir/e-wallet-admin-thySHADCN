"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  Globe,
  Smartphone,
  Server,
  X,
  MessageSquare,
  Send,
  Edit2,
  Trash2,
  MoreVertical,
  CreditCard
} from "lucide-react";
import { Transaction as BaseTransaction } from "@/components/transactions/transaction-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  edited?: boolean;
}

interface Transaction extends BaseTransaction {
  prepaidCard?: {
    id: string;
    name: string;
    number: string;
    type: string;
  } | null;
  flagged?: boolean;
  flagReason?: string;
}

interface TransactionDetailsDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsDialogProps) {
  if (!transaction) return null;

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "Customer called about this transaction. They wanted to confirm if it went through successfully.",
      user: {
        name: "Jane Cooper",
        avatar: "/avatars/jane-cooper.png",
      },
      timestamp: "Today at 10:30 AM",
    },
    {
      id: "2",
      text: "I've checked with the payment processor and confirmed this is completed.",
      user: {
        name: "Wade Warren",
        avatar: "/avatars/wade-warren.png",
      },
      timestamp: "Today at 11:45 AM",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const getTypeIcon = (type: "topup" | "withdraw" | "transfer") => {
    switch (type) {
      case "topup":
        return <ArrowDownCircle className="h-8 w-8 text-green-500" />;
      case "withdraw":
        return <ArrowUpCircle className="h-8 w-8 text-red-500" />;
      case "transfer":
        return <ArrowLeftRight className="h-8 w-8 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTypeText = (type: "topup" | "withdraw" | "transfer") => {
    switch (type) {
      case "topup":
        return "Top-up";
      case "withdraw":
        return "Withdrawal";
      case "transfer":
        return "Transfer";
      default:
        return type;
    }
  };

  const getStatusIcon = (status: "completed" | "processing" | "failed") => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const addComment = () => {
    if (newComment.trim() === "") return;

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      text: newComment,
      user: {
        name: "Current User", // This would typically come from your auth system
        avatar: "/avatars/current-user.png",
      },
      timestamp: `Today at ${formattedHours}:${formattedMinutes} ${ampm}`,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const startEditingComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const saveEditedComment = (commentId: string) => {
    if (editText.trim() === "") return;

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            text: editText,
            edited: true,
          }
        : comment
    );

    setComments(updatedComments);
    setEditingCommentId(null);
    setEditText("");
  };

  const deleteComment = (commentId: string) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="sticky top-0 z-10 bg-background px-6 pt-6 pb-4 border-b shadow-sm flex flex-row items-center justify-between">
          <DialogTitle>Transaction Details</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="overflow-y-auto p-6 flex-1">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(transaction.type)}
                          <div>
                            <h3 className="text-lg font-semibold">
                              {getTypeText(transaction.type)} Transaction
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {transaction.id}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "processing"
                              ? "outline"
                              : "destructive"
                          }
                          className="flex items-center gap-1"
                        >
                          {getStatusIcon(transaction.status)}
                          <span>
                            {transaction.status === "completed"
                              ? "Completed"
                              : transaction.status === "processing"
                              ? "Processing"
                              : "Failed"}
                          </span>
                        </Badge>
                      </div>

                      {transaction.flagged && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-800">Flagged Transaction</p>
                              <p className="text-sm text-amber-700">
                                {transaction.flagReason || "This transaction has been flagged for review."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">
                              Amount
                            </div>
                            <div className="text-2xl font-bold">
                              {transaction.amount}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">
                              Fee
                            </div>
                            <div className="text-2xl font-bold">
                              {transaction.fee}
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Transaction Details
                          </div>
                          <div className="grid grid-cols-2 gap-y-2">
                            <div className="text-sm text-muted-foreground">
                              Date
                            </div>
                            <div className="text-sm">{transaction.date}</div>

                            <div className="text-sm text-muted-foreground">
                              Payment Method
                            </div>
                            <div className="text-sm">{transaction.method}</div>

                            <div className="text-sm text-muted-foreground">
                              Currency
                            </div>
                            <div className="text-sm">{transaction.currency}</div>

                            <div className="text-sm text-muted-foreground">
                              Account Type
                            </div>
                            <div className="text-sm">
                              {transaction.subAccountType}
                            </div>

                            <div className="text-sm text-muted-foreground">
                              Account ID
                            </div>
                            <div className="text-sm">
                              {transaction.subAccountId}
                            </div>

                            <div className="text-sm text-muted-foreground">
                              Reference
                            </div>
                            <div className="text-sm font-mono text-xs">
                              {transaction.reference}
                            </div>

                            {transaction.prepaidCard && (
                              <>
                                <div className="text-sm text-muted-foreground">
                                  Prepaid Card
                                </div>
                                <div className="text-sm">
                                  <div className="flex items-center">
                                    {transaction.prepaidCard.type === "physical" ? 
                                      <CreditCard className="h-4 w-4 mr-1 text-primary" /> : 
                                      <Globe className="h-4 w-4 mr-1 text-primary" />
                                    }
                                    <span className="font-medium">{transaction.prepaidCard.name}</span>
                                  </div>
                                  <div className="text-xs font-mono mt-1">{transaction.prepaidCard.number}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Card ID: {transaction.prepaidCard.id}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Customer Information
                          </div>
                          <div className="grid grid-cols-2 gap-y-2">
                            <div className="text-sm text-muted-foreground">
                              Name
                            </div>
                            <div className="text-sm">{transaction.customer}</div>

                            <div className="text-sm text-muted-foreground">
                              Email
                            </div>
                            <div className="text-sm">{transaction.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-1/3 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Transaction Timeline
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          <div className="h-full w-0.5 bg-green-500"></div>
                        </div>
                        <div>
                          <div className="font-medium">
                            Transaction Initiated
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {transaction.date.split(" ")[0]}
                            <Clock className="h-3 w-3 ml-2 mr-1" />
                            {transaction.date.split(" ")[1]}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          <div className="h-full w-0.5 bg-green-500"></div>
                        </div>
                        <div>
                          <div className="font-medium">Payment Processing</div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {transaction.date.split(" ")[0]}
                            <Clock className="h-3 w-3 ml-2 mr-1" />
                            {transaction.date.split(" ")[1]}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-6 w-6 rounded-full ${
                              transaction.status === "completed"
                                ? "bg-green-500"
                                : transaction.status === "processing"
                                ? "bg-amber-500"
                                : "bg-red-500"
                            } flex items-center justify-center text-white`}
                          >
                            {transaction.status === "completed" ? (
                              <CheckIcon className="h-4 w-4" />
                            ) : transaction.status === "processing" ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <XIcon className="h-4 w-4" />
                            )}
                          </div>
                          <div
                            className={`h-full w-0.5 ${
                              transaction.status === "completed"
                                ? "bg-green-500"
                                : transaction.status === "processing"
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <div className="font-medium">
                            {transaction.status === "completed"
                              ? "Transaction Completed"
                              : transaction.status === "processing"
                              ? "Awaiting Confirmation"
                              : "Transaction Failed"}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {transaction.date.split(" ")[0]}
                            <Clock className="h-3 w-3 ml-2 mr-1" />
                            {transaction.date.split(" ")[1]}
                          </div>
                        </div>
                      </div>

                      {transaction.status === "completed" && (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                              <CheckIcon className="h-4 w-4" />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">Funds Available</div>
                            <div className="text-sm text-muted-foreground flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {transaction.date.split(" ")[0]}
                              <Clock className="h-3 w-3 ml-2 mr-1" />
                              {transaction.date.split(" ")[1]}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Actions</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Receipt
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Transaction
                      </Button>
                      {transaction.status === "failed" && (
                        <Button className="w-full justify-start">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Retry Transaction
                        </Button>
                      )}
                      {transaction.status === "processing" && (
                        <Button
                          variant="destructive"
                          className="w-full justify-start"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Transaction
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Report Suspicious Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Security Analysis Card */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Security Analysis
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Device</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.device}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">IP Address</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.ipAddress}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-500"
                    >
                      Low Risk
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Transaction risk assessment
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Transaction Notes</h3>
                </div>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <Avatar>
                        <AvatarImage
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                        <AvatarFallback>
                          {comment.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">{comment.user.name}</div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">
                              {comment.timestamp}
                              {comment.edited && (
                                <span className="ml-1">(edited)</span>
                              )}
                            </div>

                            {/* Comment actions dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => startEditingComment(comment)}
                                >
                                  <Edit2 className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteComment(comment.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {editingCommentId === comment.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="min-h-[100px] text-sm"
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEditingComment}
                                className="h-8"
                              >
                                <XIcon className="mr-2 h-3 w-3" />
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => saveEditedComment(comment.id)}
                                className="h-8"
                              >
                                <CheckIcon className="mr-2 h-3 w-3" />
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm">{comment.text}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 items-end mt-4">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a note about this transaction..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-20"
                    />
                  </div>
                  <Button onClick={addComment} className="px-3">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send comment</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper components for icons
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
