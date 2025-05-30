import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Eye, Edit, Shield, UserCog, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type AdminAction = {
  id: string;
  adminId: string;
  adminName: string;
  actionType: "view" | "edit" | "status_change" | "export" | "approve" | "reject";
  section: "overview" | "kyc" | "wallet" | "transactions" | "security" | "login_history" | "all";
  details: string;
  timestamp: string;
};

// Mock admin action logs
const mockAdminLogs: AdminAction[] = [
  {
    id: "log-001",
    adminId: "ADM123",
    adminName: "Sarah Johnson",
    actionType: "view",
    section: "overview",
    details: "Viewed customer overview",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: "log-002",
    adminId: "ADM456",
    adminName: "Michael Chen",
    actionType: "edit",
    section: "kyc",
    details: "Updated customer KYC information",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-003",
    adminId: "ADM789",
    adminName: "Emma Davis",
    actionType: "status_change",
    section: "wallet",
    details: "Changed wallet status from 'limited' to 'active'",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-004",
    adminId: "ADM123",
    adminName: "Sarah Johnson",
    actionType: "view",
    section: "transactions",
    details: "Viewed customer transactions",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-005",
    adminId: "ADM456",
    adminName: "Michael Chen",
    actionType: "status_change",
    section: "kyc",
    details: "Changed KYC status from 'pending' to 'verified'",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-006",
    adminId: "ADM789",
    adminName: "Emma Davis",
    actionType: "view",
    section: "security",
    details: "Viewed security settings",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-007",
    adminId: "ADM123",
    adminName: "Sarah Johnson",
    actionType: "export",
    section: "all",
    details: "Exported customer data",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-008",
    adminId: "ADM321",
    adminName: "Alex Thompson",
    actionType: "approve",
    section: "kyc",
    details: "Approved customer KYC documents",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-009",
    adminId: "ADM654",
    adminName: "Jessica Rivera",
    actionType: "reject",
    section: "kyc",
    details: "Rejected passport document - poor image quality",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-010",
    adminId: "ADM987",
    adminName: "Daniel Lee",
    actionType: "view",
    section: "login_history",
    details: "Viewed login history",
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export function CustomerAdminLogs({ customerId }: { customerId: string }) {
  // In a real app, you would fetch admin logs from an API
  // For now we'll use mock data
  const [logs, setLogs] = useState<AdminAction[]>(mockAdminLogs);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [adminFilter, setAdminFilter] = useState<string>("");
  
  // Get filtered logs
  const filteredLogs = logs.filter(log => {
    return (actionFilter === "all" || log.actionType === actionFilter) &&
           (sectionFilter === "all" || log.section === sectionFilter) &&
           (adminFilter === "" || 
            log.adminName.toLowerCase().includes(adminFilter.toLowerCase()) || 
            log.adminId.toLowerCase().includes(adminFilter.toLowerCase()));
  });

  // Function to get appropriate icon for action type
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "view":
        return <Eye className="h-4 w-4" />;
      case "edit":
        return <Edit className="h-4 w-4" />;
      case "status_change":
        return <Shield className="h-4 w-4" />;
      case "export":
        return <Activity className="h-4 w-4" />;
      case "approve":
      case "reject":
        return <UserCog className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  // Function to get badge style based on action type
  const getActionBadgeStyle = (actionType: string) => {
    switch (actionType) {
      case "view":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case "edit":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
      case "status_change":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400";
      case "export":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "approve":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "reject":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Function to get section badge style
  const getSectionBadgeStyle = (section: string) => {
    switch (section) {
      case "overview":
        return "bg-gray-100 text-gray-800";
      case "kyc":
        return "bg-indigo-100 text-indigo-800";
      case "wallet":
        return "bg-green-100 text-green-800";
      case "transactions":
        return "bg-blue-100 text-blue-800";
      case "security":
        return "bg-purple-100 text-purple-800";
      case "login_history":
        return "bg-amber-100 text-amber-800";
      case "all":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to format section name
  const formatSectionName = (section: string) => {
    switch (section) {
      case "login_history":
        return "Login History";
      case "all":
        return "All Sections";
      default:
        return section.charAt(0).toUpperCase() + section.slice(1);
    }
  };

  // Function to format action type
  const formatActionType = (actionType: string) => {
    switch (actionType) {
      case "status_change":
        return "Status Change";
      default:
        return actionType.charAt(0).toUpperCase() + actionType.slice(1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <UserCog className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Admin Action Logs</h3>
      </div>

      {/* Filters */}
      <div className="bg-muted/30 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-medium">Filter Logs</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Action Type</label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="status_change">Status Change</SelectItem>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Section</label>
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="kyc">KYC</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
                <SelectItem value="transactions">Transactions</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="login_history">Login History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Admin</label>
            <Input 
              placeholder="Search by admin name or ID" 
              value={adminFilter} 
              onChange={(e) => setAdminFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{logs.filter(l => l.actionType === "view").length}</div>
          <div className="text-sm text-muted-foreground">Views</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{logs.filter(l => l.actionType === "edit" || l.actionType === "status_change").length}</div>
          <div className="text-sm text-muted-foreground">Edits & Changes</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{logs.filter(l => l.actionType === "approve" || l.actionType === "reject").length}</div>
          <div className="text-sm text-muted-foreground">Approvals/Rejections</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{new Set(logs.map(l => l.adminId)).size}</div>
          <div className="text-sm text-muted-foreground">Unique Admins</div>
        </div>
      </div>

      {/* Logs Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{log.adminName}</div>
                  <div className="text-xs text-muted-foreground">ID: {log.adminId}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" 
                    className={`flex items-center gap-1 ${getActionBadgeStyle(log.actionType)}`}
                  >
                    {getActionIcon(log.actionType)}
                    <span>{formatActionType(log.actionType)}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" 
                    className={getSectionBadgeStyle(log.section)}
                  >
                    {formatSectionName(log.section)}
                  </Badge>
                </TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No admin logs match your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 