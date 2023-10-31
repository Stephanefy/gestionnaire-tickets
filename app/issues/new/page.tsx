"use client";

import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { creatIsueeSchema } from "@/app/validationsSchema";
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof creatIsueeSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(creatIsueeSchema)
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("an unexpected error occurred");
          }
        })}
      >
        <TextField.Root className="mb-5">
          <TextField.Input placeholder="title" {...register("title")} />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
