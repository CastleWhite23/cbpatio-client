import React from 'react'
import { Divider } from "@chakra-ui/react";

const DividerComponent = ({margin}) => {
  return (
    <Divider border={"1px solid #580AFF"} margin={margin} width={'auto'}/>
  )
}

export {DividerComponent}
