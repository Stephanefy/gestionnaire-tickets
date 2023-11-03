import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditButtonIssue = ({ issueId } : { issueId : number}) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Éditer le ticket</Link>
    </Button>
  );
};

export default EditButtonIssue;
