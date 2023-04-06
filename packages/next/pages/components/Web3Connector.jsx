import { ConnectButton } from "web3uikit"

export default function Web3Connector() {
    return (
        <div style={{ position: "fixed", top: 10 + "px", right: 4 + "px" }}>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}