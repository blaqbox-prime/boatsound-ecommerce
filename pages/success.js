import {useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import {useRouter} from 'next/router'
import {runFireworks} from '../lib/utils'

import {useStateContext} from '../context/stateContext'

const Success = () => {

    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();
    const [order, setOrder] = useState(null);

    useEffect(() => {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }, [])
    

  return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsBagCheckFill/>
            </p>
            <h2>Thank You For Your Order</h2>
            <p className="email-msg">
                Check your email for the invoice
            </p>
            <p className="description">
                If you have any questions please email 
                <a className="email" href="mailto:orders@boatsounds.com">orders@boatsounds.com</a>
            </p>
            <Link href="/">
                <button type="button" className="btn" width="300px">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success