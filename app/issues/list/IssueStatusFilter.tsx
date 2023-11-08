'use client'

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "Sans filtre" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {

  const router = useRouter()

  const searchParams = useSearchParams()



  return (
    <Select.Root 
    defaultValue={searchParams.get('status') || ''} 
    onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status) params.append('status', status)
        if (searchParams.get('orderBy'))
            params.append('orderBy', searchParams.get('orderBy')!)
        searchParams.get('orderyBy')



        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/list' + query)
    }}>
      <Select.Trigger />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value ? status.value : "undefined"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
