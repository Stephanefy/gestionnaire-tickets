import { forwardRef } from "react"
import { Issue } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { RefCallBack } from "react-hook-form"

type Ref = HTMLButtonElement

// eslint-disable-next-line react/display-name
const SelectStatus = forwardRef<Ref, {issue: Issue, onValueChange: (...event: any[]) => void; value: any; forwardedRef: RefCallBack;}>((props, ref) => {
  return (
    <Select.Root  defaultValue={props.issue?.status}>
    <Select.Trigger ref={ref}/>
    <Select.Content position="popper">
      <Select.Item value="OPEN">Ouvert</Select.Item>
      <Select.Item value="IN_PROGRESS">En cours</Select.Item>
      <Select.Item value="CLOSED">Terminé</Select.Item>
    </Select.Content>
  </Select.Root>
  )
})

export default SelectStatus