import { ReactNode } from "react";
import { Flex, Box  } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="start"
      justifyContent="top"
      h="10vh"
      bg="gray.800"
    > 
      <Box p={4}>
        {children}
      </Box>
    </Flex>
  );
}