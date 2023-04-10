import { useEffect, useState, useContext } from "react"
import { ConnectionContext} from "../../debug"
import { useWeb3Contract } from "react-moralis"


export default function GetRoundData() {
    const { abi: abi, addr: contractAddress, isWeb3Enabled } = useContext(ConnectionContext)

    const [ roundData, setRoundData ] = useState()
    const [ checking, setChecking ] = useState(false)

    const { runContractFunction: getRoundData } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getRoundData",
        params: {}
    })

    const updateRoundData = async (tx) => {
        let rd;
        try {
            await tx.wait(1)
        } catch(e) {
            console.log(e)
        }
        rd = (await getRoundData()).toString()
        setRoundData(rd)
        setChecking(false)
    }

    const RoundDataButton = () => (
        <button
            type="button" 
            className="bg-teal-700 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={ async () => await getRoundData({
                    onComplete: setChecking(true),
                    onSuccess: updateRoundData,
                    onError: (error) => console.log(error),
                })
            }
            disabled={checking}
        >{ checking ? ('(fetching...)') : ('Fetch Round Data') }</button>
    )


    return (
        <>
        <div className="bg-zinc-950 m-2 p-4 border-b-2 border-slate-600"><h1 className="text-2xl">Price Aggregator Round Data</h1>
            { roundData ? (
                <h3 className="text-xl">Data: {roundData}</h3>
            ) : ( <></> )}

            <RoundDataButton />
        </div>
        </>
    )
}