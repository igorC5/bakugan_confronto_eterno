import { useEffect, useState } from "react";
import Botao from "@/components/botao/botao";
import CardsContainer from "@/components/CardsContainer";
import ReservaContainer from "@/components/ReservaContainer";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Dice2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";
import type { IAtributo } from "../Selecoes/Jogador";

const pyrusImg = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan pyrus.webp'
const aquosImg = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan aquos.webp'
const haosImg = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan haos.webp'
const darkusImg = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan darkus.webp'
const ventusImg = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan ventus.webp'
const subterraImg = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/bakugan subterra.webp'

const gateCardVermelha = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/gate-card-vermelho.webp'
const abilityCardVermelha = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/ability card vermalha p2.webp'

const gateCardAzul = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/gate-card-azul.webp'
const abilityCardAzul = '/Componentes Bakugan CE/cards, atributos,bakugans/cards, atributos,bakugans/ability card azul p2.webp'

const LifeBar = ({ vidaAtual = 3 }) => {
  const segmentos = [
    { from: "red.500", to: "orange.500" },
    { from: "orange.500", to: "yellow.500" },
    { from: "yellow.500", to: "green.500" },
  ];

  return (
    <Flex bg="gray.800" h="40px" w="80%" borderRadius="md" overflow="hidden">
      {segmentos.map((seg, index) => (
        <Flex
          key={index}
          borderWidth={2}
          borderColor="gray.600"
          w="33%"
          h="100%"
          bgGradient={vidaAtual > index ? "to-r" : undefined}
          gradientFrom={vidaAtual > index ? seg.from : "gray.700"}
          gradientTo={vidaAtual > index ? seg.to : "gray.700"}
          transition="all 0.3s ease"
        />
      ))}
    </Flex>
  );
};

const Bakugan = ({ atributo, id, isOverlay, jogador, arrastavel = true }: any) => {
  const atributos = {
    pyrus: { color: 'red', img: pyrusImg },
    subterra: { color: 'rgba(88, 28, 0, 1)', img: subterraImg },
    haos: { color: 'white', img: haosImg },
    darkus: { color: 'black', img: darkusImg },
    aquos: { color: 'blue', img: aquosImg },
    ventus: { color: 'limegreen', img: ventusImg },
    null: { color: 'rgba(0,0,0,0)', img: null }
  }

  const draggableConfig = arrastavel
    ? useDraggable({
        id: id || 'bakugan-default',
        data: { type: 'bakugan', atributo, jogador }
      })
    : { attributes: {}, listeners: {}, setNodeRef: null, transform: null }

  const { attributes, listeners, setNodeRef, transform } = draggableConfig

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const { color, img } = atributos[atributo || 'null']

  return (
    <Flex
      w="100%"
      justify="center"
      align="center"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      minH={0}
      zIndex={2}
    >
      <Flex
        w="70px"
        aspectRatio={1}
        borderRadius="full"
        bg={color}
        borderWidth={3}
        borderColor="blue.700"
        cursor={!arrastavel ? 'default' : isOverlay ? 'grabbing' : 'grab'}
        overflow="hidden"
        justify="center"
        align="center"
      >
        {img && (
          <Image
            src={img}
            alt={`Bakugan ${atributo}`}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        )}
      </Flex>
    </Flex>
  )
}


const GateCard = ({ jogador, id, isOverlay, w }: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id || 'gate-default',
    data: { type: 'gate', jogador }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Flex 
      w={ w ? w : "60px"} 
      h="100%" 
      bg={jogador === 1 ? 'rgba(37, 99, 235, 0.9)' : 'rgba(220, 38, 38, 0.9)'} 
      borderRadius={8}
      borderWidth={2}
      borderColor={jogador === 1 ? 'rgba(37, 99, 235, 0.9)' : 'rgba(220, 38, 38, 0.9)'} 
      cursor={isOverlay ? 'grabbing' : 'grab'}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      overflow='hidden'
      position='relative'
      zIndex={1}
    >
      <img
        src={jogador === 1 ? gateCardVermelha : gateCardAzul}
        style={{
        position: 'absolute',
        backgroundColor: 'blue',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        display: 'block',
        }}
      />
    </Flex>
  )
}

