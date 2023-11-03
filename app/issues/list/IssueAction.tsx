import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueAction = () => {
  return (
    <div className='mb-5'>
        <Button className='mb-5'><Link href="/issues/new">Add new issue</Link></Button>
    </div>
  )
}

export default IssueAction