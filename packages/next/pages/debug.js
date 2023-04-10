import HeaderNav from "./components/HeaderNav"
import React, { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import Minter from "./components/debug/Minter"

export const ConnectionContext = React.createContext()

export default function Debug() {
    const {chainId: chainIdInHex, isWeb3Enabled} = useMoralis() // the header of useMoralis passes the chainId etc to the moralis provider, which passes it back down to components
    const ourChainId = parseInt(chainIdInHex)
    const contractAddress = ourChainId in contractAddresses ? contractAddresses[ourChainId][0] : null

    const [connInfo, setConnInfo] = useState({})

    const setConnection = (abi, addr) => {
        setConnInfo({ abi: abi, addr: addr, isWeb3Enabled: isWeb3Enabled })
    }

    return (
        <>
            <div className="container xl px-6 items-center">
                <HeaderNav />

                {isWeb3Enabled ? (
                    <>
                        <ConnectionContext.Provider value={connInfo}>
                            {/* mint func - isOwner */}
                            <Minter />
                            {/* getPerson(n) */}
                            {/* convertEthtoUsd(x) */}
                            {/* getRoundData */}
                        </ConnectionContext.Provider>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}
