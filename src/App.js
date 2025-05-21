import { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import AccountButton from './components/AccountButton';
import Posts from './components/posts/Posts';
import PostFormModal from './components/posts/PostFormModal';
import ShowPost from './components/posts/ShowPost';

function App(props) {

  const [web3, setWeb3] = useState()
  const [alephAccount, setAlephAccount] = useState()
  const [walletAddress, setWalletAddress] = useState()

  const [modalOpen, setModalOpen] = useState(false)
 
  const connectWallet = async (e) => {
    const { alephAccount, web3 } = await props.connectWeb3(e)
    const accounts = await web3.eth.getAccounts()

    setWeb3(web3)
    setAlephAccount(alephAccount)
    setWalletAddress(accounts[0])
  }

  useEffect(() => {
   if (window.ethereum.isConnected()) {
     connectWallet()
   }
  }, [])

  const truncateAddress = (address) => {
    return `${address.slice(0,5)}...${address.slice(address.length - 4, address.length)}`
  }


const timeSince = (date) => {
  // if (!(date instanceof Date)) {
  //     date = new Date(date); // Ensure it's a Date object
  // }

  let seconds = Math.floor((new Date() - date) / 1000); // Calculate the difference in seconds

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1) return interval + (interval === 1 ? " yr ago" : " yrs ago");

  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1) return interval + (interval === 1 ? " month ago" : " months ago");

  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) return interval + (interval === 1 ? " day ago" : " days ago");

  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) return interval + (interval === 1 ? " hour ago" : " hours ago");

  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) return interval + (interval === 1 ? " minute ago" : " minutes ago");

  return seconds + (seconds === 1 ? " second ago" : " seconds ago");
};


  return (
    <div className="App">
     <Router>
      {/* <div className="overlay"></div> */}
      <Navbar setModalOpen={setModalOpen} />
      <AccountButton connectWallet={connectWallet} walletAddress={walletAddress} truncateAddress = {truncateAddress} />
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <Switch>
                <Route path="/" exact>
                  <Posts 
                    truncateAddress = {truncateAddress} 
                    timeSince={timeSince}
                    setModalOpen = {setModalOpen}
                    walletAddress = {walletAddress}
                  />
                </Route>
                <Route path="/posts/:item_hash">
                  <ShowPost 
                  timeSince={timeSince}
                  truncateAddress = {truncateAddress}
                  />
                </Route>
            </Switch>
          </div>
        </div>
        </div>
      <PostFormModal 
      alephAccount={alephAccount} 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen}
      />
    </Router>
   </div>
 );
}

export default App;