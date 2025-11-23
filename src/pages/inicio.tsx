import Botao from "@/components/botao/botao"
import { useAuth } from "@/contexts/AuthContext"
import { AspectRatio, Box, Button, Flex, Image, Input, Spinner, Text } from "@chakra-ui/react"
import { X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginModal = ({
  aberto,
  fechar,
  logar,
  enviando,
  usuario,
  deslogar,
}: any) => {
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <Flex 
      display={aberto ? 'flex' : 'none'}
      zIndex={2}
      bgGradient="to-r"
      gradientFrom="gray.200"
      gradientTo="gray.500"
      w="20%"
      rounded="2xl"
      position='absolute'
      top='20%'
      left='50%'
      transform="translateX(-50%)"
      flexDir='column'
      p="4"
    >
      <Flex position="absolute" right={0} top={0} p="2" cursor='pointer' onClick={fechar}>
        <X size={28} color="white" />
      </Flex>
      <Text fontWeight='medium' >usuario</Text>
      <Input 
        fontWeight='medium'
        bg="rgba(0,0,0,0.3)"
        color="white"
        borderColor='gray.700'
        borderWidth={4}
        placeholder="Digite aqui"
        type="text"
        value={user}
        onChange={(e) =>setUser(e.target.value)}
      />
      <Text fontWeight='medium' >senha</Text>
      <Input 
        fontWeight='medium'
        bg="rgba(0,0,0,0.3)"
        color="white"
        borderColor='gray.700'
        borderWidth={4}
        placeholder="Digite aqui"
        type="password"
        value={senha}
        onChange={(e) =>setSenha(e.target.value)}
      />
      <Button 
        mt="2" 
        bg="gray.700"
        onClick={() => logar(user, senha)}
        disabled={enviando}
      >
        {enviando ? (
          <Spinner />
        ) : (
         'logar'
        )}
      </Button>
      {usuario && (
        <>
          <Text mt="2" fontSize='xl' fontWeight='medium' color="blue.600">
            Bem vindo, {usuario}
          </Text>
          <Button onClick={deslogar} mt="2" bg="tomato">sair</Button>
        </>
      )}
    </Flex>
  )
}

function Inicio() {
  const navigate = useNavigate();
  const [configOpen, setConfigOpen] = useState(false);
  const { logar, enviando, user, deslogar } = useAuth();

  return (
    <Flex h="100vh">
      <Image
        src="/Componentes Bakugan CE/Tela Inicial/arvore_gif.gif"
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
        <Botao texto="CONFIGURAÇÕES" w="200%" h="60px" acao={() => {
          setConfigOpen(true)
        }} />
        {/* <Botao texto="SAIR" w="200%" h="60px" /> */}
      </Flex>

      <LoginModal 
        aberto={configOpen} 
        fechar={() => setConfigOpen(false)}
        logar={logar}
        enviando={enviando}
        usuario={user}
        deslogar={deslogar}
      />
    </Flex>
  )
}

export default Inicio
