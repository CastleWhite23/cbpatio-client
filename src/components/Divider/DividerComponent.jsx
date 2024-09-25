import React from 'react'
import { Divider } from "@chakra-ui/react";

const DividerComponent = ({margin, color = '#580AFF'}) => {
  return (
    <Divider border={`1px solid ${color}`} margin={margin} width={'auto'}/>
  )
}

export {DividerComponent}
