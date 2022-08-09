import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [haveMetamask, setHaveMetamask] = useState(true);

  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');

  const [isConnected, setIsConnected] = useState(false);

  const [network, setNetwork] = useState('');

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const checkMetamaskAvailability = async () => {
    if (!ethereum) {
      setHaveMetamask(false);
    } else {
      setHaveMetamask(true);
    }
  }

  const connectWallet =async () => {
    try {
      if (!ethereum){
        throw new Error('No metamask found');
        setHaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      let network = await provider.getNetwork();

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setNetwork(network.name);
      setIsConnected(true);

    }catch(error) {
      console.log(error);
      isConnected(false);
    }
  }

  useEffect(() => {
    checkMetamaskAvailability();
    
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
                  <button onClick={connectWallet}>Connect</button>
                </div>
              </div>  
						)}

						{isConnected ? (
							<p className="info">🎉 Connected Successfully to {network}</p>
						) : (
							<p className="info">Please connect to Metamask</p>
						)}
					</div>
				) : (
					<p>Please Install MataMask</p>
				)}
			</header>
    </div>
  );
}

export default App;
