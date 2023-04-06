import { useContext, useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { ConnectionContext } from "../index"
import DisplayPerson from "./DisplayPerson"

export default function DisplayPeople() {
    const { myAbi: abi, myAddr: contractAddress, isWeb3Enabled } = useContext(ConnectionContext)
    const [population, setPopulation] = useState(0)
    const [allPeopleComponents, setAllPeopleComponents] = useState([])

    const { runContractFunction: getPopulation } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPopulation",
        params: {}
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function go() {
                try {
                    const p = (await getPopulation()).toString()
                    setPopulation(p)
                    buildAllPeople()
                } catch(e) {
                    console.log(e)
                }
            }            
            go()
        }
    }, [isWeb3Enabled, population])

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
                <>{ allPeopleComponents }</>
            ) : (
                <div>No People!</div>
            )}
        </>
    )
}