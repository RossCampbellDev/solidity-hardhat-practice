import { useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { contractAddresses, abi } from "../../constants"

export default function TestingContract(props) {
    const {chainId: chainIdInHex, isWeb3Enabled} = useMoralis()    // the header of useMoralis passes the chainId etc to the moralis provider, which passes it back down to components
    const ourChainId = parseInt(chainIdInHex)
    const contractAddress = ourChainId in contractAddresses ? contractAddresses[ourChainId][0] : null
    
    useEffect(() => {
        if (isWeb3Enabled) {
            async function showInfo() {
                const theOwner = (await getOwner()).toString()
                getOwnerFunc(theOwner)  // from props
                getConnFunc(abi, contractAddress)
            }
            showInfo()
        }
    }, [isWeb3Enabled])
    
    const { getOwnerFunc, getConnFunc } = props;

    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "owner",
        params: {}//, msgValue: 0
    })

    return (
        <>
            <div style={{ padding: 20 + "px", backgroundColor:  "#191511" }}>
            { props.owner ? (<div><h3>The owner is:</h3> {props.owner}!</div>) : (<div>No Owner</div>)}
            </div>
        </>
    )
}