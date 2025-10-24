import Botao from "@/components/botao/botao";
import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type IMapa = 'NÚCLEO' | 'DESERTO' | 'OCEANO' | 'PLANÍCIE' | 'VULCÃO' | 'CAMPO NEVADO';

interface ICompMapa {
  titulo?: IMapa
}

const CompMapa: React.FC<ICompMapa> = ({titulo}) => {
  return (
    <Flex w="250px" zIndex={1} flexDir='column'>
      <Text h="50px" fontSize={24} textAlign='center' justifySelf='center' color="white">
        {titulo}
      </Text>
      <Flex w="250px" h="250px" zIndex={2}   cursor="pointer"bg="blue.500" />
    </Flex>
  )
}

type ITelas = 'deck_jogador' | 'deck_oponente' | 'mapa';
type IAtributo = 'pyrus' | 'subterra' | 'haos' | 'darkus' | 'aquos' | 'ventus' | '';

interface IDeck {
  atributo1: IAtributo;
  atributo2: IAtributo;
  atributo3: IAtributo;
};

export default function Jogador() {
  const navigate = useNavigate();
  
  const [tela, setTela] = useState<ITelas>('deck_jogador')

  const deckJogador: IDeck = {
    atributo1: '',
    atributo2: '',
    atributo3: '',
  };

  const deck_oponente = {
    atributo1: '',
    atributo2: '',
    atributo3: '', 
  };

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
          {tela === 'deck_jogador' && (
            <Flex w="100%" flexDir="column">
              <Flex flexDir="row" align="center">
                <ChevronLeft size={100} color="white" cursor="pointer" onClick={() => {
                  navigate('/')
                }} />
                <Heading color="white" fontSize={50} w="90%" alignSelf="center" textAlign="center">
                  Selecionar Atributos: DECK JOGADOR
                </Heading>
              </Flex>
              <Flex flexDir="row" justify="space-between" px="10" my="10" flex="1">
                <Flex bg="rgba(0,0,0,0.5)" px="70px" py="30px" borderRadius={15} w="60%" justify="space-between" align="center" h="100%">
                  <Flex bg="red.500" borderRadius={100} w="150px" h="150px" borderWidth={5} />
                  <Flex bg="red.500" borderRadius={100} w="150px" h="150px" borderWidth={5} />
                  <Flex bg="red.500" borderRadius={100} w="150px" h="150px" borderWidth={5} />
                </Flex>
                <Flex w="20px" />
                <SimpleGrid columns={2} gridGap={10} w="35%" p="10px">
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                </SimpleGrid>
              </Flex>
              <Flex justify="flex-end" mb="20px" mr="50px">
                <Botao texto="deck oponente" p="40px" acao={() => setTela('deck_oponente')}/>
              </Flex>
            </Flex>
          )}

          {tela === 'deck_oponente' && (
            <Flex w="100%" flexDir="column">
              <Flex flexDir="row" align="center">
                <ChevronLeft size={100} color="white" cursor="pointer" onClick={() => {
                  setTela('deck_jogador')
                }} />
                <Heading color="white" fontSize={50} w="90%" alignSelf="center" textAlign="center">
                  Selecionar Atributos: DECK OPONENTE
                </Heading>
              </Flex>
              <Flex flexDir="row" justify="space-between" px="10" my="10" flex="1">
                <Flex bg="rgba(0,0,0,0.5)" px="70px" py="30px" borderRadius={15} w="60%" justify="space-between" align="center" h="100%">
                  <Flex bg="red.500" borderRadius={100} w="150px" h="150px" borderWidth={5} />
                  <Flex bg="red.500" borderRadius={100} w="150px" h="150px" borderWidth={5} />
                  <Flex bg="red.500" borderRadius={100} w="150px" h="150px" borderWidth={5} />
                </Flex>
                <Flex w="20px" />
                <SimpleGrid columns={2} gridGap={10} w="35%" p="10px">
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                  <Flex w="100%" h="100%" bg="red.500" borderRadius={15} />
                </SimpleGrid>
              </Flex>
              <Flex justify="flex-end" mb="20px" mr="50px">
                <Botao texto="escolher campo" p="40px" acao={() => setTela('mapa')}/>
              </Flex>
            </Flex>
          )}

          {tela === 'mapa' && (
            <Flex w="100%" flexDir="column">
              <Flex flexDir="row" align="center">
                <ChevronLeft size={100} color="white" cursor="pointer" onClick={() => {
                  setTela('deck_jogador')
                }} />
                <Heading color="white" fontSize={50} w="90%" alignSelf="center" textAlign="center">
                  Selecionar Mapa
                </Heading>
              </Flex>
              <Flex flexDir="row" justify="space-between" px="10" my="10" flex="1">
                <CompMapa titulo='NÚCLEO' />
                <CompMapa titulo='DESERTO' />
                <CompMapa titulo='OCEANO' />
                <CompMapa titulo='PLANÍCIE' />
                <CompMapa titulo='VULCÃO' />
                <CompMapa titulo='CAMPO NEVADO' />
              </Flex>
              <Flex justify="flex-end" mb="20px" mr="50px">
                <Botao texto="batalhar" p="40px" acao={() => setTela('mapa')}/>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}