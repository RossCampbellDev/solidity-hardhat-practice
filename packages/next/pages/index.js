import styles from "@/styles/Home.module.css"
import App from "./_app"
import Header from "./components/ManualHeader"
import EasyHeader from "./components/EasyHeader"
import TestingContract from "./components/TestingContract"
import TestPeople from "./components/TestPeople"
import TestPeopleWithContext from "./components/TestPeopleWithContext"
import React, { useState, useContext } from "react"

export const ConnectionContext = React.createContext()

export default function Home() {
    const [owner, setOwner] = useState(null)
    const [myAbi, setMyAbi] = useState(null)
    const [myAddr, setMyAddr] = useState(null)
    const [connInfo, setConnInfo] = useState({})

    const testingFunction = (s) => {
        setOwner(s)
    }

    const getConnection = (abi, addr) => {
        setMyAbi(abi)
        setMyAddr(addr)
        setConnInfo({ myAbi: abi, myAddr: addr })
    }

    return (
        <>
            <h1>Testing lots of stuff</h1>

            <div style={{ padding: 20 + "px" }}>
                <EasyHeader />
                <TestingContract
                    getOwnerFunc={testingFunction}
                    getConnFunc={getConnection}
                    owner={owner}
                />
            </div>

            {/*<TestPeople myAbi={abi} myAddr={addr} />*/}
            <ConnectionContext.Provider value={connInfo}>
                <TestPeopleWithContext />
            </ConnectionContext.Provider>
        </>
    )
}
