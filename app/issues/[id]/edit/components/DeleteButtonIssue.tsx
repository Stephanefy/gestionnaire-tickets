import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteButtonIssue = ({ issueId } : { issueId: number }) => {
  return (
    <Button color='red'>
        <CrossCircledIcon/>
        Supprimer ce ticket
    </Button>
  )
}

export default DeleteButtonIssue