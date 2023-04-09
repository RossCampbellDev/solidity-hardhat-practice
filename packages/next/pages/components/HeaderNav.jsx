import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function HeaderNav() {
    return (
        <>
            <h1 className="py-4 px-4 font-blog text-5xl font-bold">The Big People Test</h1>
            <nav>
                <div className="border-b-2 flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <Link href="/" className="mr-4 p-6">Home</Link>
                        <Link href="/new-person" className="mr-4 p-6">New Person</Link>
                        <ConnectButton moralisAuth={false} />
                    </div>
                </div>
            </nav>
        </>
    )
}