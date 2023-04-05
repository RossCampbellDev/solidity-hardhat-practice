//import Header from "./components/ManualHeader"
import EasyHeader from "./components/EasyHeader"
import TestingContract from "./components/TestingContract"
//import TestPeople from "./components/TestPeople"
import TestPeopleWithContext from "./components/TestPeopleWithContext"
import React, { useState } from "react"

export const ConnectionContext = React.createContext()

export default function Home() {
    const [owner, setOwner] = useState(null)
    //const [myAbi, setMyAbi] = useState(null)
    //const [myAddr, setMyAddr] = useState(null)
    const [connInfo, setConnInfo] = useState({}) // for use with Context

    const setTheOwner = (s) => {
        console.log(s)
        setOwner(s)
    }

    const setConnection = (abi, addr) => {
        //setMyAbi(abi)
        //setMyAddr(addr)
        console.log(addr)
        setConnInfo({ myAbi: abi, myAddr: addr })
    }

    return (
        <>
            <h1 className="py-4 px-4 font-blog text-3xl">
                Testing lots of stuff
            </h1>

            <div>
                <EasyHeader />
                <TestingContract
                    setOwnerFunc={setTheOwner}
                    setConnFunc={setConnection}
                    owner={owner}
                />
            </div>

            {/*<TestPeople myAbi={abi} myAddr={addr} />*/}
            <ConnectionContext.Provider value={connInfo}>
                <div style={{width: 800+"px"}}><TestPeopleWithContext /></div>
            </ConnectionContext.Provider>
        </>
    )
}
