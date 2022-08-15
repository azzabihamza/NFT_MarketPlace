import { Stack, HStack, VStack, Box, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import Asset from './Asset';


export default function AssetsList() {
    const [AccountAssets, setAccountAssets] = useState([]);
    const { account } = useEthers();

    const getAssets = async () => {
        const options = {method: 'GET'};

        fetch('https://testnets-api.opensea.io/api/v1/assets?owner='+account+'&order_direction=desc&offset=0&limit=20&include_orders=false', options)
        .then(response => response.json())
        .then(result => setAccountAssets(result.assets))
        .catch(err => console.error(err));
        
    }

    useEffect(() => {
        console.log('assets', AccountAssets);
    } , [AccountAssets]);

    return (
        <Stack spacing={4}>
            <Box>
                <Button onClick={() => getAssets()}>
                    Get NFTs 
                </Button>
            </Box>
            <HStack spacing={4} border='1px' borderColor='gray.200' display="flex"  justifyContent="space-between">
                {AccountAssets ? (
                    AccountAssets.map(asset => (
                        <Box w="200" h="350" p={3} >
                            <Asset asset={asset} />
                        </Box>
                        
                    ))
                    
                ) : (
                    <p>no assets</p>
                )}
                    
                
                    
                
                
            </HStack>
        </Stack>
    );
}