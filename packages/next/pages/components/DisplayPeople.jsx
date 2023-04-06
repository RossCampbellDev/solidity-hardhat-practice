import { useContext, useEffect, useState } from "react"
import { useWeb3Contract, isWeb3Enabled } from "react-moralis"
import { ConnectionContext } from "../index"
import DisplayPerson from "./DisplayPerson"

export default function DisplayPeople() {
    const { myAbi: abi, myAddr: contractAddress } = useContext(ConnectionContext)
    const [population, setPopulation] = useState(0)
    const [allPeopleComponents, setAllPeopleComponents] = useState({})

    useEffect(() => {
        async function go() {
            const p = (await getPopulation())
            setPopulation(p)
            console.log(`set pop to ${p}`)
            buildAllPeople()
        }
        if (isWeb3Enabled)
            go()
    }, [])

    const { runContractFunction: getPopulation } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPopulation",
        params: {},
    })

    const buildAllPeople = () => {
        let people = []
        for (let i = 0; i <= population; i++) {
            people.push(<DisplayPerson id={i} />)
        }
        setAllPeopleComponents([people])
    }

    return (
        <>
            { Object.keys(allPeopleComponents).length > 0 ? (
                <div>{allPeopleComponents}</div>
            ) : (
                <div>No People!</div>
            )}
        </>
    )
}