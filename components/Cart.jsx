import {useRef} from 'react'
import Link from 'next/link'
import {AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import {toast} from 'react-hot-toast'
import {useStateContext} from '../context/stateContext'
import {urlFor} from '../lib/client'
import getStripe from '../lib/getStripe'

function Cart() {

  const cartRef = useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const res = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    })

    if(res.status == 500) return;

    const data = await res.json();
    console.log(data);
    toast.loading('Redirecting...');

    stripe.redirectToCheckout({sessionId: data.id});

  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft/>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities}) items</span>
        </button>
        {
          cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150}/>
              <h1>Your Shopping Cart Is Empty</h1>
              <Link href="/">
                <button className="btn"
                onClick={() => setShowCart(false)}
                type="button"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item,idx) => {
              return (
                <div className="product" key={item._id}>
                  <img src={urlFor(item?.image[0]).url()} className="cart-product-image" alt="" />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>R{item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div className="">
                        <p className="quantity-desc">
                        <span className="minus" onClick={() => toggleCartItemQuantity(item._id,"dec")}><AiOutlineMinus/></span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuantity(item._id,"inc")}><AiOutlinePlus/></span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline /> 
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
          {
            cartItems.length > 0 && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal</h3>
                  <h3>R{totalPrice.toFixed(2)}</h3>
                </div>
                <div className="btn-container">
                  <button type="button" className="btn" onClick={() => handleCheckout()}>
                    Pay With Stripe
                  </button>
                </div>
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Cart