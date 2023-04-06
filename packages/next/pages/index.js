//import Header from "./components/ManualHeader"
import EasyHeader from "./components/EasyHeader"
import TestingContract from "./components/TestingContract"
import DisplayPeople from "./components/DisplayPeople"
import NewPerson from "./components/NewPerson"
import React, { useState } from "react"
import { useMoralis } from "react-moralis"

export const ConnectionContext = React.createContext()

export default function Home() {
    const [owner, setOwner] = useState(null)
    const [connInfo, setConnInfo] = useState({})
    const { isWeb3Enabled } = useMoralis()

    const setTheOwner = (s) => {
        setOwner(s)
    }

    const setConnection = (abi, addr) => {
        setConnInfo({ myAbi: abi, myAddr: addr })
    }

    return (
        <>
            <h1 className="py-4 px-4 font-blog text-3xl">
                Testing lots of stuff
            </h1>

            <EasyHeader />

            <div>
                <TestingContract
                    setOwnerFunc={setTheOwner}
                    setConnFunc={setConnection}
                    owner={owner}
                />
            </div>

            {isWeb3Enabled ? (
                <>
                    <ConnectionContext.Provider value={connInfo}>
                        <DisplayPeople />
                        <NewPerson />
                    </ConnectionContext.Provider>
                </>
            ) : (
                <div>No Conn</div>
            )}
        </>
    )
}