const AbilityCard = ({ jogador, id, isOverlay, w, h, arrastavel = true }: any) => {
  const draggableConfig = arrastavel
    ? useDraggable({
        id: id || 'ability-default',
        data: { type: 'ability', jogador }
      })
    : { attributes: {}, listeners: {}, setNodeRef: null, transform: null };
  
  const { attributes, listeners, setNodeRef, transform } = draggableConfig;

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Flex 
      w={ w ? w : "60px"} 
      h={h || "100%"} 
      bg={jogador === 1 ? 'cyan.500' : 'orange.500'} 
      borderRadius={8}
      borderWidth={2}
      borderColor='white'
      cursor={!arrastavel ? 'default' : isOverlay ? 'grabbing' : 'grab'}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      overflow='hidden'
      position='relative'
    >
      <img
        src={jogador === 1 ? abilityCardVermelha : abilityCardAzul}
        style={{
        position: 'absolute',
        backgroundColor: 'blue',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        display: 'block',
        }}
      />
    </Flex>
  )
}

const ArenaSlot = ({ num, gateCard, bakugans }: any) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${num}`,
    data: { type: 'slot', num }
  });

  const { setNodeRef: setNodeRefTop, isOver: isOverTop }: any = useDroppable({
    id: `slot-${num}-top`,
    data: { type: 'slot-bakugan', num, jogador: 1 }
  });

  const { setNodeRef: setNodeRefBottom, isOver: isOverBottom } = useDroppable({
    id: `slot-${num}-bottom`,
    data: { type: 'slot-bakugan', num, jogador: 2 }
  });

  return (
    <Flex 
      ref={setNodeRef}
      bg={isOver ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)"} 
      borderWidth={2} 
      borderColor='black' 
      justifyContent='center' 
      align="center"
      position="relative"
      minH={0}
      h="100%"
      overflow="hidden"
    >
      {!gateCard ? (
        <Text>{num}</Text>
      ) : (
        <Flex flexDir="column" w="100%" h="100%" justify="center" align="center" minH={0}>

          <Flex position='absolute' top="2" w="45%">
            {bakugans.player1 && <Bakugan atributo={bakugans.player1.atributo} id={`placed-bakugan-${num}-p1`} jogador={1} />}
          </Flex>
          <Flex h="100%" w="100%" minH={0}>
            <GateCard w="100%" jogador={gateCard.jogador} id={`placed-gate-${num}`} />
          </Flex>
          <Flex position='absolute' bottom="2" w="45%">
            {bakugans.player2 && <Bakugan atributo={bakugans.player2.atributo} id={`placed-bakugan-${num}-p2`} jogador={2} />}
          </Flex>

        </Flex>
      )}
    </Flex>
  )
}

const BakuganArea = ({ jogador, bakugans }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `bakugan-area-${jogador}`,
    data: { type: 'bakugan-area', jogador }
  });

  return (
    <CardsContainer>
      <SimpleGrid gridGap={1} columns={3} w="100%" ref={setNodeRef} bg={isOver ? "rgba(255,255,255,0.1)" : "transparent"} borderRadius={8}>
        {
        Object.keys(bakugans).map((chave, idx) => {
          return (
            <Bakugan key={chave} id={`bakugan-p${jogador}-${idx}`} atributo={bakugans[chave]} jogador={jogador} />
          )
        })
        }
      </SimpleGrid>
    </CardsContainer>
  )
}

const GateCardArea = ({ jogador, cards }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `gate-area-${jogador}`,
    data: { type: 'gate-area', jogador }
  });

  return (
    <CardsContainer h="35%" p="6px">
      <Flex ref={setNodeRef} w="100%" h="100%" bg={isOver ? "rgba(255,255,255,0.1)" : "transparent"} borderRadius={8} p={0} gap={2} flexDir="row" justify="space-around">
        {cards.map((card, idx) => (
          <GateCard key={`gate-${jogador}-${idx}`} jogador={jogador} id={`gate-${jogador}-${idx}`} />
        ))}
      </Flex>
    </CardsContainer>
  )
}

const AbilityCardArea = ({ jogador, cards }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `ability-area-${jogador}`,
    data: { type: 'ability-area', jogador }
  });

  return (
    <CardsContainer h="35%" p="6px">
      <Flex ref={setNodeRef} w="100%" h="100%" bg={isOver ? "rgba(255,255,255,0.1)" : "transparent"} borderRadius={8} p={0} gap={2} flexDir="row" justify="space-around">
        {cards.map((card, idx) => (
          <AbilityCard key={`ability-${jogador}-${idx}`} jogador={jogador} id={`ability-${jogador}-${idx}`} />
        ))}
      </Flex>
    </CardsContainer>
  )
}

const AbilityReservaArea = ({ jogador, cards }) => {
  return (
    <ReservaContainer>
      <SimpleGrid w="100%" h="100%" p={1} gap={1} flexDir="row">
        {cards.map((card, idx) => (
          <AbilityCard key={`ability-reserva-${jogador}-${idx}`} jogador={jogador} id={`ability-reserva-${jogador}-${idx}`} w="33%" arrastavel={false} />
        ))}
      </SimpleGrid>
    </ReservaContainer>
  )
}

const BakuganReservaArea = ({ jogador, bakugans }) => {
  return (
    <ReservaContainer>
      <Flex w="100%" h="100%" p={1} gap={1} flexDir="column" flexWrap="wrap" align='center' minH={0}>
        {bakugans.map((bakugan, idx) => (
          <Flex key={`bakugan-reserva-${jogador}-${idx}`} w="50%" justify="center" align="center" minH={0}>
            <Bakugan atributo={bakugan} jogador={jogador} id={`bakugan-reserva-${jogador}-${idx}`} arrastavel={false} />
          </Flex>
        ))}
      </Flex>
    </ReservaContainer>
  )
}

const AbilityBattleSlot = ({ jogador, abilityCard }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `ability-battle-slot-${jogador}`,
    data: { type: 'ability-battle-slot', jogador }
  });

  return (
    <Flex
      ref={setNodeRef}
      mt="2"
      bg={isOver ? "rgba(100,100,100,0.8)" : "gray.700"}
      w="100%"
      h="80px"
      rounded="2xl"
      justify="center"
      align="center"
      borderWidth="4px"
      borderStyle='dashed'
      borderColor='black'
    >
      {abilityCard ? (
        <AbilityCard jogador={jogador} id={abilityCard} w="60px" />
      ) : (
        <Text fontWeight='medium' color='gray.200' textAlign='center'>Use Ability Card aqui</Text>
      )}
    </Flex>
  )
}

export default function VsPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dadosBatalha = location.state.dados;

  const [gateCardsP1, setGateCardsP1] = useState([1, 2, 3]);
  const [gateCardsP2, setGateCardsP2] = useState([1, 2, 3]);
  const [abilityCardsP1, setAbilityCardsP1] = useState([1, 2, 3]);
  const [abilityCardsP2, setAbilityCardsP2] = useState([1, 2, 3]);
  const [abilityReservaP1, setAbilityReservaP1] = useState([]);
  const [abilityReservaP2, setAbilityReservaP2] = useState([]);
  const [bakuganReservaP1, setBakuganReservaP1] = useState([]);
  const [bakuganReservaP2, setBakuganReservaP2] = useState([]);
  const [arenaSlots, setArenaSlots] = useState({});
  const [bakugansP1, setBakugansP1] = useState(dadosBatalha.deckJogador);
  const [bakugansP2, setBakugansP2] = useState(dadosBatalha.deckOponente);
  const [activeDrag, setActiveDrag] = useState(null);

  const [batalhaOpen, setBatalhaOpen] = useState(false);
  const [slotBatalhaAtual, setSlotBatalhaAtual] = useState(null);
  const [bakugansBatalha, setBakugansBatalha] = useState<IAtributo[]>([null, null]);
  const [abilityBatalhaP1, setAbilityBatalhaP1] = useState(null);
  const [abilityBatalhaP2, setAbilityBatalhaP2] = useState(null);
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [vidaP1, setVidaP1] = useState(3);
  const [vidaP2, setVidaP2] = useState(3);

  useEffect(() => {
    if (vidaP1 == 0) {
      alert('O JOGADOR 2 VENCEU!');
      handleResetar();
    }
    if (vidaP2 == 0) {
      alert('O JOGADOR 1 VENCEU!');
      handleResetar();
    }
  }, [vidaP1, vidaP2]);

  const verificarBatalha = (slotNum, slots) => {
    const slot = slots[slotNum];

    if (!slot || !slot.gateCard) return null;
    
    const temBakuganP1 = slot.bakugans?.player1?.atributo;
    const temBakuganP2 = slot.bakugans?.player2?.atributo;
    
    if (temBakuganP1 && temBakuganP2) {
      const resultado = {
        slotNum,
        bakuganP1: slot.bakugans.player1,
        bakuganP2: slot.bakugans.player2,
        gateCard: slot.gateCard
      };
      
      setSlotBatalhaAtual(slotNum);
      setBakugansBatalha([temBakuganP1, temBakuganP2]);
      setBatalhaOpen(true);
      return resultado;
    }
    
    return null;
  }

  const handleDecideVencedor = (vencedor) => {
    // Mover ability cards para reserva
    if (abilityBatalhaP1) {
      setAbilityReservaP1(prev => [...prev, 1]);
    }
    if (abilityBatalhaP2) {
      setAbilityReservaP2(prev => [...prev, 1]);
    }
    
    // Mover bakugans para reserva
    if (slotBatalhaAtual !== null) {
      const slot = arenaSlots[slotBatalhaAtual];
      if (slot) {
        if (slot.bakugans?.player1?.atributo) {
          setBakuganReservaP1(prev => [...prev, slot.bakugans.player1.atributo]);
        }
        if (slot.bakugans?.player2?.atributo) {
          setBakuganReservaP2(prev => [...prev, slot.bakugans.player2.atributo]);
        }
        
        // Remover o slot da arena (gate card e bakugans)
        setArenaSlots(prev => {
          const newSlots = { ...prev };
          delete newSlots[slotBatalhaAtual];
          return newSlots;
        });
      }
    }
    
    // Resetar estado da batalha
    setAbilityBatalhaP1(null);
    setAbilityBatalhaP2(null);
    setSlotBatalhaAtual(null);
    setBatalhaOpen(false);

    if (vencedor == 1) {
      setVidaP2(prev => prev - 1);
    }
    if (vencedor == 2) {
      setVidaP1(prev => prev - 1);
    }
  }

  const handleRandomJogador = () => {
    const num = Math.random();
    if (num > 0.5) {
      alert('Jogador 1');
    } else {
      alert('Jogador 2');
    }
  }

  const handleResetar = () => {
    setGateCardsP1([1, 2, 3]);
    setGateCardsP2([1, 2, 3]);
    setAbilityCardsP1([1, 2, 3]);
    setAbilityCardsP2([1, 2, 3]);
    setAbilityReservaP1([]);
    setAbilityReservaP2([]);
    setBakuganReservaP1([]);
    setBakuganReservaP2([]);
    setArenaSlots({});
    setBakugansP1(dadosBatalha.deckJogador);
    setBakugansP2(dadosBatalha.deckOponente);
    setBakugansBatalha([null, null]);
    setAbilityBatalhaP1(null);
    setAbilityBatalhaP2(null);
    setSlotBatalhaAtual(null);
    setBatalhaOpen(false);
    setVidaP1(3);
    setVidaP2(3);
  }

  const handleDragStart = (event) => {
    setActiveDrag(event.active);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDrag(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Arrastar gate card para slot (de area ou de outro slot)
    if (activeData.type === 'gate' && overData.type === 'slot') {
      const slotNum = overData.num;
      if (arenaSlots[slotNum]?.gateCard) return;

      const gateId = active.id;
      const jogador = activeData.jogador;

      // Se está vindo de outro slot, remover de lá
      if (gateId.startsWith('placed-gate-')) {
        const oldSlotNum = parseInt(gateId.split('-')[2]);
        const oldSlot = arenaSlots[oldSlotNum];
        
        // Retornar bakugans antes de mover
        if (oldSlot) {
          if (oldSlot.bakugans?.player1?.atributo) {
            setBakugansP1(prev => {
              const keys = Object.keys(prev).map(k => parseInt(k));
              const nextKey = keys.length > 0 ? Math.max(...keys) + 1 : 0;
              return {...prev, [nextKey]: oldSlot.bakugans.player1.atributo};
            });
          }
          if (oldSlot.bakugans?.player2?.atributo) {
            setBakugansP2(prev => {
              const keys = Object.keys(prev).map(k => parseInt(k));
              const nextKey = keys.length > 0 ? Math.max(...keys) + 1 : 0;
              return {...prev, [nextKey]: oldSlot.bakugans.player2.atributo};
            });
          }
          
          setArenaSlots(prev => {
            const newSlots = { ...prev };
            delete newSlots[oldSlotNum];
            return newSlots;
          });
        }
      } else {
        // Está vindo da área, remover de lá
        if (jogador === 1) {
          setGateCardsP1(prev => prev.filter((_, idx) => `gate-1-${idx}` !== gateId));
        } else {
          setGateCardsP2(prev => prev.filter((_, idx) => `gate-2-${idx}` !== gateId));
        }
      }

      // Adicionar no novo slot
      setArenaSlots(prev => ({
        ...prev,
        [slotNum]: { gateCard: { jogador }, bakugans: {} }
      }));
    }

    // Arrastar gate card de volta para area
    if (activeData.type === 'gate' && overData.type === 'gate-area') {
      const gateId = active.id;
      const jogadorDestino = overData.jogador;
      
      if (gateId.startsWith('placed-gate-')) {
        const slotNum = parseInt(gateId.split('-')[2]);
        const slot = arenaSlots[slotNum];
        
        if (slot && slot.gateCard.jogador === jogadorDestino) {
          // Retornar bakugans para suas áreas
          if (slot.bakugans?.player1?.atributo) {
            setBakugansP1(prev => {
              const keys = Object.keys(prev).map(k => parseInt(k));
              const nextKey = keys.length > 0 ? Math.max(...keys) + 1 : 0;
              return {...prev, [nextKey]: slot.bakugans.player1.atributo};
            });
          }
          if (slot.bakugans?.player2?.atributo) {
            setBakugansP2(prev => {
              const keys = Object.keys(prev).map(k => parseInt(k));
              const nextKey = keys.length > 0 ? Math.max(...keys) + 1 : 0;
              return {...prev, [nextKey]: slot.bakugans.player2.atributo};
            });
          }

          setArenaSlots(prev => {
            const newSlots = { ...prev };
            delete newSlots[slotNum];
            return newSlots;
          });

          if (jogadorDestino === 1) {
            setGateCardsP1(prev => [...prev, 1]);
          } else {
            setGateCardsP2(prev => [...prev, 1]);
          }
        }
      }
    }

    // Arrastar bakugan de volta para área
    if (activeData.type === 'bakugan' && overData.type === 'bakugan-area') {
      const bakuganId = active.id;
      const jogadorDestino = overData.jogador;
      
      if (bakuganId.startsWith('placed-bakugan-')) {
        const parts = bakuganId.split('-');
        const slotNum = parseInt(parts[2]);
        const playerPart = parts[3];
        const bakuganJogador = playerPart === 'p1' ? 1 : 2;
        
        if (bakuganJogador === jogadorDestino) {
          const slot = arenaSlots[slotNum];
          if (slot) {
            const targetKey = bakuganJogador === 1 ? 'player1' : 'player2';
            const bakuganAtributo = slot.bakugans[targetKey]?.atributo;
            
            if (bakuganAtributo) {
              // Retornar bakugan para área
              if (bakuganJogador === 1) {
                const nextKey1 = Object.keys(bakugansP1).length > 0 
                  ? Math.max(...Object.keys(bakugansP1).map(k => parseInt(k))) + 1 
                  : 0;
                setBakugansP1(prev => ({...prev, [nextKey1]: bakuganAtributo}));
              } else {
                const nextKey2 = Object.keys(bakugansP2).length > 0 
                  ? Math.max(...Object.keys(bakugansP2).map(k => parseInt(k))) + 1 
                  : 0;
                setBakugansP2(prev => ({...prev, [nextKey2]: bakuganAtributo}));
              }
              
              // Remover do slot
              setArenaSlots(prev => ({
                ...prev,
                [slotNum]: {
                  ...prev[slotNum],
                  bakugans: {
                    ...prev[slotNum].bakugans,
                    [targetKey]: undefined
                  }
                }
              }));
            }
          }
        }
      }
    }

    // Arrastar bakugan para gate card (validando jogador correto)
    if (activeData.type === 'bakugan' && overData.type === 'slot-bakugan') {
      const slotNum = overData.num;
      const slot = arenaSlots[slotNum];
      
      if (!slot || !slot.gateCard) return;

      const bakuganJogador = activeData.jogador;
      const slotJogador = overData.jogador;
      
      if (bakuganJogador !== slotJogador) return;

      const targetKey = slotJogador === 1 ? 'player1' : 'player2';

      if (slot.bakugans[targetKey]) return;

      const bakuganId = active.id;
      
      const novosSlots = {
        ...arenaSlots,
        [slotNum]: {
          ...arenaSlots[slotNum],
          bakugans: {
            ...arenaSlots[slotNum].bakugans,
            [targetKey]: { atributo: activeData.atributo, originalId: bakuganId }
          }
        }
      };

      setArenaSlots(novosSlots);

      // Verificar batalha após atualizar o estado
      verificarBatalha(slotNum, novosSlots);

      // Remover bakugan da área do jogador (somente se não está vindo de outro slot)
      if (!bakuganId.startsWith('placed-bakugan-')) {
        if (bakuganId.includes('p1')) {
          const idx = bakuganId.split('-')[2];
          setBakugansP1(prev => {
            const newBakugans = {...prev};
            delete newBakugans[Object.keys(prev)[idx]];
            return newBakugans;
          });
        } else if (bakuganId.includes('p2')) {
          const idx = bakuganId.split('-')[2];
          setBakugansP2(prev => {
            const newBakugans = {...prev};
            delete newBakugans[Object.keys(prev)[idx]];
            return newBakugans;
          });
        }
      } else {
        // Está vindo de outro slot, remover de lá
        const parts = bakuganId.split('-');
        const oldSlotNum = parseInt(parts[2]);
        const playerPart = parts[3];
        const oldTargetKey = playerPart === 'p1' ? 'player1' : 'player2';
        
        setArenaSlots(prev => ({
          ...prev,
          [oldSlotNum]: {
            ...prev[oldSlotNum],
            bakugans: {
              ...prev[oldSlotNum].bakugans,
              [oldTargetKey]: undefined
            }
          }
        }));
      }
    }

    // Arrastar bakugan para o slot inteiro (detecta automaticamente qual lado)
    if (activeData.type === 'bakugan' && overData.type === 'slot') {
      const slotNum = overData.num;
      const slot = arenaSlots[slotNum];
      
      if (!slot || !slot.gateCard) return;

      const bakuganJogador = activeData.jogador;
      const targetKey = bakuganJogador === 1 ? 'player1' : 'player2';

      if (slot.bakugans[targetKey]) return;

      const bakuganId = active.id;
      
      const novosSlots = {
        ...arenaSlots,
        [slotNum]: {
          ...arenaSlots[slotNum],
          bakugans: {
            ...arenaSlots[slotNum].bakugans,
            [targetKey]: { atributo: activeData.atributo, originalId: bakuganId }
          }
        }
      };

      setArenaSlots(novosSlots);

      // Verificar batalha após atualizar o estado
      verificarBatalha(slotNum, novosSlots);

      // Remover bakugan da área do jogador (somente se não está vindo de outro slot)
      if (!bakuganId.startsWith('placed-bakugan-')) {
        if (bakuganId.includes('p1')) {
          const idx = bakuganId.split('-')[2];
          setBakugansP1(prev => {
            const newBakugans = {...prev};
            delete newBakugans[Object.keys(prev)[idx]];
            return newBakugans;
          });
        } else if (bakuganId.includes('p2')) {
          const idx = bakuganId.split('-')[2];
          setBakugansP2(prev => {
            const newBakugans = {...prev};
            delete newBakugans
            [Object.keys(prev)[idx]];
            return newBakugans;
          });
        }
      } else {
        // Está vindo de outro slot, remover de lá
        const parts = bakuganId.split('-');
        const oldSlotNum = parseInt(parts[2]);
        const playerPart = parts[3];
        const oldTargetKey = playerPart === 'p1' ? 'player1' : 'player2';
        
        setArenaSlots(prev => ({
          ...prev,
          [oldSlotNum]: {
            ...prev[oldSlotNum],
            bakugans: {
              ...prev[oldSlotNum].bakugans,
              [oldTargetKey]: undefined
            }
          }
        }));
      }
    }

    // Arrastar ability card para slot de batalha
    if (activeData.type === 'ability' && overData.type === 'ability-battle-slot') {
      const jogador = activeData.jogador;
      const slotJogador = overData.jogador;
      
      if (jogador !== slotJogador) return;

      const abilityId = active.id;
      
      if (jogador === 1) {
        if (abilityBatalhaP1) return;
        setAbilityBatalhaP1(abilityId);
        setAbilityCardsP1(prev => prev.filter((_, idx) => `ability-1-${idx}` !== abilityId));
      } else {
        if (abilityBatalhaP2) return;
        setAbilityBatalhaP2(abilityId);
        setAbilityCardsP2(prev => prev.filter((_, idx) => `ability-2-${idx}` !== abilityId));
      }
    }

    // Remover ability card do slot de batalha
    if (activeData.type === 'ability' && overData.type === 'ability-area') {
      const abilityId = active.id;
      const jogadorDestino = overData.jogador;
      
      if (abilityId === abilityBatalhaP1 && jogadorDestino === 1) {
        setAbilityBatalhaP1(null);
        setAbilityCardsP1(prev => [...prev, 1]);
      } else if (abilityId === abilityBatalhaP2 && jogadorDestino === 2) {
        setAbilityBatalhaP2(null);
        setAbilityCardsP2(prev => [...prev, 1]);
      }
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

            <Flex w="100%" align="center">
              <Flex 
                w="20%" 
                justify="center"
                align='center'
              >
                <Flex
                  bgGradient="to-b"
                  gradientFrom='blue.400'
                  gradientTo='blue.700'
                  w="50px"
                  aspectRatio={1}
                  rounded="50px"
                  justify="center"
                  align="center"
                >
                  <Text
                    fontWeight='medium'
                    color='white'
                    fontSize='2xl'
                  >
                    P1
                  </Text>
                </Flex>
              </Flex>
              <LifeBar vidaAtual={vidaP1} />
            </Flex>

            <Text color='white'>Bakugans</Text>
            <BakuganArea jogador={1} bakugans={bakugansP1} />

            <Text color='white'>Gate Cards</Text>
            <GateCardArea jogador={1} cards={gateCardsP1} />

            <Text color='white'>Ability Cards</Text>
            <AbilityCardArea jogador={1} cards={abilityCardsP1} />
            <Flex flexDir='row' justify='space-between' h="100%">
              <Flex flexDir='column' w="49%">
                <Text color='white'>Bakugans</Text>
                <BakuganReservaArea jogador={1} bakugans={bakuganReservaP1} />
              </Flex>
              <Flex flexDir='column' w="49%">
                <Text color='white'>Ability Cards</Text>
                <AbilityReservaArea jogador={1} cards={abilityReservaP1} />
              </Flex>
            </Flex>
          </Flex> 

          {/* ARENA */}
          <Flex 
            w="54%" 
            flexDir='column' 
            h="100%" 
          >
            <Flex px="4" mb="4">

              <Flex w="33%" justify="center">
                <Botao texto='sair' acao={() => navigate('/')} />
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
                <Botao texto='resetar' acao={handleResetar} />
              </Flex>

            </Flex>
            <Flex justify='center' px="10" h="100%">
              <SimpleGrid columns={6} w="100%" h="100%">
                {nums.map(num => {
                  const slot = arenaSlots[num];
                  return (
                    <ArenaSlot 
                      key={num}
                      num={num}
                      gateCard={slot?.gateCard}
                      bakugans={slot?.bakugans || {}}
                    />
                  )
                })}
              </SimpleGrid>
            </Flex>
          </Flex>

          {/* JOGADOR 2 */}
          <Flex w="23%" flexDir='column' h="90%">

            <Flex w="100%" align="center">
              <Flex 
                w="20%" 
                justify="center"
                align='center'
              >
                <Flex
                  bgGradient="to-b"
                  gradientFrom='red.400'
                  gradientTo='red.700'
                  w="50px"
                  aspectRatio={1}
                  rounded="50px"
                  justify="center"
                  align="center"
                >
                  <Text
                    fontWeight='medium'
                    color='white'
                    fontSize='2xl'
                  >
                    P2
                  </Text>
                </Flex>
              </Flex>
              <LifeBar vidaAtual={vidaP2} />
            </Flex>

            <Text color="white">Bakugans</Text>
            <BakuganArea jogador={2} bakugans={bakugansP2} />

            <Text color='white'>Gate Cards</Text>
            <GateCardArea jogador={2} cards={gateCardsP2} />

            <Text color='white'>Ability Cards</Text>
            <AbilityCardArea jogador={2} cards={abilityCardsP2} />

            <Flex flexDir='row' justify='space-between' h="100%">
              <Flex flexDir='column' w="49%">
                <Text color='white'>Bakugans</Text>
                <BakuganReservaArea jogador={2} bakugans={bakuganReservaP2} />
              </Flex>
              <Flex flexDir='column' w="49%">
                <Text color='white'>Ability Cards</Text>
                <AbilityReservaArea jogador={2} cards={abilityReservaP2} />
              </Flex>
            </Flex>
          </Flex>
          {/* MODAL DE BATALHA */}
          {batalhaOpen && (
            <Flex
              flexDir='column'
              px="4"
              py="4"
              bgGradient='to-r'
              gradientFrom='gray.200'
              gradientTo='gray.500'
              borderRadius={15}
              borderWidth={3}
              borderColor='blue.600'
              align="center"
              position='absolute'
              top="15%"
              left="50%"
              transform="translateX(-50%)"
              w="30%"
              zIndex={3}
            >
              <Text fontWeight='medium' fontSize='2xl'>Qual o Vencedor?</Text>
              <Flex flexDir="row" w="100%" justify="space-between">
                <Flex w="47%" h="100%" align="center" flexDir='column' justify="center">
                  <Flex w="250px">
                    <Bakugan atributo={bakugansBatalha[0]} arrastavel={false} />
                  </Flex>

                  <AbilityBattleSlot jogador={1} abilityCard={abilityBatalhaP1} />
                  
                  <Flex mt="20px" />
                  <Button
                    w="100%"
                    h="60px"
                    padding='10px'
                    bgGradient="to-b"
                    gradientFrom="blue.400"
                    gradientTo="blue.600"
                    color="gray.900"
                    textTransform="uppercase"
                    fontWeight="bold"
                    clipPath="polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)"
                    fontSize="110%"
                    onClick={() => handleDecideVencedor(1)}
                  >
                    JOGADOR 1
                  </Button>
                </Flex>
                <Flex w="47%" justify="center" align="center" flexDir='column'>
                  <Flex w="250px">
                    <Bakugan atributo={bakugansBatalha[1]} arrastavel={false} />
                  </Flex>

                  <AbilityBattleSlot jogador={2} abilityCard={abilityBatalhaP2} />
                  
                  <Flex mt="20px" />
                  <Button
                    w="100%"
                    h="60px"
                    padding='10px'
                    bgGradient="to-b"
                    gradientFrom="blue.400"
                    gradientTo="blue.600"
                    color="gray.900"
                    textTransform="uppercase"
                    fontWeight="bold"
                    clipPath="polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)"
                    fontSize="110%"
                    onClick={() => handleDecideVencedor(2)}
                  >
                    JOGADOR 2
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
        <DragOverlay>
          {activeDrag && activeDrag.data.current.type === 'gate' && (
            <GateCard jogador={activeDrag.data.current.jogador} isOverlay />
          )}
          {activeDrag && activeDrag.data.current.type === 'bakugan' && (
            <Bakugan atributo={activeDrag.data.current.atributo} jogador={activeDrag.data.current.jogador} isOverlay />
          )}
          {activeDrag && activeDrag.data.current.type === 'ability' && (
            <AbilityCard jogador={activeDrag.data.current.jogador} isOverlay />
          )}
        </DragOverlay>
      </Flex>

    </DndContext>
  )
}