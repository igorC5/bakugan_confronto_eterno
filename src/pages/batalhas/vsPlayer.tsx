import { useState } from "react";
import Botao from "@/components/botao/botao";
import CardsContainer from "@/components/CardsContainer";
import ReservaContainer from "@/components/ReservaContainer";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Dice2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";

const Bakugan = ({ atributo, id, isOverlay, jogador }) => {
  const atributos = {
    pyrus: 'red',
    subterra: 'rgba(88, 28, 0, 1)',
    haos: 'white',
    darkus: 'black',
    aquos: 'blue',
    ventus: 'limegreen',
    null: 'rgba(0,0,0,0)'
  }

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id || 'bakugan-default',
    data: { type: 'bakugan', atributo, jogador }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Flex w="100%" justify='center' align="center" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Flex w="70px" h="70px" borderRadius={100} bg={atributos[atributo || 'null']} borderWidth={3} borderColor='blue.700' cursor={isOverlay ? 'grabbing' : 'grab'}/> 
    </Flex>
  )
}

const GateCard = ({ jogador, id, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id || 'gate-default',
    data: { type: 'gate', jogador }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Flex 
      w="60px" 
      h="100%" 
      bg={jogador === 1 ? 'blue.500' : 'red.500'} 
      borderRadius={8}
      borderWidth={2}
      borderColor='white'
      cursor={isOverlay ? 'grabbing' : 'grab'}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    />
  )
}

const ArenaSlot = ({ num, gateCard, bakugans }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${num}`,
    data: { type: 'slot', num }
  });

  const { setNodeRef: setNodeRefTop, isOver: isOverTop } = useDroppable({
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
    >
      {!gateCard ? (
        <Text>{num}</Text>
      ) : (
        <Flex flexDir="column" h="100%" w="100%" justify="space-between" align="center" py={2}>
          <Flex 
            ref={setNodeRefTop}
            w="100%" 
            h="40%" 
            justify="center" 
            align="center"
            bg={isOverTop ? "rgba(0,0,255,0.2)" : "transparent"}
            borderRadius={4}
          >
            {bakugans.player1 && <Bakugan atributo={bakugans.player1.atributo} id={`placed-bakugan-${num}-p1`} jogador={1} />}
          </Flex>
          <GateCard jogador={gateCard.jogador} id={`placed-gate-${num}`} />
          <Flex 
            ref={setNodeRefBottom}
            w="100%" 
            h="40%" 
            justify="center" 
            align="center"
            bg={isOverBottom ? "rgba(255,0,0,0.2)" : "transparent"}
            borderRadius={4}
          >
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
      <SimpleGrid columns={3} w="100%" marginTop={-3} ref={setNodeRef} bg={isOver ? "rgba(255,255,255,0.1)" : "transparent"} borderRadius={8} minH="100px">
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
    <CardsContainer>
      <Flex ref={setNodeRef} w="100%" minH="100px" bg={isOver ? "rgba(255,255,255,0.1)" : "transparent"} borderRadius={8} p={2} gap={2} flexWrap="wrap">
        {cards.map((card, idx) => (
          <GateCard key={`gate-${jogador}-${idx}`} jogador={jogador} id={`gate-${jogador}-${idx}`} />
        ))}
      </Flex>
    </CardsContainer>
  )
}

export default function VsPlayer() {
  const location = useLocation();
  const dadosBatalha = location.state.dados;

  const [gateCardsP1, setGateCardsP1] = useState([1, 2, 3]);
  const [gateCardsP2, setGateCardsP2] = useState([1, 2, 3]);
  const [arenaSlots, setArenaSlots] = useState({});
  const [bakugansP1, setBakugansP1] = useState(dadosBatalha.deckJogador);
  const [bakugansP2, setBakugansP2] = useState(dadosBatalha.deckOponente);
  const [activeDrag, setActiveDrag] = useState(null);

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

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
    setArenaSlots({});
    setBakugansP1(dadosBatalha.deckJogador);
    setBakugansP2(dadosBatalha.deckOponente);
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
      
      setArenaSlots(prev => ({
        ...prev,
        [slotNum]: {
          ...prev[slotNum],
          bakugans: {
            ...prev[slotNum].bakugans,
            [targetKey]: { atributo: activeData.atributo, originalId: bakuganId }
          }
        }
      }));

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
      
      setArenaSlots(prev => ({
        ...prev,
        [slotNum]: {
          ...prev[slotNum],
          bakugans: {
            ...prev[slotNum].bakugans,
            [targetKey]: { atributo: activeData.atributo, originalId: bakuganId }
          }
        }
      }));

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
            <BakuganArea jogador={1} bakugans={bakugansP1} />
            <Text color='white'>Gate Cards</Text>
            <GateCardArea jogador={1} cards={gateCardsP1} />
            <Text color='white'>Ability Cards</Text>
            <CardsContainer>
              {/* aqui vao cartas de habilidade */}
            </CardsContainer>
            <Flex flexDir='row' justify='space-between' h="100%">
              <Flex flexDir='column' w="49%">
                <Text color='white'>Bakugans</Text>
                <ReservaContainer>
                  {/* aqui vao bakugans na reserva */}
                </ReservaContainer>
              </Flex>
              <Flex flexDir='column' w="49%">
                <Text color='white'>Ability Cards</Text>
                <ReservaContainer>
                  {/* aqui vao cartas de habilidade na reserva */}
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
            <BakuganArea jogador={2} bakugans={bakugansP2} />
            <Text color='white'>Gate Cards</Text>
            <GateCardArea jogador={2} cards={gateCardsP2} />
            <Text color='white'>Ability Cards</Text>
            <CardsContainer>
              {/* cartas de habilidade */}
            </CardsContainer>
            <Flex flexDir='row' justify='space-between' h="100%">
              <Flex flexDir='column' w="49%">
                <Text color='white'>Bakugans</Text>
                <ReservaContainer>
                  {/* bakugans na reserva */}
                </ReservaContainer>
              </Flex>
              <Flex flexDir='column' w="49%">
                <Text color='white'>Ability Cards</Text>
                <ReservaContainer>
                  {/* cartas de habilidade na reserva */}
                </ReservaContainer>
              </Flex>
            </Flex>
          </Flex>

        </Flex>
        <DragOverlay>
          {activeDrag && activeDrag.data.current.type === 'gate' && (
            <GateCard jogador={activeDrag.data.current.jogador} isOverlay />
          )}
          {activeDrag && activeDrag.data.current.type === 'bakugan' && (
            <Bakugan atributo={activeDrag.data.current.atributo} jogador={activeDrag.data.current.jogador} isOverlay />
          )}
        </DragOverlay>
      </Flex>
    </DndContext>
  )
}