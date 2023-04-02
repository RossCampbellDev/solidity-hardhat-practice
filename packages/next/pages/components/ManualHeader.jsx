import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, deactivateWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading } = useMoralis()

    const goConnect = async () => {
        await enableWeb3()
        if (typeof window !== "undefined")
            window.localStorage.setItem("connected", "injected");   // set a var on client side that says the variable "connected" is now set to "injected".  could be anything.
    }

    // watch the Moralis "isWeb3Enabled" attribute for changes.  if we're aleady connected, enableWeb3 on re-render.  if not, do nothing
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected") === "injected")
                enableWeb3()
        }
        if (isWeb3Enabled) return
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <div>
            {account ? (<div>Connected to:<br/>{account}</div>) : (
                <button 
                    onClick={goConnect}
                    disabled={isWeb3EnableLoading}
                >Connect</button>
            )}
        </div>
    )
}