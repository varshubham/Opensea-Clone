import { useEffect, useState } from "react"
// import Link from 'next/link'
import { useContract } from '@thirdweb-dev/react'
import NFTCard from "./NFTCard"
import Link from 'next/link'


const style = {
    wrapper: 'mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 md:drid-cols-2 md:pt-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 '
}

const Listing = () => {

    // const market = useContract<Marketplace>("0x5C949F703fdAee66bb0DB254969fCFa42d44D779")

    const [listings, setListings] = useState([])
    const [ff, setFf] = useState(false)
    const marketplace = useContract("0x5C949F703fdAee66bb0DB254969fCFa42d44D779", "marketplace").contract
    useEffect(() => {
        getListings();
    }, [ff])
    const getListings = async () => {

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
            const list = await marketplace.getActiveListings();
            setListings(list)
            console.log(listings)
            console.log(" listing")
        }

    }
    return (
        <div className={style.wrapper}>
            {listings.length>0 ? (
                <>
                    {listings?.map((listing,index)=>(
                        
                        <Link
                        key={index}
                        href={`/assets/${listing.assetContractAddress}/${listing.id}`}
                        >
                            <a>
                                <NFTCard listing={listing}/>
                            </a>
                        </Link>
                    ))}
                </>
            ) : (
                <div>Loading....</div>
            )}
        </div>
    )
}

export default Listing