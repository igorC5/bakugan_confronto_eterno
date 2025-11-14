import Botao from "@/components/botao/botao";
import { Flex, Heading, Image, SimpleGrid, Text, Box } from "@chakra-ui/react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Caminhos corrigidos (o React acessa a pasta "public" direto da raiz do projeto)
const pyrusImg = '../../../public/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan pyrus.webp'
const aquosImg = '../../../public/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan aquos.webp'
const haosImg = '../../../public/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan haos.webp'
const darkusImg = '../../../public/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan darkus.webp'
const ventusImg = '../../../public/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan ventus.webp'
const subterraImg = '../../../public/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan subterra.webp'

const atributosImgs: Record<string, string> = {
  pyrus: pyrusImg,
  subterra: subterraImg,
  haos: haosImg,
  darkus: darkusImg,
  aquos: aquosImg,
  ventus: ventusImg,
};

function SlotAtt({ id, value }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Flex
      ref={setNodeRef}
      align="center"
      justify="center"
      bg={isOver ? "green.300" : "rgba(0,0,0,0.3)"}
      borderRadius="full"
      w={["90px", "120px", "150px"]}
      h={["90px", "120px", "150px"]}
      borderWidth={3}
      borderColor={value ? "green.400" : "gray.500"}
      transition="0.2s"
    >
      {value && (
        <Image
          src={atributosImgs[value]}
          alt={value}
          borderRadius="full"
          w={["70px", "90px", "110px"]}
          h={["70px", "90px", "110px"]}
          objectFit="cover"
        />
      )}
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
      h={["100px", "120px", "150px"]}
      borderRadius={15}
      cursor="grab"
      align="center"
      justify="center"
      bg="rgba(0,0,0,0.4)"
      _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
    >
      <Image
        src={atributosImgs[id]}
        alt={id}
        borderRadius={15}
        w="100%"
        h="100%"
        objectFit="cover"
      />
    </Flex>
  );
}

type IMapa = "NÚCLEO" | "DESERTO" | "OCEANO" | "PLANÍCIE" | "VULCÃO" | "CAMPO NEVADO" | "";

interface ICompMapa {
  titulo?: IMapa;
  selecionar?: any;
  selecionado?: boolean;
}

const CompMapa: React.FC<ICompMapa> = ({ titulo, selecionar, selecionado }: any) => {
  return (
    <Flex
      flexDir="column"
      cursor="pointer"
      onClick={() => selecionar(titulo)}
      align="center"
      transition="0.3s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Text
        fontSize={["sm", "md", "lg"]}
        textAlign="center"
        color="white"
        mb={2}
      >
        {titulo}
      </Text>
      <Flex
        bg={selecionado ? "limegreen" : "rgba(0,0,0,0.5)"}
        justify="center"
        px={["2", "4"]}
        py={["2", "3"]}
        borderRadius={15}
        w="100%"
      >
        <Flex bg="blue.200" w="full" h={["60px", "80px", "100px"]} borderRadius={10} />
      </Flex>
    </Flex>
  );
};

type ITelas = "deck_jogador" | "deck_oponente" | "mapa";
export type IAtributo = "pyrus" | "subterra" | "haos" | "darkus" | "aquos" | "ventus" | null;

export interface IDeck {
  slot1: IAtributo;
  slot2: IAtributo;
  slot3: IAtributo;
}

