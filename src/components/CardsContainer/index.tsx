import { Flex } from "@chakra-ui/react";

interface ICardsContainer {
  children?: any;
  w?: any;
  h?: any;
}

export default function CardsContainer({children, w, h}: ICardsContainer) {
  return (
    <Flex 
      flexDir='row'
      padding="8"
      bgGradient='to-r'
      gradientFrom='gray.200'
      gradientTo='gray.500'
      // gradientFrom='rgba(0, 34, 255, 0.2)'
      // gradientTo='rgba(221, 0, 255, 0.5)'
      // height='min-content'
      borderRadius={15}
      borderWidth={3}
      borderColor='blue.600'
      w={w ? w : 'full'}
      height={h ? h : '15%'}
    >
      {children}
    </Flex>
  )
}