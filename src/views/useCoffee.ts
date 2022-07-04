import abi from "../../utils/BuyMeACoffee.json";
import { ethers } from "ethers";
const contractAddress = "0x67CF214Df6338F9a02F447fF89F810E54fC785Be";
const contractABI = abi.abi;
import { useEffect, useState } from "react";
interface Memo {
  from: string
  timestamp: any
  name: string
  message: string
}
export const useCoffee = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState<Memo[]>([]);
  const [balance, useBalance] = useState(0);
  const commonConnect = () => {
    return new Promise<ethers.Contract>((resolve, reject) => {
      const { ethereum } = window;
      console.log(ethereum);
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(buyMeACoffee);
        resolve(buyMeACoffee);
      } else {
        reject(new Error("no ethereum in window"));
      }
    });
  };
  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const balanceBigInt = await provider.getBalance(contractAddress);
    useBalance(+ethers.utils.formatEther(balanceBigInt));
    console.log(ethers.utils.formatEther(balanceBigInt));
  };
  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("please install MetaMask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      getMemos()
    } catch (error) {
      console.log(error);
    }
  };

  const buyCoffee = async (value = 0.001) => {
    if(!name || !message) {
      window.alert("form required");
      return
    }
    const buyMeACoffee = await commonConnect();
    const coffeeTxn = await buyMeACoffee.buyCoffee(
      name ? name : "anon",
      message ? message : "Enjoy your coffee!",
      { value: ethers.utils.parseEther(value + "") }
    );
    await coffeeTxn.wait();
  };
  const getMemos = async () => {
    const buyMeACoffee = await commonConnect();
    const memos = await buyMeACoffee.getMemos();
    setMemos(
      memos /* .map(item => ({
      ...item,
      timestamp: ethers.utils.formatEther(item.timestamp._hex)
    })) */
    );
    console.log(memos);
  };
  const withdraw = async () => {
    console.log(contractAddress, currentAccount);
    if (balance <= 0) {
      window.alert("address doesnt have any eth!");
      return;
    }
    const buyMeACoffee = await commonConnect();
    console.log(buyMeACoffee);
    
    const withdrawTxn = await buyMeACoffee.withdrawTips();
    await withdrawTxn.wait();
    getBalance();
  };
  const onMemo = async () => {};
  useEffect(() => {
    let buyMeACoffee: any;
    isWalletConnected();
    getMemos();
    getBalance();
    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from: string, timestamp: any, name: string, message: string) => {
      console.log("Memo received: ", from, timestamp, name, message);
      getBalance();
      setMemos((prevState) => {
        if (prevState.some((item) => item.timestamp._hex === timestamp._hex)) {
          return prevState;
        }
        return [
          ...prevState,
          {
            from,
            timestamp,
            message,
            name,
          },
        ];
      });
    };

    commonConnect().then((res) => {
      buyMeACoffee = res;
      console.log(1233);
      buyMeACoffee.on("NewMemo", onNewMemo);
    });
    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    };
  }, []);
  return {
    withdraw,
    connectWallet,
    isWalletConnected,
    buyCoffee,
    getMemos,
    currentAccount,
    setCurrentAccount,
    name,
    setName,
    message,
    setMessage,
    memos,
    setMemos,
  };
};
