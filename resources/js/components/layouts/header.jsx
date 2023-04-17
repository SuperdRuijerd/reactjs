import {Link, NavLink} from "react-router-dom";
const Header = () => {
    return (
        <div className="bg-slate-100 dark:bg-gray-800 dark:text-gray-400 h-20">
            <div className="flex max-w-7xl mx-auto justify-between">
                <div className="space-x-5 pt-7">
                    <NavLink to="/"
                             className={( { isActive }) => (isActive ?
                                 'bg-slate-300 dark:bg-gray-900 p-3 rounded-lg' :
                                 'p-3 hover:bg-gray-900 rounded-lg')}
                    >Dashboard</NavLink>
                    <NavLink to="/products"
                             className={({ isActive }) => (isActive ?
                                 'bg-slate-300 dark:bg-gray-900 p-3 rounded-lg' :
                                 'p-3 hover:bg-gray-900 rounded-lg')}
                    >Products</NavLink>
                    <NavLink to="/users"
                             className={({ isActive }) => (isActive ?
                                 'bg-slate-300 dark:bg-gray-900 p-3 rounded-lg' :
                                 'p-3 hover:bg-gray-900 rounded-lg')}
                    >Users</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Header
