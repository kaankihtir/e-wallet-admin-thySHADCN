"use client"

import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Table } from "lucide-react"

interface TCMBReportsProps {
  dateRange: DateRange | undefined
}

export function TCMBReports({ dateRange }: TCMBReportsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Daily Report</h4>
              <p className="text-xs text-muted-foreground">
                Daily transaction and user statistics
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Weekly Report</h4>
              <p className="text-xs text-muted-foreground">
                Weekly aggregated statistics
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Monthly Report</h4>
              <p className="text-xs text-muted-foreground">
                Monthly aggregated statistics
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Custom Report</h4>
              <p className="text-xs text-muted-foreground">
                Generate report for selected date range
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Transaction Details</h4>
              <p className="text-xs text-muted-foreground">
                Detailed transaction records
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Table className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">User Statistics</h4>
              <p className="text-xs text-muted-foreground">
                User demographics and activity
              </p>
            </div>
            <Button variant="outline" size="icon">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-2">Report Format Options</h4>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="excel" className="rounded border-gray-300" />
            <label htmlFor="excel">Excel (.xlsx)</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="csv" className="rounded border-gray-300" />
            <label htmlFor="csv">CSV (.csv)</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="txt" className="rounded border-gray-300" />
            <label htmlFor="txt">Text (.txt)</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="pdf" className="rounded border-gray-300" />
            <label htmlFor="pdf">PDF (.pdf)</label>
          </div>
        </div>
      </div>
    </div>
  )
} 