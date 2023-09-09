import {
    useAccount,
    useConnect,
    useDisconnect,
    // useBalance,
  } from 'wagmi'

import logo from "../../images/logo.svg";
import styles from "./Header.module.scss";


const Header = () => {
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address,  isConnected, status  } = useAccount();
   
//   const {data} = useBalance({
//     address: "0x81ddf288626BF9a354627A824bb9746f9eFC4790",
//     // token: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
//   });

    
    



      const { disconnect } = useDisconnect();


 
  return (
<header className={styles.header}>
  <div className={`container ${styles.header__wrap}`}>
    <a className={styles.header__linkLogo} href="/">
      <img src={logo} alt="logo" width={35} height={20} />
    </a>
    
    {isConnected ? (
      <div>
        <div style={{ color: "white" }}>{address}</div>
        <div style={{ color: "white" }}>{status}</div>
        {/* <div style={{ color: "white" }}> {data?.formatted} {data?.symbol}</div> */}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    ) : (
      connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
        </button>
      ))
    )}
    {error && <div style={{ color: "white" }}>{error.message}</div>}
  </div>
</header>
  );
};

export default Header;

// const { connect, connectors, error, isLoading, pendingConnector } =
//   useConnect();
// const { disconnect } = useDisconnect();

// if (isConnected) {
//   return (
//     <div>
//       <img src={ensAvatar} alt="ENS Avatar" />
//       <div>{ensName ? `${ensName} (${address})` : address}</div>
//       <div>Connected to {connector.name}</div>
//       <button onClick={disconnect}>Disconnect</button>
//     </div>
//   );
// }
