import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

export const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green'}> = {
    "OPEN" : { label: "ouvert", color: "green"},
    "IN_PROGRESS" : { label: "en cours", color: "violet"},
    "CLOSED" : { label: "terminé", color: "red"},
}
 
const IssueStatusBadge = ({ status } : { status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge