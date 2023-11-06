import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueAction from './IssueAction'

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();



  return (
    <div>
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
              <Table.Row key={issue.id}>
                <Table.Cell>
                    <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                    </Link>
                    <div className='block md:hidden'><IssueStatusBadge status={issue.status}/></div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                    {issue.createdAt.toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = "force-dynamic";
// export const revalidate = 0

export default IssuesPage