'use client'

import { CrossCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const DeleteButtonIssue = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root >
      <AlertDialog.Trigger>
        <Button color="red" className="cursor-pointer">
          <CrossCircledIcon />
          Supprimer ce ticket
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Supprimer ce ticket</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Êtes-vous sûr de vouloir supprimer ce ticket
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Annuler
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Supprimer ce ticket
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButtonIssue;
