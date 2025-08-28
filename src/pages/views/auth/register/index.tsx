import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./register.module.scss"


const RegisterViews  = () => {
    const { push } = useRouter();
    const  handleRegister = async() => {
        const name = (document.getElementById('name') as HTMLInputElement).value
        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password')as HTMLInputElement).value
        const alamat = (document.getElementById('alamat')as HTMLInputElement).value 

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, alamat}),
        })

        if (res.ok) {
            const data = await res.json()
            localStorage.setItem('token', data.token)
            push('/login')
        } else {
            alert('Gagal Register')
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-10">
            <div className="w-full max-w-md p-8 text-white rounded-lg shadow-md bg-black/50 background-blur">
            <h1 className="flex items-center justify-center font-bold text-3xl mb-8">Register Page</h1>
                <form action="">
                    <div className="flex flex-col mb-1">
                        <label htmlFor="name" className="mr-4">Nama</label>
                        <input className="form-control rounded-lg p-2 bg-white/30 py-2 mb-4" type="name" name="name" id="name" required placeholder="Masukan Nama" />
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="email" className="mr-4">Email</label>
                        <input className="form-control rounded-lg p-2 bg-white/30 py-2 mb-4" type="email" name="email" id="email" required placeholder="Masukan Nama" />
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="name" className="mr-4">Password</label>
                        <input className="form-control rounded-lg p-2 bg-white/30 py-2 mb-4" type="password" name="password" id="password" required placeholder="Masukan Nama" />
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="alamat" className="mr-4">Alamat</label>
                        <input className="form-control rounded-lg p-2 bg-white/30 py-2 mb-8" type="text" name="alamat" id="alamat" required placeholder="Masukan Alamat" />
                    </div>
                </form>
                <div>
                    <button
                        className="flex items-center justify-center rounded-lg px-4 py-1 bg-blue-500  text-white hover:bg-blue-300 mb-4 mx-auto block"
                        onClick={() => handleRegister()}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterViews;