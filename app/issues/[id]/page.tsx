import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string}
}


const IssueDetailPage = async ({ params }: Props) => {

  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })

  if (!issue) {
    notFound()
  }


  return (
    <div>
        <h3>{issue.title}</h3>
        <p>{issue.status}</p>
        <p>{issue.description}</p>
        <p>{issue.createdAt.toLocaleDateString()}</p>
    </div>
  )
}

export default IssueDetailPage