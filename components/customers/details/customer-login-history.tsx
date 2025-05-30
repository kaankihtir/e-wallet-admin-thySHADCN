import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Laptop, MapPin, Shield } from "lucide-react";

type LoginRecord = {
  id: number;
  timestamp: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  status: "success" | "new_device" | "failed";
};

// Mock login history data
const mockLoginHistory: LoginRecord[] = [
  { 
    id: 1, 
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
    device: "iPhone 13", 
    browser: "Safari", 
    ipAddress: "192.168.1.123", 
    location: "Istanbul, Turkey", 
    status: "success" 
  },
  { 
    id: 2, 
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), 
    device: "MacBook Pro", 
    browser: "Chrome", 
    ipAddress: "192.168.1.123", 
    location: "Istanbul, Turkey", 
    status: "success" 
  },
  { 
    id: 3, 
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
    device: "Windows", 
    browser: "Edge", 
    ipAddress: "85.154.12.98", 
    location: "Ankara, Turkey", 
    status: "new_device" 
  },
  { 
    id: 4, 
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
    device: "Android", 
    browser: "Chrome", 
    ipAddress: "78.188.45.201", 
    location: "London, UK", 
    status: "failed" 
  },
  { 
    id: 5, 
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), 
    device: "iPhone 13", 
    browser: "Safari", 
    ipAddress: "192.168.1.123", 
    location: "Istanbul, Turkey", 
    status: "success" 
  },
];

export function CustomerLoginHistory({ customerId }: { customerId: string }) {
  // In a real app, you would fetch login history from an API
  // For now we'll use mock data
  const loginHistory = mockLoginHistory;

  // Function to get badge style based on login status
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "new_device":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Function to get human-readable status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Success";
      case "new_device":
        return "New Device";
      case "failed":
        return "Failed";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Login History</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{loginHistory.filter(l => l.status === "success").length}</div>
          <div className="text-sm text-muted-foreground">Successful Logins</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{loginHistory.filter(l => l.status === "new_device").length}</div>
          <div className="text-sm text-muted-foreground">New Devices</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{loginHistory.filter(l => l.status === "failed").length}</div>
          <div className="text-sm text-muted-foreground">Failed Attempts</div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Date & Time
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                <Laptop className="h-4 w-4 mr-2" />
                Device / Browser
              </div>
            </TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loginHistory.map((login) => (
            <TableRow key={login.id}>
              <TableCell className="font-medium">
                {new Date(login.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>{login.device} / {login.browser}</TableCell>
              <TableCell>{login.ipAddress}</TableCell>
              <TableCell>{login.location}</TableCell>
              <TableCell>
                <Badge variant="outline" 
                  className={getStatusBadgeStyle(login.status)}
                >
                  {getStatusText(login.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 