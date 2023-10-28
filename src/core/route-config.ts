import Login from "./auth/Login"
import Page from "./landing/Page"
import Landing from "./landing/Landing"
import Main from "./pages/Main"
import Dashboard from "./pages/dashboard/content"
import ListRequired from "./components/process/required/listRequired"
import AddRequired from "./components/process/required/addRequired"
import BuysForm from "./components/process/buys/buysForm"
import AddBuy from "./components/process/buys/addBuy"
import InputForm from "./components/process/input/inputForm"
import OutputForm from "./components/process/output/outputForm"
import Almacen from "./components/almacen/products/list"
import Categories from "./components/almacen/products/categories"
import Brand from "./components/almacen/products/brand"
import Services from "./components/almacen/products/services"
import Costes from "./components/almacen/costes/costes"
import PersonalList from "./components/users/personal"
import AddPersonal from "./components/users/addPersonal"
import AddProduct from "./components/almacen/products/add"
import AddServices from "./components/almacen/products/addServices"
import Providers from "./components/business/providers"
import AddProvider from "./components/business/addProviders"
import Transports from "./components/business/transports"
import AddTransports from "./components/business/addTransports"
import AddInput from "./components/process/input/addInput"

import Inventory from "./components/reports/inventory"
import Kardex from "./components/reports/kardex"
import Order from "./components/reports/order"

import listUsers from "./components/users/listUsers"
import Rules from "./components/users/rules"



const routePath = [

    { path: '/component/landing', component: Landing, esAdmin: true },
    { path: '/main/:page', component: Page },
    { path: '/component/login', component: Login },
    { path: '/login', component: Login },

    { path: '/', component: Main },

    { path: '/dashboard', component: Dashboard },

    { path: '/almacen/productos', component: Almacen },
    { path: '/almacen/productos/nuevo', component: AddProduct },
    { path: '/almacen/servicios', component: Services },
    { path: '/almacen/servicios/nuevo', component: AddServices },
    { path: '/almacen/categorias', component: Categories },
    { path: '/almacen/marcas', component: Brand },
    { path: '/almacen/controcostos', component: Costes },
    

    { path: '/operaciones/requerimientos', component: ListRequired },
    { path: '/operaciones/requerimientos/nuevo', component: AddRequired },
    { path: '/operaciones/ordencompras', component: BuysForm },
    { path: '/operaciones/ordencompras/nuevo', component: AddBuy },
    
    { path: '/operaciones/entradas', component: InputForm },
    { path: '/operaciones/entradas/:id', component: AddInput },
    { path: '/operaciones/salidas', component: OutputForm },

    { path: '/empresas/proveedores', component: Providers },
    { path: '/empresas/proveedores/nuevo', component: AddProvider },
    
    { path: '/empresas/transportistas', component: Transports },
    { path: '/empresas/transportistas/nuevo', component: AddTransports },

    { path: '/reportes/inventario', component: Inventory },
    { path: '/reportes/kardex', component: Kardex },
    { path: '/reportes/ordenes', component: Order },

    { path: '/usuarios/personal', component: PersonalList },
    { path: '/usuarios/personal/nuevo', component: AddPersonal },
    { path: '/usuarios/lista', component: listUsers },
    { path: '/usuarios/permisos', component: Rules }

    
]

export default routePath;