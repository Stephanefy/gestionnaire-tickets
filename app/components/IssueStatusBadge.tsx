import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

export const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green'}> = {
    "OPEN" : { label: "open", color: "green"},
    "IN_PROGRESS" : { label: "in progress", color: "violet"},
    "CLOSED" : { label: "closed", color: "red"},
}
 
const IssueStatusBadge = ({ status } : { status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge