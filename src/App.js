import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTList from "./components/NFTList";
import "antd/dist/antd.css";
import { Button, Layout, List } from "antd";
import { Avatar, Card, Drawer, Col, Divider, Row, Image } from "antd";
import { get } from "stream-http";

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [haveMetamask, setHaveMetamask] = useState(true);

  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const [isConnected, setIsConnected] = useState(false);

  const [network, setNetwork] = useState("");

  const [nfts, setNfts] = useState([]);
  const [nft, setNft] = useState(null);

  const [visible, setVisible] = useState(false);

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const checkMetamaskAvailability = async () => {
    if (!ethereum) {
      setHaveMetamask(false);
    } else {
      setHaveMetamask(true);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        throw new Error("No metamask found");
        setHaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      let network = await provider.getNetwork();

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setNetwork(network.name);
      setIsConnected(true);
    } catch (error) {
      console.log(error);
      isConnected(false);
    }
  };
  const getCollection = async () => {
    const options = { method: "GET" };
    if (accountAddress !== "") {
      console.log(accountAddress);
      fetch(
        "https://testnets-api.opensea.io/api/v1/collections?asset_owner=" +
          accountAddress +
          "&offset=0&limit=300",
        options
      )
        .then((res) => res.json())
        .then((result) => setNfts(result))
        .catch((err) => console.error(err));
      console.log(nfts);
    } else {
      console.log("No account address");
    }
  };

  const getNFTData = async (contract, tokenId) => {
    const options = { method: "GET" };

    fetch(
      "https://testnets-api.opensea.io/api/v1/asset/" +
        contract +
        "/" +
        tokenId +
        "/",
      options
    )
      .then((response) => response.json())
      .then((result) => setNft(result))
      .catch((err) => console.error(err));
    console.log(nft);
  };

  const showDrawer = (item) => {
    getNFTData(
      item.primary_asset_contracts[0].address,
      item.owned_asset_count 
    );
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    checkMetamaskAvailability();
  }, []);

  return (
    <Layout className="layout">
      <Header className="App-header" style={{ backgroundColor: "white" }}>
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-row">
                  <h3>Connect Wallet</h3>
                  <Button type="default" onClick={connectWallet}>
                    Connect
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </Header>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          {isConnected ? (
            <>
              <p className="info">🎉 Connected Successfully to {network}</p>
              {/* <NFTList account= {{accountAddress}} /> */}
              <Button type="default" onClick={getCollection}>
                Get Collection
              </Button>
              {/* <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={nfts}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      style={{ width: 300 }}
                      actions={[<Button onClick={showDrawer}>Show NFT</Button>]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={item.primary_asset_contracts[0].name}
                        description={item.primary_asset_contracts[0].symbol}
                      />
                    </Card>
                  </List.Item>
                )}
              /> */}
              <List grid={{ gutter: 16, column: 4 }}>
                {nfts.map((item) => (
                  <Card
                    style={{ width: 300 }}
                    actions={[
                      <Button onClick={() => showDrawer(item)}>
                        Show NFT
                      </Button>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title={item.primary_asset_contracts[0].name}
                      description={item.primary_asset_contracts[0].symbol}
                    />
                  </Card>
                ))}
              </List>
              <Drawer
                width={600}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{
                    marginBottom: 24,
                  }}
                >
                  NFT details
                </p>
                {nft ? (
                  <Row >
                    <Col span={12}>
                      <Image width={200} src={nft.image_url} />
                    </Col>
                    <Col span={12}>
                      {nft.creator ? (
                        <>
                        <Avatar src={<Image src={nft.creator.profile_img_url} style={{ width: 32 }} />} />
                        <p>{nft.creator.address}</p>
                        </>
                      ) : (
                        <p>No creator</p>
                      )}
                      
                    </Col>
                    
                      <Col span={12}>
                        <DescriptionItem title="Name" content={nft.name} />
                      </Col>
                    
                    <Col span={12}>
                      <DescriptionItem title="Description" content={nft.description} />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="token Id" content={nft.token_id} />
                    </Col>
                  </Row>
                ) : (
                  <p>No NFT found</p>
                )}
              </Drawer>
              {/* <NFTList  nfts={nfts} /> */}
            </>
          ) : (
            <p className="info">Please connect to Metamask</p>
          )}
        </Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}



export default App;
