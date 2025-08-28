import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./navbar.module.css"
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false)
    const {data} =  useSession();
    const router = useRouter();
     const handleScroll = (id: string) => {
            if(router.pathname !== "/dashboard"){
                router.push(`/dashboard#${id}`)
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth"});
            }
        };
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} sticky top-0 ${scrolled ? "bg-black/20 opacity-86 group-hover:opacity-100 transition-opacity duration-300 text-white shadow-lg" : "bg-transparent text-black"}`}>
            <h1 className="font-bold text-3xl">WS</h1>
                    <ul className={`${styles.ul} hidden md:flex gap-6`}>
                        <li>
                            <button onClick={() =>handleScroll("home")}>
                                Home
                            </button>
                        </li>
                        <li> 
                            <button onClick={() =>handleScroll("about")}>
                                About
                            </button>
                        </li>
                        <li>
                            <button onClick={() =>handleScroll("contact")}> 
                                Contact
                            </button>
                        </li>
                    </ul>
                    <div className="hidden md:block">
                        {data ? (
                            <button onClick={() => signOut()}>Sign Out</button>
                        ): (
                            <button onClick={() => signIn()}>Sign In</button>
                        )}
                    </div>

                        <button className="md:hidden" onClick={() => setOpen(!open)}>
                            {open ? <X size={28}/> : <Menu size={28}/>}
                        </button>

                    {open &&(
                        <div className={`absolute top-16 right-2 w-1/3 bg-white text-black rounded-lg shadow-lg p-6 flex flex-col gap-4 md:hidden transition-all duration-500 ease-in-out
                        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
                            <button onClick={() =>handleScroll("home")}>
                                Home
                            </button>
                            <button onClick={() =>handleScroll("about")}>
                                About
                            </button>
                            <button onClick={() =>handleScroll("contact")}> 
                                Contact
                            </button>
                            {data ? (
                                <button onClick={() => signOut()}>Sign Out</button>
                            ): (
                                <button onClick={() => signIn()}>Sign In</button>
                            )}
                        </div>
                    )}
        </nav>
    )
};

export default Navbar;