import Botao from "@/components/botao/botao";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex w="100%" h="100vh" flexDir="column" justify="center" align="center">
      <Heading>Página não encontrada</Heading>
      <Botao texto="INICIO" w="200px" acao={() => navigate('/')} />
    </Flex>
  )
}