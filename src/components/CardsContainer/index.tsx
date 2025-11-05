import { Flex } from "@chakra-ui/react";

interface ICardsContainer {
  children?: any;
  w?: any;
  h?: any;
  p?: any;
}

export default function CardsContainer({children, w, h, p}: ICardsContainer) {
  return (
    <Flex 
      flexDir='row'
      padding={p ? p : '8'}
      bgGradient='to-r'
      gradientFrom='gray.200'
      gradientTo='gray.500'
      borderRadius={15}
      borderWidth={3}
      borderColor='blue.600'
      justify='center'
      align="center"
      w={w ? w : 'full'}
      height={h ? h : '15%'}
    >
      {children}
    </Flex>
  )
}