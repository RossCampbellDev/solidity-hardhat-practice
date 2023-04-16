import { useContext, useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { ConnectionContext } from "../../debug"

export default function Minter(props) {
    const { abi: abi, addr: contractAddress, isWeb3Enabled } = useContext(ConnectionContext)
    const [ balance, setBalance ] = useState()
    const [ waitingForMint, setwaitingForMint ] = useState(false)

    const { runContractFunction: getBalance } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "balance",
        params: {}
    })

    const { runContractFunction: goMint } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "mint",
        params: {}
    })

    const updateUI = async (tx) => {
        try {
            await tx.wait(1)
        } catch(e) {
            console.log(e)
        }
        const bal = (await getBalance()).toString()
        setBalance(bal)
        setwaitingForMint(false)
    }

    const GoMinterButton = () => (
        <button
            type="button" 
            className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={ async () => 
                await goMint({
                    onComplete: setwaitingForMint(true),
                    onSuccess: updateUI,
                    onError: (error) => console.log(error),
                })
            }
            disabled={waitingForMint}
        >{ waitingForMint ? ('(minting...)') : ('Mint Token') }</button>
    )

    const CheckBalanceButton = () => (
        <button
            type="button" 
            className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={ async () => 
                await getBalance({
                    onComplete: setwaitingForMint(true),
                    onSuccess: updateUI,
                    onError: (error) => console.log(error),
                })
            }
            >{ waitingForMint ? ('(checking...)') : ('Check Balance') }</button>
    )

    return (
        <>
            <div className="bg-zinc-950 m-2 p-4 border-b-2 border-slate-600"><h1 className="text-2xl">Mint Tokens and check balance</h1>
                { balance ? (
                    <h3 className="text-xl">Balance: {balance}</h3>
                ) : ( <></> )}

                { props.owner ? (
                    <>
                        <GoMinterButton />
                        <CheckBalanceButton />
                    </>
                ) : (
                    <p>Need to be the contract owner to run this</p>
                ) }
            </div>
        </>
    )
}