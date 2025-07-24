import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { TiWeatherSunny } from "react-icons/ti";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1440px"} px={4}>
      <Flex minH={16} align={"center"} justify={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={600}>
          <Link to={"/"}>Logo</Link>
        </Text>
        <HStack spacing={2}>
          <Link to='/create'>
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <TiWeatherSunny />}</Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
