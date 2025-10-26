import Botao from "@/components/botao/botao";
import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SlotAtt({ id, value }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Flex
      ref={setNodeRef}
      align="center"
      justify="center"
      bg={isOver ? "green.300" : "rgba(0,0,0,0.3)"}
      borderRadius={100}
      w="150px"
      h="150px"
      borderWidth={5}
      borderColor={value ? "green.400" : "gray.500"}
      transition="0.2s"
    >
      {value ? (
        <Flex
          bg="red.500"
          borderRadius={100}
          w="100px"
          h="100px"
          align="center"
          justify="center"
        >
          <Text>{value}</Text>
        </Flex>
      ) : null}
    </Flex>
  );
}

function DraggableCard({ id }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Flex
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      w="100%"
      h="100%"
      bg="red.500"
      borderRadius={15}
      cursor="grab"
      align="center"
      justify="center"
    >
      <Text>{id}</Text>
    </Flex>
  );
}


type IMapa = 'NÚCLEO' | 'DESERTO' | 'OCEANO' | 'PLANÍCIE' | 'VULCÃO' | 'CAMPO NEVADO';

interface ICompMapa {
  titulo?: IMapa;
  selecionar?: any;
  selecionado?: boolean;
}

const CompMapa: React.FC<ICompMapa> = ({titulo, selecionar, selecionado}) => {
  return (
    <Flex  zIndex={1} flexDir='column' cursor="pointer" onClick={() => selecionar(titulo)}>
      <Text fontSize={18} textAlign='center' justifySelf='center' color="white">
        {titulo}
      </Text>
      <Flex 
        bg={selecionado ? 'limegreen' : "rgba(0,0,0,0.5)"} 
        justify="center" 
        px="4" 
        py="2" 
        borderRadius={15}
      >
        <Flex bg="blue.200" w="full" h="100px" />
      </Flex>
    </Flex>
  )
}

type ITelas = 'deck_jogador' | 'deck_oponente' | 'mapa';
type IAtributo = 'pyrus' | 'subterra' | 'haos' | 'darkus' | 'aquos' | 'ventus' | null;

interface IDeck {
  slot1: IAtributo;
  slot2: IAtributo;
  slot3: IAtributo;
};

export default function Jogador() {
  const navigate = useNavigate();
  const [tela, setTela] = useState<ITelas>('deck_jogador')
  const mapas = ['NÚCLEO', 'DESERTO', 'OCEANO', 'PLANÍCIE', 'VULCÃO', 'CAMPO NEVADO'];
  const [mapaSelecionado, setMapaSelecionado] = useState('');

  const atributos: {id: IAtributo}[] = [
    { id: "pyrus" },
    { id: "subterra" },
    { id: "haos" },
    { id: "darkus" },
    { id: "aquos" },
    { id: "ventus" },
  ];
  
  const [deckJogador, setDeckJogador] = useState<IDeck>({
    slot1: null,
    slot2: null,
    slot3: null,
  });

  function handleDragEndJogador(event) {
    const { over, active } = event;
    if (over) {
      // Coloca o item no slot correspondente
      setDeckJogador((prev) => ({
        ...prev,
        [over.id]: active.id,
      }));
    }
  }

  const [deckOponente, setDeckOponente] = useState<IDeck>({
    slot1: null,
    slot2: null,
    slot3: null,
  });

  function handleDragEndOponente(event) {
    const { over, active } = event;
    if (over) {
      // Coloca o item no slot correspondente
      setDeckOponente((prev) => ({
        ...prev,
        [over.id]: active.id,
      }));
    }
  }

  const battleData = {
    deckJogador: deckJogador,
    deckOponente: deckOponente,
    mapa: mapaSelecionado,
  }
  
  const handleIrBatalha = () => {
    navigate('/batalha', {state: {dados: battleData}})
  }

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
              <DndContext onDragEnd={handleDragEndJogador}>
                <Flex flexDir="row" justify="space-between" px="10" my="10" flex="1">
                  <Flex bg="rgba(0,0,0,0.5)" px="70px" py="30px" borderRadius={15} w="60%" justify="space-between" align="center" h="100%">
                    <SlotAtt id="slot1" value={deckJogador.slot1} />
                    <SlotAtt id="slot2" value={deckJogador.slot2} />
                    <SlotAtt id="slot3" value={deckJogador.slot3} />
                  </Flex>
                  <Flex w="20px" />
                  <SimpleGrid columns={2} gridGap={10} w="35%" p="10px">
                    {atributos.map((item) => (
                      <DraggableCard key={item.id} id={item.id} />
                    ))}
                  </SimpleGrid>
                </Flex>
              </DndContext>
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
             <DndContext onDragEnd={handleDragEndOponente}>
                <Flex flexDir="row" justify="space-between" px="10" my="10" flex="1">
                  <Flex bg="rgba(0,0,0,0.5)" px="70px" py="30px" borderRadius={15} w="60%" justify="space-between" align="center" h="100%">
                    <SlotAtt id="slot1" value={deckOponente.slot1} />
                    <SlotAtt id="slot2" value={deckOponente.slot2} />
                    <SlotAtt id="slot3" value={deckOponente.slot3} />
                  </Flex>
                  <Flex w="20px" />
                  <SimpleGrid columns={2} gridGap={10} w="35%" p="10px">
                    {atributos.map((item) => (
                      <DraggableCard key={item.id} id={item.id} />
                    ))}
                  </SimpleGrid>
                </Flex>
              </DndContext>
              <Flex justify="flex-end" mb="20px" mr="50px">
                <Botao texto="escolher campo" p="40px" acao={() => setTela('mapa')}/>
              </Flex>
            </Flex>
          )}

          {tela === 'mapa' && (
            <Flex w="100%" flexDir="column">
              <Flex flexDir="row" align="center">
                <ChevronLeft size={100} color="white" cursor="pointer" onClick={() => {
                  setTela('deck_oponente')
                }} />
                <Heading color="white" fontSize={50} w="90%" alignSelf="center" textAlign="center">
                  Selecionar Campo de Batalha
                </Heading>
              </Flex>
              <SimpleGrid columns={6} px="4" gridGap={4}>
                {mapas.map(mapa => {
                  return (
                    <CompMapa titulo={mapa} selecionar={(e) => setMapaSelecionado(e)} selecionado={mapa === mapaSelecionado} />
                  )
                })}
              </SimpleGrid>
              <Flex justify="flex-end" align="flex-end" mb="20px" mr="50px" flex="1">
                <Botao texto="batalhar" p="40px" acao={() => handleIrBatalha()}/>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}