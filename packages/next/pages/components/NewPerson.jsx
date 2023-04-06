import { useState, useContext } from "react";
import { useWeb3Contract } from "react-moralis"
import { ConnectionContext } from "../index"

export default function NewPerson() {
    const { myAbi: abi, myAddr: contractAddress } = useContext(ConnectionContext)

    let [ name, setName ] = useState("")
    let [ age, setAge ] = useState(0)
    let [ population, setPopulation ] = useState(1)

    const { runContractFunction: addNewPerson } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "newPerson",
        params: { _name: name, _age: age }
    })

    const handleNewPerson = async (tx) => {
        try {
            await tx.wait(1)
            setPopulation(population+1)
            setName("")
            setAge(null)
        } catch (e) {
            console.log(e)
        }
    }

    const onAddNewPerson = async () => {
        addNewPerson()
    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateAge = (e) => {
        setAge(e.target.value)
    }

    const PersonInput = () => (        
        <>
            <p>Name:</p><input 
                className="text-black"
                type="text"
                onChange={updateName}
                value={name}
            />
            <p>Age</p><input 
                className="text-black"
                type="text"
                onChange={updateAge}
                value={age}
            />
        </>
    )

    const AddPersonButton = () => (
        <button
            type="button" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={ async () => 
                await onAddNewPerson({
                    //onComplete:
                    onSuccess: handleNewPerson,
                    onError: (error) => console.log(error),
                })
            }
        >Add Person</button>
    )

    return (
        <>
            <div>
                <PersonInput />
                <AddPersonButton />
            </div>
        </>
    )
}