import { useContext, useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { ConnectionContext } from "../../debug"

export default function DisplayPerson(props) {
    const { abi: abi, addr: contractAddress, isWeb3Enabled } = useContext(ConnectionContext)

    const [ balance, setBalance ] = useState(0)

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

    async function handleMinting() {
        const bal = (await getBalance()).toString()
        setBalance(bal)
    }

    const GoMinterButton = () => (
        <button
            type="button" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={ async () => 
                await goMint({
                    onSuccess: handleMinting,
                    onError: (error) => console.log(error),
                })
            }
        >Mint Token</button>
    )

    return (
        <>
            <div className="">
                <p>{balance}</p>
                <GoMinterButton />
            </div>
        </>
    )
}