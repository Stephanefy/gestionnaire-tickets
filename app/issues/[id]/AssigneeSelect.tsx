"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useUsers();

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         const {data} = await axios.get<User[]>('/api/users')
  //         setUsers(data)
  //     }

  //     fetchUsers()
  // },[])
  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    axios.patch("/api/issues/" + issue.id, {
    assignedToUserId: userId === "unassigned" ? null : userId
    }).catch(() => {
        toast.error("le changement n'a pu être sauvegardé")
    });
    toast.success("changement effectué avec succès")
}

  return (
    <>
        <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue} 
        >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
            <Select.Group>
            <Select.Label>Suggestion s</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                {user.name}
                </Select.Item>
            ))}
            </Select.Group>
        </Select.Content>
        </Select.Root>
        <Toaster/>
    </>
  );
};

const useUsers = () => useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssigneeSelect;
