import { ForwardedRef, forwardRef } from 'react'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import SelectStatus from './SelectStatus'
import { Issue } from '@prisma/client'

interface Props {
    control: Control,
    name: "status",
    issue: Issue
}

const WrapperSelect = (props: Props) => {
  return (
    <Controller
        control={props.control}
        name={props.name}
        render={({field: { onChange, value, ref, ...props }}) => (
            <SelectStatus 
            //@ts-ignore
            issue={props.issue}
            onValueChange={onChange}
            value={value}
            forwardedRef={ref}
            />
        )}
    />
  )
}

export default WrapperSelect