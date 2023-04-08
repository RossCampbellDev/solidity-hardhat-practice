import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Web3Connector() {
    return (
        <nav>
            <Link href="/"><a>Home</a></Link>
            <Link href="/new-person"><a>New Person</a></Link>
            
            <div style={{ position: "fixed", top: 10 + "px", right: 4 + "px" }}>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}