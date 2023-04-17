import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Popup from "@/components/items/popup";
const Products = () => {
    const [product, setproduct] = useState([])
    const [open, setopen] = useState(false)
    const [productid, setproductid] = useState(0)
    const cancelButtonRef = useRef(null)
    const [refresh, setrefresh] = useState(false)

    const [message, setmessage] = useState({
        success: '',
        error: ''
    })
    const modal_open = (id) => {
        setopen(true)
        setproductid(id)
    }

    const setdeleted = () => {
        setopen(false)
        setrefresh(!refresh)
        axios.post('/api/products/delete/', { productid: productid })
        .then(function (response) {
            if(response.data.success){
                setmessage(() => ({
                    success: response.data.success
                }))
            }
            if(response.data.error){
                setmessage(() => ({
                    error: response.data.error
                }))
            }
            setTimeout(function () {
                setmessage(() => ({
                    success: '',
                    error: ''
                }))
            })
        })
    }

    useEffect( () => {
        axios.get('/api/products/list').then(function (response) {
            setproduct(response.data)
        })
    },[refresh])
    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex justify-between">
                    <h1 className="text-lg font-bold uppercase text-black">Products</h1>
                    <Link to="/products/add" className="bg-blue-700 text-gray-400 p-3 items-end text-sm hover:opacity-80">New Product</Link>
                </div>
                {product && product.length > 0 ?
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.map((obj, index) => {
                            return (
                                <tr className="bg-white border-b-2 dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td scope="row" className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        {obj.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {obj.color == 1 && (<span>Red</span>)}
                                        {obj.color == 2 && (<span>Blue</span>)}
                                        {obj.color == 3 && (<span>Gray</span>)}
                                        {obj.color == 4 && (<span>Black</span>)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {obj.category == 1 && (<span>Computer</span>)}
                                        {obj.category == 2 && (<span>Phone</span>)}
                                        {obj.category == 3 && (<span>Tablet</span>)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {obj.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={"/products/edit/" + obj.id} className="bg-blue-800 p-2 hover:bg-blue-600">Edit</Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button type="button" className="bg-red-800 p-2 hover:bg-red-600" onClick={(e) => modal_open(obj.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                : <span className='p-2 text-red-800'>Products not found</span>}
            </div>
            <Popup open={open} setopen={setopen} setdeleted={setdeleted} cancelButtonRef={cancelButtonRef} />
            <Footer />
        </>
    )
}
export default Products
