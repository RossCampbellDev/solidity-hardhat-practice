import { useState, useEffect, useContext } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ConnectionContext } from "../index"

export default function TestPeopleWithContext() {
    const {isWeb3Enabled} = useMoralis() 
    
    let [ person, setPerson ] = useState(null)
    let [ name, setName ] = useState("")
    let [ age, setAge ] = useState(0)
    let [ population, setPopulation ] = useState(1)
    let [ selectedPerson, setSelectedPerson ] = useState(0)
    
    const { myAbi: abi, myAddr: contractAddress } = useContext(ConnectionContext)

    const { runContractFunction: getPerson } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPerson",
        params: {n: selectedPerson}
    })

    const { runContractFunction: addNewPerson } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "newPerson",
        params: { _name: name, _age: age }
    })

    const { runContractFunction: getPopulation } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPopulation",
        params: {}//, msgValue: 0
    })

    useEffect(() => {
        if (isWeb3Enabled && person) {
            showInfo()
        }
    }, [isWeb3Enabled, selectedPerson])
    
    async function showInfo() {
        if (contractAddress) {
            const thePopulation = (await getPopulation()).toString()
            const thePerson = (await getPerson()).toString()
            setPopulation(thePopulation)
            if (!(selectedPerson > population))
                setPerson(thePerson)
        }
    }

    const handleNewPerson = async (tx) => {
        try {
            await tx.wait(1)
            setPopulation(population+1)
            await showInfo()
            setName("")
            setAge(null)
        } catch (e) {
            console.log(e)
        }
    }

    const updateName = (e) => {
        console.log("update")
        setName(e.target.value)
    }

    const updateAge = (e) => {
        setAge(e.target.value)
    }

    const onAddNewPerson = async () => {
        addNewPerson()
    }

    function changePop(e) {
        if (!(e.target.value > population)) {
            setSelectedPerson(e.target.value)
            showInfo()
        }
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

    const ShowInfoButton = () => (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            type="button"
            onClick={ async () => await showInfo() }
        >update info</button>)

    const createPeopleOptions = () => {
        const options = []

        //(await getPerson(i)).split(',')[1]
        for (let i=0; i<=population; i++) {
            options.push(
                <option key={i} value={i}>
                    { i }
                </option>
            )
        }
        return options
    }

    return (
        <>
            <div className="p-5 border-b-2 rounded-3xl bg-teal-800">
                { person ? (
                        <div><h3 className="py-4 px-4 font-blog text-2xl">Selected Person:</h3> 
                            [{ parseInt(selectedPerson.toString())+1 }/{ parseInt(population.toString())+1 }]&nbsp;
                            { person.split(',')[1] } - { person.split(',')[3] }</div>
                    ) : ( 
                        <div>No Person</div>
                    )
                }
                
                <div>
                    <PersonInput />
                    <AddPersonButton />
                    <br/>
                    <select
                        className="text-black"
                        onChange={changePop}>
                            {createPeopleOptions()}
                    </select>
                    <ShowInfoButton />
                </div>
            </div>
        </>
    )
}