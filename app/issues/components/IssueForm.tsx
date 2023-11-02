"use client";

import { IssueStatusBadge } from "@/app/components";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { issueSchema, statusSchema } from "@/app/validationsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Flex,
  TextField
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [issueStatus, setIssueStatus] = useState<Status>();

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const { control: controlStatus, handleSubmit: handleStatusSubmit } = useForm({
    resolver: zodResolver(statusSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);

    try {
      setIsSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.refresh()
      router.push("/issues");
    } catch (error) {
      setError("an unexpected error occurred");
      setIsSubmitting(false);
    }
  });


  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <Flex mb="2">
          {issue && (
            // <>
            //   <Box display="inline" ml="2">
            //     <WrapperSelect control={controlStatus} name="status" issue={issue}/>
            //   </Box>
            // </>
            <>
              <IssueStatusBadge status={issueStatus ? issueStatus : issue?.status} />
              <Box display="inline" ml="auto" className="space-x-2">
                <label htmlFor="open">open</label>
                <input
                  id="open"
                  {...register("status")}
                  type="radio"
                  value="OPEN"
                  onChange={(e) => setIssueStatus(Status.OPEN)  }
                />
                <label htmlFor="in_progress">in progress</label>

                <input
                  className=""
                  id="in_progress"
                  {...register("status")}
                  type="radio"
                  value="IN_PROGRESS"
                  onChange={(e) => setIssueStatus(Status.IN_PROGRESS)  }

                />
                <label htmlFor="closed">closed</label>

                <input
                  id="closed"
                  {...register("status")}
                  type="radio"
                  value="CLOSED"
                  onChange={(e) => setIssueStatus(Status.CLOSED) }
                />
              </Box>
            </>
          )}
        </Flex>
        <TextField.Root className="mb-5">
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}
        <Button>{issue ? "Éditer le ticket" : "Soumettre un nouveau ticket"} {isSubmitting && <LoadingSpinner />}</Button>
      </form>
    </div>
  );
};

export default IssueForm;
