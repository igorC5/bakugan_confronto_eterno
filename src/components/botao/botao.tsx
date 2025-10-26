import { Button } from "@chakra-ui/react"

interface IBotao {
  texto?: any;
  acao?: any;
  w?: string;
  h?: string;
  p?: string;
}

export default function Botao ({
  texto,
  acao,
  w,  
  h,
  p,
}: IBotao) {
  return (
    <Button
      padding={p ? p : '10px'}
      bgGradient="to-r"
      gradientFrom="gray.200"
      gradientTo="gray.500"
      color="black"
      textTransform="uppercase"
      fontWeight="bold"
      clipPath="polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)"
      onClick={acao}
      fontSize="110%"
      width={w ? w : 'auto'}
      height={h ? h : '40px'}
      cursor={acao ? 'hover' : 'default'}
      // height='max-content'
    >
      {texto}
    </Button>
  )
}