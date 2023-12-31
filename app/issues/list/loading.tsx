import React from 'react'
import { Table } from "@radix-ui/themes"
import IssueAction from './IssueAction'
import { Skeleton } from '@/app/components'


const LoadingIssues = () => {
 
  const issues = [1, 2, 3, 4, 5]



  return (
    <>
    <IssueAction/>
    <Table.Root variant='surface'>
    <Table.Header>
      <Table.Row>
        <Table.Cell>Nom du ticket</Table.Cell>
        <Table.Cell className='hidden md:table-cell'>Status du ticket</Table.Cell>
        <Table.Cell className='hidden md:table-cell'>Créé le</Table.Cell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        issues.map((issue) => (
          <Table.Row key={issue}>
            <Table.Cell>
                <Skeleton/>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
            <Skeleton/>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
                <Skeleton/>
            </Table.Cell>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table.Root>
    </>
  )
}

export default LoadingIssues