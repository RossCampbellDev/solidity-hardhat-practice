import { useState, useContext } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ConnectionContext } from "../index"

export default function NewPerson() {
    const { myAbi: abi, myAddr: contractAddress } = useContext(ConnectionContext)

    let [ name, setName ] = useState("")
    let [ age, setAge ] = useState(0)
    let [ population, setPopulation ] = useState(1)

    const { isWeb3Enabled } = useMoralis()

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
            <form id='new-person-form'>
                <p className="font-bold">Name:</p><input 
                    className="text-black mt-2"
                    type="text"
                    onChange={updateName}
                    value={name}
                />
                <p className="font-bold mt-2">Age</p><input 
                    className="text-black mt-2"
                    type="text"
                    onChange={updateAge}
                    value={age}
                />
            </form>
        </>
    )

    const AddPersonButton = () => (
        <button
            type="button" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto mt-4"
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
            <div className="bg-teal-950 m-8 p-6 w-fit">
                {/* <PersonInput /> */}
                {PersonInput()}
                <AddPersonButton />
            </div>
        </>
    )
}