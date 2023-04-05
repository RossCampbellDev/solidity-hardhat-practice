import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <div className="bg-zinc-900 text-teal-200">
                <Component {...pageProps} />
            </div>
        </MoralisProvider>
    )
}
