import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function HeaderNav() {
    return (
        <>
            <h1 className="py-4 px-4 font-blog text-5xl font-bold">The Big Contract Test 🤌</h1>
            <nav>
                <div className="border-b-2 py-2 flex flex-row w-full">
                    <div className="w-1/2">
                        <ConnectButton moralisAuth={false} />
                    </div>

                    <div className="float-right w-1/2">
                        <Link href="/" 
                            className="bg-teal-700 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded mr-4 float-right"
                        >Home</Link>

                        <Link href="/debug"                        
                            className="bg-teal-700 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded mr-4 float-right"
                        >Debug</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}