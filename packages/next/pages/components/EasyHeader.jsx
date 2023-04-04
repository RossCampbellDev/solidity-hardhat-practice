import { ConnectButton } from "web3uikit"
import { useMoralis } from "react-moralis"

export default function EasyHeader() {

    return (
        <div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}