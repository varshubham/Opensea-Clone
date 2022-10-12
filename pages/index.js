import { useAddress,useMetamask } from "@thirdweb-dev/react"
import Main from '../components/Home'

const style = {
    wrapper:`flex h-screen items-center justify-center`,
    connectWalletButton:`rounded-lg border border-black px-10 py-5 transition-all hover:bg-black hover:text-white`
}

export default function Home() {

  const connectwithmetamask = useMetamask();
  const address = useAddress();
  console.log(address);
  
  const Auth=()=>{
    return(
      <div className={style.wrapper}>
        <button className={style.connectWalletButton} onClick={connectwithmetamask}>connect Metamask</button>
      </div>
    )
  }
  return (
    <>
    {address ? <Main/> : Auth()}
    </>
  )
}

