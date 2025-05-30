"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ExportButton() {
  const handleExport = (format: string) => {
    // TODO: Implement export functionality for each format
    console.log(`Exporting in ${format} format`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("chart")}>
          Export as Chart Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("table")}>
          Export as Table
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("txt")}>
          Export as TXT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 