import { useContext, useEffect, useState } from "react"
import { useWeb3Contract, isWeb3Enabled, useMoralis } from "react-moralis"
import { ConnectionContext } from "../index"
import DisplayPerson from "./DisplayPerson"

export default function DisplayPeople() {
    const { myAbi: abi, myAddr: contractAddress } = useContext(ConnectionContext)
    const [population, setPopulation] = useState(0)
    const [allPeopleComponents, setAllPeopleComponents] = useState([])

    const { isWeb3Enabled } = useMoralis()

    const { runContractFunction: getPopulation } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPopulation",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            console.log(`contract: ${contractAddress}\nABI: ${abi}`)
            async function go() {
                const p = (await getPopulation())
                setPopulation(p)
                console.log(`set pop to ${p}`)
                buildAllPeople()
            }            
            go()
        }
    }, [isWeb3Enabled])

    const buildAllPeople = () => {
        let people = []
        for (let i = 0; i <= population; i++) {
            people.push(<DisplayPerson key={i} id={i} />)
        }
        setAllPeopleComponents([people])
    }

    return (
        <>
            { (population > 0) ? (
                <div className="bg-lime-950 m-8">{ allPeopleComponents }</div>
            ) : (
                <div>No People!</div>
            )}
        </>
    )
}