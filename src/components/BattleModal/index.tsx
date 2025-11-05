import type React from "react";
import { Dialog, DialogContent, Flex, Text } from "@chakra-ui/react"

interface IBattleModal {
  aberto: boolean;
  fechar: any;
}

const BattleModal: React.FC<IBattleModal> = ({
  aberto,
  fechar,
}) => {
  return (
    <Flex>
      
    </Flex>
  )
}

export default BattleModal;