export default function Jogador() {
  const navigate = useNavigate();
  const [tela, setTela] = useState<ITelas>("deck_jogador");
  const mapas = ["NÚCLEO", "DESERTO", "OCEANO", "PLANÍCIE", "VULCÃO", "CAMPO NEVADO"];
  const [mapaSelecionado, setMapaSelecionado] = useState<IMapa>("");

  const atributos: { id: IAtributo }[] = [
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

  const [deckOponente, setDeckOponente] = useState<IDeck>({
    slot1: null,
    slot2: null,
    slot3: null,
  });

  function handleDragEndJogador(event) {
    const { over, active } = event;
    if (over) {
      setDeckJogador((prev) => ({
        ...prev,
        [over.id]: active.id,
      }));
    }
  }

  function handleDragEndOponente(event) {
    const { over, active } = event;
    if (over) {
      setDeckOponente((prev) => ({
        ...prev,
        [over.id]: active.id,
      }));
    }
  }

  const handleIrBatalha = () => {
    navigate("/batalha", {
      state: {
        dados: {
          deckJogador,
          deckOponente,
          mapa: mapaSelecionado,
        },
      },
    });
  };

  return (
    <Flex h="100vh" flexDir="column">
      {/* Fundo */}
      <Image
        src="/Componentes Bakugan CE/Tela Seleção Batalha/planicie.gif"
        alt="plano de fundo"
        w="100%"
        h="100%"
        position="absolute"
        objectFit="cover"
        zIndex={1}
      />

      <Flex zIndex={2} flex="1" p={[4, 6, 10]} flexDir="column">
        <Flex
          zIndex={2}
          bg="rgba(0,0,0,0.5)"
          w="100%"
          h="100%"
          borderRadius={20}
          flexDir="column"
          p={[4, 6, 10]}
        >
          {/* TELA DECK JOGADOR */}
          {tela === "deck_jogador" && (
            <Flex flexDir="column" flex="1">
              <Flex flexDir="row" align="center" flexWrap="wrap">
                <ChevronLeft
                  size={50}
                  color="white"
                  cursor="pointer"
                  onClick={() => navigate("/")}
                />
                <Heading
                  color="white"
                  fontSize={["xl", "2xl", "4xl"]}
                  textAlign="center"
                  flex="1"
                >
                  Selecionar Atributos: DECK JOGADOR
                </Heading>
              </Flex>

              <DndContext onDragEnd={handleDragEndJogador}>
                <Flex
                  flexDir={["column", "row"]}
                  justify="space-between"
                  my={[6, 10]}
                  flex="1"
                  align="center"
                >
                  <Flex
                    bg="rgba(0,0,0,0.5)"
                    px={[4, 8, 10]}
                    py={[4, 6]}
                    borderRadius={15}
                    w={["100%", "60%"]}
                    justify="space-between"
                    align="center"
                    gap={[4, 8]}
                  >
                    <SlotAtt id="slot1" value={deckJogador.slot1} />
                    <SlotAtt id="slot2" value={deckJogador.slot2} />
                    <SlotAtt id="slot3" value={deckJogador.slot3} />
                  </Flex>

                  <SimpleGrid
                    columns={[2, 3]}
                    gap={[4, 6]}
                    w={["100%", "35%"]}
                    mt={[6, 0]}
                  >
                    {atributos.map((item) => (
                      <DraggableCard key={item.id} id={item.id} />
                    ))}
                  </SimpleGrid>
                </Flex>
              </DndContext>

              <Flex justify="flex-end" mt="auto">
                <Botao texto="deck oponente" p="40px" acao={() => setTela("deck_oponente")} />
              </Flex>
            </Flex>
          )}

          {/* TELA DECK OPONENTE */}
          {tela === "deck_oponente" && (
            <Flex flexDir="column" flex="1">
              <Flex flexDir="row" align="center" flexWrap="wrap">
                <ChevronLeft
                  size={50}
                  color="white"
                  cursor="pointer"
                  onClick={() => setTela("deck_jogador")}
                />
                <Heading
                  color="white"
                  fontSize={["xl", "2xl", "4xl"]}
                  textAlign="center"
                  flex="1"
                >
                  Selecionar Atributos: DECK OPONENTE
                </Heading>
              </Flex>

              <DndContext onDragEnd={handleDragEndOponente}>
                <Flex
                  flexDir={["column", "row"]}
                  justify="space-between"
                  my={[6, 10]}
                  flex="1"
                  align="center"
                >
                  <Flex
                    bg="rgba(0,0,0,0.5)"
                    px={[4, 8, 10]}
                    py={[4, 6]}
                    borderRadius={15}
                    w={["100%", "60%"]}
                    justify="space-between"
                    align="center"
                    gap={[4, 8]}
                  >
                    <SlotAtt id="slot1" value={deckOponente.slot1} />
                    <SlotAtt id="slot2" value={deckOponente.slot2} />
                    <SlotAtt id="slot3" value={deckOponente.slot3} />
                  </Flex>

                  <SimpleGrid
                    columns={[2, 3]}
                    gap={[4, 6]}
                    w={["100%", "35%"]}
                    mt={[6, 0]}
                  >
                    {atributos.map((item) => (
                      <DraggableCard key={item.id} id={item.id} />
                    ))}
                  </SimpleGrid>
                </Flex>
              </DndContext>

              <Flex justify="flex-end" mt="auto">
                <Botao texto="escolher campo" p="40px" acao={() => setTela("mapa")} />
              </Flex>
            </Flex>
          )}

          {/* TELA MAPA */}
          {tela === "mapa" && (
            <Flex flexDir="column" flex="1">
              <Flex flexDir="row" align="center" flexWrap="wrap">
                <ChevronLeft
                  size={50}
                  color="white"
                  cursor="pointer"
                  onClick={() => setTela("deck_oponente")}
                />
                <Heading
                  color="white"
                  fontSize={["xl", "2xl", "4xl"]}
                  textAlign="center"
                  flex="1"
                >
                  Selecionar Campo de Batalha
                </Heading>
              </Flex>

              <SimpleGrid
                columns={[2, 3, 6]}
                gap={[4, 6]}
                mt={[6, 10]}
                justifyItems="center"
              >
                {mapas.map((mapa: any) => (
                  <CompMapa
                    key={mapa}
                    titulo={mapa}
                    selecionar={(e) => setMapaSelecionado(e)}
                    selecionado={mapa === mapaSelecionado}
                  />
                ))}
              </SimpleGrid>

              <Flex justify="flex-end" mt="auto">
                <Botao texto="batalhar" p="40px" acao={() => handleIrBatalha()} />
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
