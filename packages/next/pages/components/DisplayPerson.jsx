import { useContext, useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { ConnectionContext } from "../index"

export default function DisplayPerson(props) {
    const { abi: abi, addr: contractAddress, isWeb3Enabled, callbackFunc: updatePopulation } = useContext(ConnectionContext)

    const [ name, setName ] = useState("")
    const [ age, setAge ] = useState(0)
    const [ address, setAddress ] = useState("")
    const [ selectedPerson, setSelectedPerson ] = useState("")

    const { runContractFunction: getPerson } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPerson",
        params: {n: props.id}
    })

    const { runContractFunction: deletePerson } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "deletePerson",
        params: {n: selectedPerson}
    })

    useEffect(() => {
        if (isWeb3Enabled) {
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

    async function makeCallback() {
        await updatePopulation()
    }

    const deleteThisPerson = async (n) => {
        setSelectedPerson(n)
        deletePerson({
            onSuccess: makeCallback
        })
    }

    return (
        <>
            <div className="bg-zinc-950 m-2 p-2 hover:bg-zinc-700">
                <div>
                    <div id="name" className="font-bold">{name}, {age}</div>
                </div>
                
                <div>
                    <div id="address">{address}</div>
                </div>

                <div className="cursor-pointer hover:underline hover:decoration-sky-500"
                    onClick={() => deleteThisPerson(props.id)}
                    >Delete
                </div>
            </div>
        </>
    )
}