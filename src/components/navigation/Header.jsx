import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="flex flex-col gap-24 bg-slate-200 justify-center items-center h-screen px-12">
            <nav>
                <ul className="flex flex-col items-center gap-12">
                    <li className="" ><Link className="hover:bg-slate-300 border-2 border-slate-400 px-4 py-2 rounded" to="/">Home</Link></li>
                    <li><Link className="hover:bg-slate-300 border-2 border-slate-400 px-4 py-2 rounded" to="/PopulationAgesPage">Population</Link></li>
                    <li><Link className="hover:bg-slate-300 border-2 border-slate-400 px-4 py-2 rounded" to="/OtherData">Other data</Link></li>
                </ul>
            </nav>
        </header>
    )
}