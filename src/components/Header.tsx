import { useDisclosure } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import AccountModal from "./AccountModal";
import { Flex, Spacer, Box, Heading} from '@chakra-ui/react';

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex minWidth="max-content" alignItems="center" gap="2" h="10vh" bg="gray.800">
            <Box p="2">
            <Heading size="md" bg="whiteAlpha.500">NFT MarketPlace</Heading>
            </Box>
            <Spacer />
            <ConnectButton handleOpenModal={onOpen} />
            <AccountModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}