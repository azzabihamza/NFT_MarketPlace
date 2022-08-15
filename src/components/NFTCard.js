import React from 'react'
import { useState, useEffect } from 'react';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const NFTCard = (props) => {
    const [nft, setNft] = useState();
    useEffect(() => {
        setNft(props.nft);
    } , []);
    return (
        <Card 
            style={{ width: 300 }}
            

        >
            <Meta 
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={nft.primary_asset_contracts[0].name}
                description="This is the description"
            />

        </Card>
    )
}

export default NFTCard
