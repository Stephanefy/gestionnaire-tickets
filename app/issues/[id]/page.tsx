import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButtonIssue from "../edit/components/EditButtonIssue";
import DeleteButtonIssue from "../edit/components/DeleteButtonIssue";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex height="2" direction={"column"} gap="4">
            <AssigneeSelect issue={issue}/>
            <EditButtonIssue issueId={issue.id} />
            <DeleteButtonIssue issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({params}: Props) {

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  return {
    title: issue?.title,
    description: "Détails du ticket" + issue?.id
  }
} 



export default IssueDetailPage;
