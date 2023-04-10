//import Header from "./components/ManualHeader"
import HeaderNav from "./components/HeaderNav"
import TestingContract from "./components/TestingContract"
import DisplayPeople from "./components/DisplayPeople"
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
        setConnInfo({ abi: abi, addr: addr, isWeb3Enabled: isWeb3Enabled })
    }

    return (
        <>
            <div className="container xl px-6 items-center">
                <HeaderNav />

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
                        </ConnectionContext.Provider>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}
