import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import useProductStore from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box shadow={"md"} p={4} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} pos={"relative"} zIndex={1}>
      <Image rounded={"lg"} width={"full"} height={200} objectFit={"cover"} src={product.image} alt={product.name} />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          {product.description}
        </Text>
        <HStack spacing={2}>
          <IconButton aria-label='Edit to cart' onClick={onOpen} colorScheme='blue' icon={<FaRegEdit />} />
          <IconButton onClick={() => handleDeleteProduct(product._id)} aria-label='Delete to cart' colorScheme='red' icon={<FaRegTrashAlt />} />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>

          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
              <Input placeholder='Product Price' name='price' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
              <Input placeholder='Product Description' name='description' value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} />
              <Input placeholder='Product Image' name='image' value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={4}>
              <Button bgColor={"blue.400"} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                Update
              </Button>
              <Button bg={"red.700"} _hover={{ bg: "red" }} onClick={onClose}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
