import { useContext, useEffect, useState } from "react"
import { useWeb3Contract, isWeb3Enabled, useMoralis } from "react-moralis"
import { ConnectionContext } from "../index"

export default function DisplayPerson(props) {
    const { myAbi: abi, myAddr: contractAddress } = useContext(ConnectionContext)

    const [ name, setName ] = useState("")
    const [ age, setAge ] = useState(0)
    const [ address, setAddress ] = useState("")

    const { isWeb3Enabled } = useMoralis()

    const { runContractFunction: getPerson } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPerson",
        params: {n: props.id}
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            console.log(`addr: ${contractAddress}\n${abi}`)
            getThePerson()
        }
    }, [])

    async function getThePerson() {
        const p = (await getPerson()).toString()
        if (p) {
            setName(p.split(',')[1])
            setAge(p.split(',')[2])
            setAddress(p.split(',')[3])
        }
    }

    return (
        <>
            <div>
                <label for="name">Name:</label>
                <div id="name">{name}</div>
            </div>
            
            <div>
                <label for="age">Age:</label>
                <div id="age">{age}</div>
            </div>
            
            <div>
                <label for="address">Address:</label>
                <div id="address">{address}</div>
            </div>  
        </>
    )
}