import { useState } from "react";
import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from "@chakra-ui/react";
import useProductStore from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const {createProduct} = useProductStore()
  const handleAddProduct = async () => {
    console.log(newProduct)
    const {success,message} = await createProduct(newProduct);
    console.log('success', success)
    console.log('message', message)
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.900")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input placeholder="Product Name" name="name" value={newProduct.name} onChange={(e)=> setNewProduct({...newProduct, name: e.target.value})} />
            <Input placeholder="Product Price" name="price" value={newProduct.price} onChange={(e)=> setNewProduct({...newProduct, price: e.target.value})} />
            <Input placeholder="Product Description" name="description" value={newProduct.description} onChange={(e)=> setNewProduct({...newProduct, description: e.target.value})} />
            <Input placeholder="Product Image" name="image" value={newProduct.image} onChange={(e)=> setNewProduct({...newProduct, image: e.target.value})} />
            <Button onClick={handleAddProduct} w={"full"}>Create</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
};

export default CreatePage;
