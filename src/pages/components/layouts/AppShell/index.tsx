import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Footer from "../Footer";

type AppShellProps = {
    children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
    const {children} = props;
    const router = useRouter();
    const { pathname } = router;
    const disableNavbar = ["/auth/login", "/auth/register"];
    const authpages = ["/auth/login", "/auth/register"];
    const isAuthPage = authpages.includes(pathname);

    return(
        <main className={isAuthPage ? "backgroundImage" : ""}>
            {!disableNavbar.includes(pathname) && <Navbar />}
            <div className="content">{children}</div>
            <Footer/>
        </main>
    )
};

export default AppShell;

