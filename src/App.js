import { useContext, useEffect, lazy, Suspense  } from 'react';
import {Route,Routes} from 'react-router-dom'
import { get } from './api';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import { authContext } from './context/Auth';
import { cartContext } from './context/Cart';
import Cart from './pages/Cart';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Products from './pages/Products';
const Home = lazy(()=>import('./pages/Home'))
const Login = lazy(()=>import('./pages/Login'))
const SignUp = lazy(()=>import('./pages/SignUp'))

function App() {
    const {setUser} = useContext(authContext)
    const {setItems} = useContext(cartContext)
    // Recuperamos sesión del usuario
    useEffect(()=>{
      get("/api/auth/validate")
      .then(result=>{
        // setUser({
        //   logged:true,
        //   user:result.user
        // })
        setUser({type:'LOGIN',payload:result.user})
        get("/api/cart")
        .then(data=>{
          setItems({
            type:"UPDATE",
            payload:data.items
          })
        })
        .catch(console.log)
      })
      .catch(error=>console.log(error))
    },[setUser,setItems])

    return (
        <>
          <Navbar/>
          <ErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/productos' element={<Products/>}/>
                <Route path='/productos/:id' element={<Product/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </>
    );
}

export default App;