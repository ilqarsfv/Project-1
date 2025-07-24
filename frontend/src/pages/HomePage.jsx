import { Box, Container, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW={"1440px"}>
      <VStack>
        <Text fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-l, #7928CA, #FF0080)"} bgClip={"text"} textAlign={"center"}>
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing={6}
          w={"full"}
          mt={8}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <HStack spacing={4}>
            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
              No products found
            </Text>
            <Link to={"/create"}>
              <Text as='span' color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                Create product
              </Text>
            </Link>
          </HStack>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
