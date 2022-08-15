import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Header from "./components/Header";
import "@fontsource/inter";
import { Flex, Spacer, Box, Heading} from '@chakra-ui/react';
import AssetsList from "./components/AssetsList";

function App() {
  
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box p="2">
        <AssetsList />
      </Box>
    </ChakraProvider>
  );
}

export default App;
