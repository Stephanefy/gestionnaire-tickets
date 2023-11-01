import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Heading, Text, Flex, Card } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'

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

  await delay(2000)


  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex gap={"3"} my="2">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.description}</Text>
        </Flex>
        <Card className='prose' mt="4">
            <ReactMarkdown>{issue.createdAt.toLocaleDateString()}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetailPage