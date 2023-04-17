import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Dashboard from "@/components/home/dashboard";
import Notfound from "@/components/errors/notfound";
import Products from "@/components/products/list";
import ProductAdd from "@/components/products/add";
import ProductEdit from "@/components/products/edit";
import Users from "@/components/users/user";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Dashboard /> } />
                <Route path='/products' element={ <Products /> } />
                <Route path='/products/add' element={ <ProductAdd /> } />
                <Route path='/products/edit/:id' element={ <ProductEdit /> } />
                <Route path='/users' element={ <Users /> } />
                <Route path='/*' element={ <Notfound /> } />
            </Routes>
        </BrowserRouter>
    )
}


const root = createRoot(document.getElementById('app'));
root.render( <Router /> );
