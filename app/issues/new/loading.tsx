import React from 'react'
import { Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components'

const NewIssueLoading = () => {
  return (
    <Box className="max-w-xl">
        <Skeleton />
        <Skeleton height={"22rem"}/>
    </Box>
  )
}

export default NewIssueLoading