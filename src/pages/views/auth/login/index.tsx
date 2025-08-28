import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.scss";

const LoginViews = () => {
    const { push } = useRouter();
    const handleLogin = async() => {
        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })

        if (res.ok) {
            const data = await res.json() 
            localStorage.setItem('token', data.token)
            push('/dashboard')
        } else {
            alert('Email atau Password salah !')
        }
    }
    return(
            <div className="flex items-center justify-center min-h-screen px-10">
                <div className="w-full max-w-md p-8 text-white rounded-lg shadow-md bg-black/50 backdrop-blur">
                    <h1 className="flex items-center justify-center text-3xl font-bold mb-8 ">Login Page</h1>
                    <form action="">
                        <div className="flex flex-col mb-1">
                            <label htmlFor="email" className="mr-4">Email</label>
                            <input type="email" className="form-control border border-black/30 bg-white/30 rounded-lg px-4 py-2 mb-4" name="email" id="email" required placeholder="Masukan Email" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mr-4">Password</label>
                            <input type="password" className="form-control border border-black/30 bg-white/30 rounded-lg px-4 py-2 mb-4" name="password" id="password" required placeholder="Masukan Password" />
                        </div>
                    </form>
                    <div>
                    <button 
                        className="flex items-center justify-center rounded-lg px-4 py-1 bg-blue-500 text-white hover:bg-blue-300 mb-4 mx-auto block" 
                        onClick={() => handleLogin()}>
                            Login
                    </button>
                    </div>
                    <p className="text-center">
                        Belum punya akun? <Link href={"/auth/register"} className="text-blue-500">Daftar Disini</Link>
                    </p>
                </div>
            </div>
    )
};

export default LoginViews;