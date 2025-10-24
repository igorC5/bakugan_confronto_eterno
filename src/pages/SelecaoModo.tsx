import Botao from "@/components/botao/botao";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SelecaoModo() {
  const navigate = useNavigate();

  return (
    <Flex h="100vh">
      <Image
        src="/public/Componentes Bakugan CE/Tela Seleção Batalha/planicie.gif"
        alt="arvore"
        w="100%"
        h="100%"
        position="absolute"
        zIndex={1}
      />
      <Flex zIndex={2} flex="1" padding={50}>
        <Flex
          zIndex={2}
          bg="rgba(0,0,0,0.5)"
          w="100%"
          h="100%"
          flexDir="row"
        >
          <Flex w="50%" flexDir="row">
            <Flex flexDir="column">
              <Flex justify="center" h='min-content' align="center">
                <ChevronLeft size={100} color="white" cursor="pointer" onClick={() => {
                  navigate('/')
                }} />
                <Heading color="white" fontSize={50}>
                  Estilo de Batalha
                </Heading>
              </Flex>
              <Flex paddingLeft={15} flexDir="column" w="min-content" gridGap={5}>
                <Botao texto="batalhar sozinho" />
                <Botao texto="batalhar contra player" acao={() => navigate('/Jogador')} />
                <Botao texto="batalhar contra bot" />
              </Flex>
            </Flex>
          </Flex>
          <Flex bg="rgba(255,255,255,0.5)" w="5px" my="10px" borderRadius={5} />
          <Flex w="50%" p="20px" flexDir="column" justifyContent="space-evenly">
            <Flex flexDir="column">
              <Heading color="white" fontSize="3xl">
                <Text fontSize={20} color='tomato'>
                  em desenvolvimento*
                </Text>
                Batalhar sozinho:
              </Heading>
              <Text fontSize="xl" color="gray.100">
                É necessário que o jogador possua dois decks previamente montados para participar deste modo. O guerreiro será responsável por gerenciar ambos os decks ao longo da batalha.
              </Text>
            </Flex>
            <Flex flexDir="column">
              <Heading color="white" fontSize="3xl">
                Batalhar Contra Outro Player:
              </Heading>
              <Text fontSize="xl" color="gray.100">
                É necessário dois jogadores que possuam seu proprio deck para participar deste modo. assim uma batalha sera realizada com sucesso.
              </Text>
            </Flex>
            <Flex flexDir="column">
              <Heading color="white" fontSize="3xl">
                <Text fontSize={20} color='tomato'>
                  em desenvolvimento*
                </Text>
                Batalhar Contra Bot:
              </Heading>
              <Text fontSize="xl" color="gray.100">
                É necessário que o guerreiro possua seu próprio deck, além de três Bakugans e três cartas Portal, que servirão para representar os stands e as cartas do bot oponente. O guerreiro deverá selecionar qual bot enfrentar; cada bot possui seu deck previamente montado. Durante a batalha, o guerreiro deverá utilizar as opções de ações disponíveis para prosseguir até a conclusão do confronto.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}