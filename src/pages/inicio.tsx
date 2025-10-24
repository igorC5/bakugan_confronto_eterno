import Botao from "@/components/botao/botao"
import { AspectRatio, Box, Flex, Image, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function Inicio() {
  const navigate = useNavigate();

  return (
    <Flex h="100vh">
      <Image
        src="/public/Componentes Bakugan CE/Tela Inicial/arvore_gif.gif"
        alt="arvore"
        w="100%"
        h="100%"
        position="absolute"
        zIndex={1}
      />
      <Flex 
        zIndex={2}
        position="absolute"
        bottom={0}
        flexDir="column"
        padding={10}
        gridGap={15}
      >
        <Botao texto="BATALHAR" w="200%" h="60px" acao={() => {
          navigate('/selecao')
        }} />
        <Botao texto="CONFIGURAÇÕES" w="200%" h="60px" />
        {/* <Botao texto="SAIR" w="200%" h="60px" /> */}
      </Flex>
    </Flex>
  )
}

export default Inicio
