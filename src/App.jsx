import React, {useState} from 'react';
import {ethers} from 'ethers';
import {Form,Button,Card,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PriceConsumerV3 from './artifacts/contracts/PriceConsumerV3.sol/PriceFeed.json';

function App() {

  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({pairs: ''});
  const {pairs} = item;
  let feedId = 1;

  const contractAddress = '0x7652DE6D2667571448bDdb4Ae021f219350FD49f';

  const ABI = PriceConsumerV3.abi;

const provider = new ethers.providers.Web3Provider(window.ethereum);

// not writing to the blockchain, so no need for signer
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, ABI, signer);

const getPair = async () => {

  switch (pairs) {
    case 'BTC/USD':
      feedId = 1;
      break;
    case 'ETH/USD':
      feedId = 2;
      break;
    case 'LINK/USD':
      feedId = 3;
      break;
    case 'BTC/ETH':
      feedId = 4;
      break;
    default:
      return;
  }

  if(window.ethereum) {
    await window.ethereum.request({method: "eth_requestAccounts"});
  }

  console.log("updating price");
  await contract.updatePrice(feedId);
  console.log("price updated");

  const contractPrice = await contract.getLastFetchedPrice(feedId);
  if(feedId!==4) {
  setStoredPrice('$' + parseInt(contractPrice) / 100000000);
  } else {
    setStoredPrice(parseInt(contractPrice) / 1000000000000000000 + 'ETH');
  }
};

const handleChange = (e) => {
  console.log(e.target.value);
  setStoredPrice('');
  setItem((prevState) => ({
    ...prevState,
    pairs: e.target.value,
  }));
};

const handleSubmit = (e) => {  e.preventDefault();
// alert(`${pairs}`);
};

return ( 
<div className = 'container'>{
  <
  Image src = 'https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png'
  width = {200} height = {200} fluid className = 'mt-5' />}

  <hr></hr> 
  <div >
    <Card style = {{width: '32rem'} }className = 'mt-5 shadow bg-body rounded' >
    <Card.Header as = 'h5' > Conversion Pair </Card.Header> < Card.Body > {' '} < div className = 'col' ><form onSubmit = {handleSubmit} >
      < Form.Group controlId = 'pairs' >
        <Form.Check value = 'BTC/USD'type = 'radio' aria-label = 'radio 1'label = 'BTC/USD'onChange = {handleChange}checked = {pairs === 'BTC/USD'}/> 
        <Form.Check value = 'ETH/USD'type = 'radio' aria-label = 'radio 2'label = 'ETH/USD'onChange = {handleChange}checked = {pairs === 'ETH/USD'}/> 
        <Form.Check value = 'LINK/USD'type = 'radio' aria-label = 'radio 3'label = 'LINK/USD'onChange = {handleChange}checked = {pairs === 'LINK/USD'}/> 
        <Form.Check value = 'BTC/ETH'type = 'radio' aria-label = 'radio 4' label = 'BTC/ETH'onChange = {handleChange}checked = {pairs === 'BTC/ETH'}/>
  </Form.Group> 
  </form> 
  <div className = 'mt-5'>
    <Button variant = 'outline-primary' size = 'sm' type = 'submit' onClick = {getPair} > Get Answer From Price Oracle 
  </Button>
   </div> 
  </div> 
  </Card.Body> 
  </Card>
  <div>
    <Card style = {{width: '32rem'} }className = 'mt-5 shadow bg-body rounded' >
    <Card.Header as = 'h5' > Result </Card.Header> <Card.Body ><div className = 'col' ><h5 > {pairs }➡ {storedPrice} </h5> 
    </div> 
    </Card.Body> 
    </Card> 
  </div> 
  </div> 
  </div>
);
}

export default App;