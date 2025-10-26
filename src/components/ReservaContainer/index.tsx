import { Flex } from "@chakra-ui/react";

interface ICardsContainer {
  children?: any;
  w?: any;
  h?: any;
}

export default function ReservaContainer({children, w, h}: ICardsContainer) {
  return (
    <Flex 
      flexDir='row'
      padding="8"
      bgGradient='to-bl'
      gradientFrom='black'
      gradientTo='red.700'
      borderRadius={15}
      borderWidth={3}
      borderColor='blue.600'
      w={w ? w : 'full'}
      height={h ? h : '100%'}
    >
      {children}
    </Flex>
  )
}