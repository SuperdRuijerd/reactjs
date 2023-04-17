import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from 'react';
import Notfound from "@/components/errors/notfound";

const ProductEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [refresh, setrefresh] = useState(false)
    const [name, setname] = useState('')
    const [color, setcolor] = useState('')
    const [category, setcategory] = useState('')
    const [price, setprice] = useState('')
    const [success, setsuccess] = useState()
    const [load, setload] = useState(false)
    const [error, seterror] = useState({
        name: '',
        color: '',
        category: '',
        price: ''
    })

    useEffect( () => {
        axios.get('/api/products/edit/' + id)
        .then((e) => {
            if(e.data.name) {
                setname(e.data.name)
                setcolor(e.data.color)
                setcategory(e.data.category)
                setprice(e.data.price.split('.')[0])
                setload[true]
            }
        })
        .catch((e) => { console.log(e) })
    },[refresh])

    const formpost = (e) => {
        e.preventDefault()
        seterror((e) => ({
            name: '',
            color: '',
            category: '',
            price: ''
        }));
        try{
            axios.post('/api/products/update',{
                id: id,
                name: name,
                color: color,
                category: category,
                price: price
            }).then((response) => {
                if(response.data.success) {
                    setsuccess(response.data.success)
                    e.target.reset()
                    setTimeout(function () {
                        setsuccess('')
                    }, 2000)
                } else {
                    if(response.data.errors.name) {
                        seterror((prev) => ({
                                ...prev,
                                name: response.data.errors.name
                            })
                        )
                    }
                    if(response.data.errors.color) {
                        seterror((prev) => ({
                                ...prev,
                                color: response.data.errors.color
                            })
                        )
                    }
                    if(response.data.errors.category) {
                        seterror((prev) => ({
                                ...prev,
                                category: response.data.errors.category
                            })
                        )
                    }
                    if(response.data.errors.price) {
                        seterror((prev) => ({
                                ...prev,
                                price: response.data.errors.price
                            })
                        )
                    }
                }
            }).catch((e) => {
                console.log(e)
            })
        }catch (error) {
            console.log(error)
        }

    }
    if(name != "")
    {
        return (
            <>
                <Header />
                <div className="max-w-7xl mx-auto mt-5 text-gray-400">
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold uppercase text-black">Product Edit</h1>
                        <Link to="/products" className="bg-red-700 p-3 items-end text-sm hover:opacity-80">Back to Product List</Link>
                    </div>

                    <div className="overflow-x-auto mt-5 content-between">
                        <form onSubmit={formpost} className="bg-white dark:bg-gray-800 dark:text-gray-400 shadow-md px-8 pt-6 pb-8 mb-4" >
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input value={name} onChange={e => setname(e.target.value)} className="shadow dark:bg-gray-600 appearance-none w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" autoComplete="off" />
                                {error.name != "" && error.name.map((obj, index) => {
                                    return (
                                        <span className="pt-2 text-red-400" key={index}>{obj}</span>
                                    )
                                }) }
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="color">Color</label>
                                <select value={color} onChange={e => setcolor(e.target.value)} className="shadow dark:bg-gray-600 appearance-none w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="color" placeholder="Category">
                                    <option value="">Select</option>
                                    <option value="1">Red</option>
                                    <option value="2">Blue</option>
                                    <option value="3">Gray</option>
                                    <option value="4">Black</option>
                                </select>
                                {error.color != "" && error.color.map((obj, index) => {
                                    return (
                                        <span className="pt-2 text-red-400" key={index}>{obj}</span>
                                    )
                                }) }
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <select value={category} onChange={e => setcategory(e.target.value)} className="shadow dark:bg-gray-600 appearance-none w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="category" placeholder="Category">
                                    <option value="">Select</option>
                                    <option value="1">Computer</option>
                                    <option value="2">Phone</option>
                                    <option value="3">Tablet</option>
                                </select>
                                {error.category != "" && error.category.map((obj, index) => {
                                    return (
                                        <span className="pt-2 text-red-400" key={index}>{obj}</span>
                                    )
                                }) }
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="price">Price</label>
                                <input type="number" value={price} onChange={e => setprice(e.target.value)} className="shadow dark:bg-gray-600 appearance-none w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="price" placeholder="Price" />
                                {error.price != "" && error.price.map((obj, index) => {
                                    return (
                                        <span className="pt-2 text-red-400" key={index}>{obj}</span>
                                    )
                                }) }
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="submit" className="bg-green-600 hover:bg-green-900 text-gray-400 font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                                    Save
                                </button>
                            </div>
                            { success && <div className="pt-2 text-green-400 text-sm">{success}</div> }
                        </form>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    else if(load == true)
    {
        return (<Notfound />)
    }
}
export default ProductEdit
