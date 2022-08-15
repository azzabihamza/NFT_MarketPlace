import { Box, Image, Badge } from '@chakra-ui/react';

export default function Asset( { asset }: { asset: any }) {


    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' w={250} >
        <Image src={asset.image_url} alt={asset.name} objectFit='cover' h="150" w="150" />
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              {asset.asset_contract.symbol}
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {/* {property.beds} beds &bull; {property.baths} baths */}
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {asset.name}
          </Box>
  
          <Box>
            {/* {property.formattedPrice} */}
            <Box as='span' color='gray.600' fontSize='sm'>
              / wk
            </Box>
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
           
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {/* {property.reviewCount} reviews */}
            </Box>
          </Box>
        </Box>
      </Box>
    )
}