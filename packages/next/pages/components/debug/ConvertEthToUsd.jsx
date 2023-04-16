import { useContext, useState, useEffect } from "react"
import { ConnectionContext } from "../../debug"
import { useWeb3Contract } from "react-moralis"
//const { ethers } = require("ethers")

export default function ConvertEthToUsd() {
    const { abi: abi, addr: contractAddress, isWeb3Enabled } = useContext(ConnectionContext)

    const [ converting, setConverting ] = useState(false)
    const [ amountInEth, setAmountInEth ] = useState(1)
    const [ amountInUsd, setAmountInUsd ] = useState()
    const [ exchangeRate, setExchangeRate ] = useState()

    const { runContractFunction: goConvertEthToUsd } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "convertEthToUsd",
        params: { _amount: amountInEth }
    })

    useEffect(() => {
        async function directExchange() {
            try {
                const er = (await goConvertEthToUsd()).toString()
                setExchangeRate(er)
            } catch(e) {
                ""
            }
        }
        if (isWeb3Enabled)
            directExchange()
    }, [isWeb3Enabled])

    const updateUI = async(tx) => {
        try {
            await tx.wait(1)
        } catch(e) {
            ""
        }
        const amount = (await goConvertEthToUsd()).toString()
        setAmountInUsd(amount)
        setConverting(false)
    }

    function updateAmountInEth(e) {
        const n = e.target.value
        Number.isInteger(Number(n)) ? (
            setAmountInEth(e.target.value)
        ) : (
            setAmountInEth(1)
        )
        updateUI()
    }

    const EthInput = () => (
        <div>
            <input
                className="text-black mt-2"
                type="text"
                onChange={updateAmountInEth}
                value={amountInEth}
            />
        </div>
    )

    const ConvertButton = () => (
        <button
            type="button" 
            className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={ async () => 
                await goConvertEthToUsd({
                    onComplete: setConverting(true),
                    onSuccess: updateUI,
                    onError: (error) => console.log(error),
                })
            }
            disabled={converting}
        >{ converting ? ('(checking...)') : ('Convert') }</button>
    )

    return (
        <>
            <div className="bg-zinc-950 m-2 p-4 border-b-2 border-slate-600"><h1 className="text-2xl">Convert ETH to USD</h1>
                { exchangeRate ? (
                    <>
                        <h3 className="text-xl">ETH 1 ▶️ ${exchangeRate}</h3>
                        { (amountInEth > 1) ? (
                            <h3 className="text-xl">ETH {amountInEth} ▶️ ${amountInUsd}</h3>
                        ) : (<></>)}
                    </>
                ) : ( <></> )}

                {EthInput()}
                <ConvertButton />
            </div>
        </>
    )
}