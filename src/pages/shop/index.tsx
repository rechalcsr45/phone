import { useRouter } from "next/router";
import Image from "next/image"; 
import { useState } from "react";

const products = [
    { id: 1, name: "iPhone 16 Pro", category: "New", image: "/images/product1.png", harga: "2.000.000" },
    { id: 2, name: "iPhone 16", category: "New", image: "/images/product2.png", harga:"2.000.000" },
    { id: 3, name: "iPhone 16e", category: "New", image: "/images/product3.png", harga:"2.000.000" },
    { id: 4, name: "iPhone 15", category: "New", image: "/images/product4.png", harga:"2.000.000" },
    { id: 5, name: "iPhone 14", category: "New", image: "/images/product5.png", harga:"2.000.000" },
    { id: 6, name: "iPhone 13", category: "New", image: "/images/product6.png", harga:"2.000.000" },
];

export default function Shop() {
    const router = useRouter();
    const {id} = router.query;
    const product = products.find((p) => p.id === Number(id));

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleBuy = () => {
        setShow(true);
        setLoading(true);
        setSuccess(false);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    }
        return (
            <>
               <div className="bg-white min-h-screen p-6">
                    {product ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto text-black">
                            <div className="relative flex items-center justify-center bg-gray-200 p-4 sm:col-span-2 ">
                                {/* Foto di atas background */}
                                <Image
                                src={product.image}
                                alt={product.name}
                                width={400}
                                height={400}
                                
                                />
                            </div>

                        {/* Kolom kanan = detail produk */}
                            <div className="flex flex-col justify-center gap-4">
                                <h2 className="text-4xl font-bold mt-6">{product.name}</h2>
                                <p className="text-lg text-gray-600">{product.category}</p>
                                <p className="text-xl font-semibold">Rp {product.harga}</p>
                                <button
                                    onClick={handleBuy} disabled={loading} 
                                    className="bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 text-white py-2 px-4 rounded-lg w-40">
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Belum ada produk yang dipilih</p>
                    )}
                    {show && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                            <div className="bg-white text-black rounded-xl shadow-lg p-8 w-80 h-50 flex flex-col items-center justify-center">
                                {loading && (
                                    <>
                                        <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 mb-4"></div>
                                        <p>Memproses Pembayaran...</p>
                                    </>
                                )}
                                {!loading && success && (
                                    <>
                                        <div className="text-green-500 text-5xl mb-4">✔</div>
                                        <p>Pembelian Berhasil Coy !</p>

                                        <button onClick={() => {setShow(false)}} 
                                        className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg">
                                            Close
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
}