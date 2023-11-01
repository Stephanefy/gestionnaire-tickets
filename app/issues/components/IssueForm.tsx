"use client";

import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { creatIsueeSchema } from "@/app/validationsSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Issue } from "@prisma/client";


const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false
})

type IssueFormData = z.infer<typeof creatIsueeSchema>;


const IssueForm = ({ issue }: { issue?: Issue}) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(creatIsueeSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
      try {
        setIsSubmitting(true);
        await axios.post("/api/issues", data);
        router.push("/issues");
      } catch (error) {
        setError("an unexpected error occurred");
        setIsSubmitting(false);
      }
    });
  ;

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <TextField.Root className="mb-5">
          <TextField.Input defaultValue={issue?.title} placeholder="title" {...register("title")} />
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
        <Button>Submit new issue {isSubmitting && <LoadingSpinner />}</Button>
      </form>
    </div>
  );
};

export default IssueForm;
