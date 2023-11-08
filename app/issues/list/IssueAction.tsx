import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueAction = () => {
  return (
    <Flex mb="5" justify="between">
        <IssueStatusFilter/>
        <Button className='mb-5'><Link href="/issues/new">Add new issue</Link></Button>
    </Flex>
  )
}

export default IssueAction