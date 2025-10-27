import Botao from "@/components/botao/botao";
import CardsContainer from "@/components/CardsContainer";
import ReservaContainer from "@/components/ReservaContainer";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Dice2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { IAtributo } from "../Selecoes/Jogador";

const Bakugan = (atributo) => {
  const atributos = {
    pyrus: 'red',
    subterra: 'rgba(88, 28, 0, 1)',
    haos: 'white',
    darkus: 'black',
    aquos: 'blue',
    ventus: 'limegreen',
    null: 'rgba(0,0,0,0)'
  }
  console.log(atributo)

  return (
    <Flex w="100%" justify='center' align="center">
      <Flex w="70px" h="70px" borderRadius={100} bg={atributos[atributo.atributo || 'null']} borderWidth={3} borderColor='blue.700'/> 
    </Flex>
  )
}

export default function VsPlayer() {
  const location = useLocation();
  const dadosBatalha = location.state.dados;
  console.log(dadosBatalha.deckJogador);

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const handleRandomJogador = () => {
    const num = Math.random();
    if (num > 0.5) {
      alert('Jogador 1');
    } else {
      alert('Jogador 2');
    }
  }

  return (
    <Flex h="100vh">
      <Flex
        backgroundImage="linear-gradient(to right, 
        #000000,
        #440030, 
        #150720, 
        #1d2235, 
        #150720, 
        #150720, 
        #440030, 
        #150720, 
        #150720, 
        #1d2235, 
        #000000,
        #440030, 
        #000000
        )"
        w="100%"
        h="100%"
        position="absolute"
        zIndex={1}
      />
      <Flex
        zIndex={2}
        w="100%"
        h="90%"
        p="15px"
      >

        {/* JOGADOR 1 */}
        <Flex w="23%" flexDir='column' h="90%">
          <CardsContainer>
            <SimpleGrid columns={3} w="100%" marginTop={-3}>
            {
            Object.keys(dadosBatalha.deckJogador).map(chave => {
              return (
                <Bakugan keys={chave} atributo={dadosBatalha.deckJogador[chave]} />
              )
            })
            }
            </SimpleGrid>
          </CardsContainer>
          <Text color='white'>Gate Cards</Text>
          <CardsContainer>
            <Text>teste</Text>
            <Text>teste</Text>
            <Text>teste</Text>
          </CardsContainer>
          <Text color='white'>Ability Cards</Text>
          <CardsContainer>
            <Text>teste</Text>
            <Text>teste</Text>
            <Text>teste</Text>
          </CardsContainer>
          <Flex flexDir='row' justify='space-between' h="100%">
            <Flex flexDir='column' w="49%">
              <Text color='white'>Bakugans</Text>
              <ReservaContainer>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
              </ReservaContainer>
            </Flex>
            <Flex flexDir='column' w="49%">
              <Text color='white'>Ability Cards</Text>
              <ReservaContainer>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
              </ReservaContainer>
            </Flex>
          </Flex>
        </Flex> 

        {/* ARENA */}
        <Flex 
          w="54%" 
          flexDir='column' 
          h="90%" 
        >
          <Flex px="4" mb="4">

            <Flex w="33%" justify="center">
              <Botao texto='pausar' />
            </Flex>

            <Flex w="33%" justify="center">
              <Flex bgGradient='to-r' gradientFrom='yellow.500' gradientTo='orange.500' p={2} borderRadius={15} cursor='pointer'
                onClick={handleRandomJogador}
                justifySelf='center'
                alignSelf='center'
                >
                <Dice2 color="white" size={28}/>
              </Flex>
            </Flex>

            <Flex w="33%" justify="center">
              <Botao texto='resetar' />
            </Flex>

          </Flex>
          <Flex justify='center' px="10" h="100%">
            <SimpleGrid columns={6} w="100%" h="100%">
              {nums.map(num => {
                return (
                  <Flex bg="rgba(255,255,255,0.5)" borderWidth={2} borderColor='black' justifyContent='center' align="center">
                    <Text>{num}</Text>
                  </Flex>
                )
              })}
            </SimpleGrid>
          </Flex>
        </Flex>

        {/* JOGADOR 2 */}
        <Flex w="23%" flexDir='column' h="90%">
            <CardsContainer>
              <SimpleGrid columns={3} w="100%" marginTop={-3}>
              {
              Object.keys(dadosBatalha.deckOponente).map(chave => {
                return (
                  <Bakugan keys={chave} atributo={dadosBatalha.deckOponente[chave]} />
                )
              })
              }
              </SimpleGrid>
            </CardsContainer>
          <Text color='white'>Gate Cards</Text>
          <CardsContainer>
            <Text>teste</Text>
            <Text>teste</Text>
            <Text>teste</Text>
          </CardsContainer>
          <Text color='white'>Ability Cards</Text>
          <CardsContainer>
            <Text>teste</Text>
            <Text>teste</Text>
            <Text>teste</Text>
          </CardsContainer>
          <Flex flexDir='row' justify='space-between' h="100%">
            <Flex flexDir='column' w="49%">
              <Text color='white'>Bakugans</Text>
              <ReservaContainer>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
              </ReservaContainer>
            </Flex>
            <Flex flexDir='column' w="49%">
              <Text color='white'>Ability Cards</Text>
              <ReservaContainer>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
              </ReservaContainer>
            </Flex>
          </Flex>
        </Flex>

      </Flex>
    </Flex>
  )
}