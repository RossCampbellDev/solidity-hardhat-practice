import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import App from "./_app"
import Header from "./components/ManualHeader"
import EasyHeader from "./components/EasyHeader"
import TestingContract from "./components/TestingContract"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <EasyHeader />
            <TestingContract />
        </>
    )
}
