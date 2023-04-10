import { useState, useContext } from "react";
import { useWeb3Contract } from "react-moralis"
import { ConnectionContext } from "../index"

export default function NewPerson() {
    const { abi: abi, addr: contractAddress, callbackFunc: updatePopulation, isWeb3Enabled } = useContext(ConnectionContext)

    let [ name, setName ] = useState("")
    let [ age, setAge ] = useState(0)

    const { runContractFunction: addNewPerson, data: txResponse } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "newPerson",
        params: { _name: name, _age: age }
    })

    const handleNewPerson = async (tx) => {
        try {
            await tx.wait(1)
            setName("")
            setAge("")
            await updatePopulation()
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
            className="bg-teal-700 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={ async () => 
                await addNewPerson({
                    // onComplete: console.log(`complete!`),
                    onSuccess: handleNewPerson,
                    onError: (error) => console.log(error),
                })
            }
        >Add Person</button>
    )

    return (
        <>
            { isWeb3Enabled ? (
                <div className="bg-teal-950 m-2 p-4 w-fit">
                    {PersonInput()}
                    <AddPersonButton />
                </div>
            ) : (
                <div>COnnection Required</div>
            )}
        </>
    )
}