import { Status } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}




const  IssueSummary = ({ open, inProgress, closed}: Props) => {



    const containers: {
        label: string,
        value: number,
        status: Status
    }[] = [
        {label: "Tickets ouverts", value: open, status: "OPEN"},
        {label: "Tickets en cours", value: inProgress, status: "IN_PROGRESS"},
        {label: "Tickets terminés", value: closed, status: "OPEN"}
    ]

 
  return (
    <Flex gap="4">
        {containers.map((container) => (
            <Card key={container.label}>
                <Flex direction="column" gap="1">
                    <Link className="text-sm font-medium" href={`/issues/list?status=${container.status}`}>{container.label}</Link>
                    <Text size="5" className="font-bold">{container.value}</Text>
                </Flex>
            </Card>
        ))}
    </Flex>  
  )
}

export default IssueSummary