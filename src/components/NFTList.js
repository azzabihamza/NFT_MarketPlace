import React from "react";
import { useState, useEffect } from "react";
import { List } from 'antd';
import NFTCard from "./NFTCard";


function NFTList(props) {
    const [nfts, setNfts] = useState([]);


    useEffect(() => {
        setNfts(props.nfts);
        console.log(nfts);
    } , []);

    return (
        <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={nfts}
        renderItem={item => (
          <List.Item>
            <NFTCard nft={item} />
          </List.Item>
        )}
      />
    );
}

export default NFTList;