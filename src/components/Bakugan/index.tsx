import { Flex } from "@chakra-ui/react";


export default function Bakugan() {
  return (
    <Flex justifyContent='center' alignItems="center">
      <Flex w="50px" h='50px' borderRadius={100} bg="red" alignSelf='center' borderWidth={3} borderColor="blue.700"/>
    </Flex>
  )
}