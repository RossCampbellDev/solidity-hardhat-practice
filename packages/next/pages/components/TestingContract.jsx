import { useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../../constants"

export default function TestingContract(props) {
    const {chainId: chainIdInHex, isWeb3Enabled} = useMoralis()    // the header of useMoralis passes the chainId etc to the moralis provider, which passes it back down to components
    const ourChainId = parseInt(chainIdInHex)
    const contractAddress = ourChainId in contractAddresses ? contractAddresses[ourChainId][0] : null
    
    const { setOwnerFunc, setConnFunc, owner } = props;
    
    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "owner",
        params: {}//, msgValue: 0
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function callContract() {
                try {
                    const o = (await getOwner()).toString() // ok so this promise needs to be returned to a variable before we can call in function
                    setOwnerFunc(o)
                    setConnFunc(abi, contractAddress)
                } catch (e) {
                    console.log(e)
                }
            }
            callContract()
        }
    }, [isWeb3Enabled])
    

    return (
        <>
            <div className="p-5 border-b-2 flex flex-row">
            { owner ? 
                (
                    <><div><h3 className="py-4 px-4 font-blog text-2xl">The owner is:</h3>{owner}!<br/>
                    <h3 className="py-4 px-4 font-blog text-2xl">Contract:</h3>{contractAddress}</div></>
                ) : (
                    <div>No Owner</div>
                )}
            </div>
        </>
    )
}