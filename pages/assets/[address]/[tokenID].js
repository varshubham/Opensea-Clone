import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAddress} from "@thirdweb-dev/react"
import { BigNumber } from "ethers"
import TopNavbarLayout from "../../../layouts/TopNavbarLayout"
import { useContract } from "@thirdweb-dev/react"
import NFTImage from '../../../components/NFTDetails/NFTImage'
import NFTSalesInfo from "../../../components/NFTDetails/NFTSalesInfo"
import NFTDetails from "../../../components/NFTDetails/NFTDetail"
import NFTBasicInfo from "../../../components/NFTDetails/NFTBasicInfo"



const style = {
    wrapper:`h-[100vh] mx-auto flex max-w-2xl flex-col space-y-4 py-4 bg-[#202226] lg:max-w-none lg:py-8 px-24`,
    nftContainer:`flex flex-col lg:flex-row lg:space-x-4`,
    leftContainer:`flex flex-col space-y-4`,
    leftElement:`hidden lg:block`,
    rightContainer:`flex flex-1 flex-col space-y-4`,
    buyoutContainer:`flex-1`

}

const NFT = () => {
    const [listing,setListing] = useState()
    const [ff, setFf] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    const {tokenID} =router.query

    const marketplace = useContract("0x5C949F703fdAee66bb0DB254969fCFa42d44D779", "marketplace").contract
    const address = useAddress();

    useEffect(()=>{
            getListing();
    },[ff])
    useEffect(()=>{
        if(!address){
            router.replace('/')
        }
    },[address])
    const getListing = async () => {

        if (marketplace === undefined) {
            setInterval(() => {
                if (ff) {
                    setFf(false)
                }
                else {
                    setFf(true)
                }
            }, 3000);

        }
        else {
            setLoading(true)
            const listing = await marketplace.getListing(BigNumber.from(tokenID));
            setListing(listing)
            setLoading(false)
            console.log(listing)
        }      
        
    }

    const buyNFT = async()=>{
        await marketplace.buyoutListing(tokenID,1)
    }

    return (
        <TopNavbarLayout>
            <div className={style.wrapper}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={style.nftContainer}>
                        <div className={style.leftContainer}>
                            <div className={style.leftElement}>
                                <NFTImage image={listing?.asset?.image} />
                            </div>
                            <div className={style.leftElement}>
                                <NFTDetails/>
                            </div>
                        </div>
                        <div className={style.rightContainer}>
                                <NFTBasicInfo name={listing?.asset?.name}/>
                            <div className={style.buyoutContainer}>
                                <NFTSalesInfo price={listing?.buyoutCurrencyValuePerToken?.displayValue} buyNFT={buyNFT}/>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </TopNavbarLayout>
    )
}
export default NFT