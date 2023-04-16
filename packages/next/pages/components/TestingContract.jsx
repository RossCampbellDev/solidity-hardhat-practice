import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../../constants"
import { networkConfig } from "../../../hardhat/helper-hardhat-config"

export default function TestingContract(props) {
    const {chainId: chainIdInHex, isWeb3Enabled} = useMoralis() // the header of useMoralis passes the chainId etc to the moralis provider, which passes it back down to components
    const ourChainId = parseInt(chainIdInHex)
    const contractAddress = ourChainId in contractAddresses ? contractAddresses[ourChainId][0] : null

    const [ networkName, setNetworkName ] = useState("")

    const { setOwnerFunc, setConnFunc, owner } = props;
    
    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "owner",
        params: {}//, msgValue: 0
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            setNetworkName(ourChainId in networkConfig ? networkConfig[ourChainId]["name"] : "X")

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
            <div className="p-5 flex flex-row">
            { owner ? 
                (
                    <div><h3 className="font-blog text-xl text-emerald-600">Connected To Contract:</h3>{contractAddress}<h3 className="font-blog text-xl text-emerald-600">Network:</h3>{networkName}</div>
                ) : (
                    <div>Not Connected To A Contract</div>
                )}
            </div>
        </>
    )
}