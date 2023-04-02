import { useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { contractAddresses, abi } from "../../constants"

export default function TestingContract() {
    const {chainId: chainIdInHex, isWeb3Enabled} = useMoralis()    // the header of useMoralis passes the chainId etc to the moralis provider, which passes it back down to components
    const ourChainId = parseInt(chainIdInHex)
    const contractAddress = ourChainId in contractAddresses ? contractAddresses[chainId][0] : null
    
    console.log(`WE ARE NOT THERE`)
    if (contractAddress === null) return

    console.log(`WE ARE HERE ${contractAddress[31337][0]}`)
    let [ owner, setOwner ] = useState(null)

    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[chainId],
        functionName: "owner",
        params: {}//, msgValue: 0
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function showOwner() {
                const theOwner = await getOwner()
                setOwner(theOwner)
                console.log(owner)
            }
            showOwner()
        }
    }, [isWeb3Enabled])


    return (
        <div>The owner is: {owner}!</div>
    )
}