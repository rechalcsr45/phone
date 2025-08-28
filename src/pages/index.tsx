import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./dashboard.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const products = [
  { id: 1, name: "iPhone 16 Pro", category: "New", image: "/images/product1.png", harga: "2.000.000" },
  { id: 2, name: "iPhone 16", category: "New", image: "/images/product2.png", harga:"2.000.000" },
  { id: 3, name: "iPhone 16e", category: "New", image: "/images/product3.png", harga:"2.000.000" },
  { id: 4, name: "iPhone 15", category: "New", image: "/images/product4.png", harga:"2.000.000" },
  { id: 5, name: "iPhone 14", category: "New", image: "/images/product5.png", harga:"2.000.000" },
  { id: 6, name: "iPhone 13", category: "New", image: "/images/product6.png", harga:"2.000.000" },
];

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const router = useRouter();

  const { data: session } = useSession();
  const handleBeli = (productId: number) => {
    if (!session){
      signIn();
    } else {
      router.push(`/shop?id=${productId}`)
    }
  };

  return (
    <>
      {/* HERO */}
      <div
        className={`${geistSans.className} ${geistMono.className} font-sans min-h-[70vh] px-8 sm:px-20 py-20 bg-[rgba(55,81,114)] text-white flex items-center`}
      >
        <main className="flex flex-col max-w-3xl mx-auto text-center sm:text-center">
          <div className="max-w-2xl">
            <p className="font-bold text-5xl mb-6">Willy Shop</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              recusandae reiciendis officia in fugit alias consequatur cumque?
              Dolorum recusandae provident iusto voluptatibus ullam placeat,
              laboriosam labore perspiciatis doloremque officiis assumenda!
            </p>
          </div>
          <div>
            <button
              onClick={() =>
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full p-3 mt-10 bg-yellow-600 text-white hover:bg-yellow-500 duration-500"
            >
              Pesan Sekarang
            </button>
          </div>
        </main>
      </div>

      {/* PRODUCT LIST */}
      <div id="home" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 bg-white px-10 py-10">
        {products.map((p) => (
          <div key={p.id} className="w-full max-w-sm mx-auto text-black p-3 cursor-pointer hover:shadow-lg duration-300 group">
            <div className="relative flex items-center justify-center">
              <Image
                src={p.image}
                alt={p.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button onClick={() => handleBeli(p.id)} 
                  className="px-5 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 duration-300">
                  Beli
                </button>
              </div>
            </div>

            {/* kategori + nama produk */}
            <p className="text-sm mb-2 mx-8 mt-3 bg-red-500 text-white w-10 flex justify-center items-center rounded-xl">{p.category}</p>
            <h2 className="font-bold mb-2 mx-8">{p.name}</h2>
            <p className="text-sm mx-8">{p.harga}</p>
          </div>
        ))}
      </div>


      {/* ABOUT */}
      <div
        id="about"
        className={`${geistSans.className} ${geistMono.className} flex flex-col gap-8 min-h-[100v] px-8 sm:px-16 py-16 bg-[rgb(55,81,114)] text-white items-center`}
      >
        <h1 className="font-bold text-2xl">About Us</h1>
        <div className="flex flex-row gap-8 max-w-4xl text-center sm:text-left">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            perferendis suscipit omnis aspernatur, cupiditate laborum vero!
            Eaque sit obcaecati eos itaque autem saepe soluta tempora suscipit,
            veritatis officiis ipsam consequatur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            perferendis suscipit omnis aspernatur, cupiditate laborum vero!
            Eaque sit obcaecati eos itaque autem saepe soluta tempora suscipit,
            veritatis officiis ipsam consequatur.
          </p>
        </div>
      </div>

      {/* CONTACT */}
      <div
        id="contact"
        className="flex flex-col min-h-[100v] px-8 sm:px-16 py-16 bg-white text-black "
      >
        <h1 className="font-bold text-2xl mb-6">Contact</h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col mb-1">
            <label htmlFor="email" className="flex items-center mr-4 mt-4 mb-2">
              Email
            </label>
            <input
              type="email"
              className="flex-1 form-control p-2 border border-black/30 rounded-lg"
              name="email"
              id="email"
              placeholder="ex: jhon@gmail.com"
            />
            <div className="flex flex-col mb-1">
              <label htmlFor="nama" className="flex items-center mr-4 mt-4 mb-2">
                Nama
              </label>
              <input
                type="text"
                className="flex-1 p-2 border border-black/30 rounded-lg"
                name="nama"
                id="nama"
                placeholder="ex: Jhon Dalton"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="telp" className="mr-4 mt-4 mb-2">
                Telepon
              </label>
              <input
                type="number"
                className="flex-1 form-control p-2 border border-black/30 rounded-lg"
                name="telp"
                id="telp"
                placeholder="ex: 08123431428"
              />
            </div>
          </div>
          <div className="flex flex-col mb-1">
            <label
              htmlFor="alamat"
              className="flex items-center mt-4 mr-4 mb-2"
            >
              Alamat
            </label>
            <textarea
              className="flex-1 p-2 border border-black/30 rounded-lg resize min-h-[100px] max-h-[300px] min-w-[200px] max-w-full"
              name="alamat"
              id="alamat"
              defaultValue=""
              placeholder="ex: jl.1 Kebon Kuring, Paris, France"
            />
          </div>
        </form>
      </div>
    </>
  );
}
