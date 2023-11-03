import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButtonIssue from "../edit/components/EditButtonIssue";
import DeleteButtonIssue from "../edit/components/DeleteButtonIssue";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
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
      <Box>
        <Flex height="2" direction={"column"} gap="4">
          <EditButtonIssue issueId={issue.id}/>
          <DeleteButtonIssue issueId={issue.id} />
        </Flex>
      </Box> 
    </Grid>
  );
};

export default IssueDetailPage;
