"use client";

import { CrossCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components";

const DeleteButtonIssue = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteIssue = async () => {
    try {
      setIsDeleting(true)
      await axios.delete("/api/issues/" + issueId);
      router.push("/");
      router.refresh();
    } catch (error) {
      setIsDeleting(false)
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red" className="cursor-pointer">
            <CrossCircledIcon />
            Supprimer ce ticket
            {isDeleting && <LoadingSpinner/>}
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
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Supprimer ce ticket
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Erreur</AlertDialog.Title>
          <AlertDialog.Description>
            Une erreur s&apos;est prodtuite lors de la suppresion de ce ticket
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={() => setError(false)}>
              Ok
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButtonIssue;
