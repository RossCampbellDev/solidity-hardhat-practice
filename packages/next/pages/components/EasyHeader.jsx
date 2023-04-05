import { ConnectButton } from "web3uikit"

export default function EasyHeader() {
    return (
        <div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}