import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;


    const incQty = () => {
        setQty((prev) => prev + 1)
    }

    const decQty = () => {
        setQty((prev) => {
            if(prev == 1){
                return 1;
            }else {
                return prev - 1;
            }
        })
    } 

    const onAdd = (product, quantity) => {
        const checkProdInCart = cartItems.find(item => item._id === product._id);
        
        setTotalPrice((prev) => prev + product.price * quantity);
        setTotalQuantities((prev) => prev + quantity); 
        
        if (checkProdInCart){    
            const updatedCart = cartItems.map((cartProd) => {
               if(cartProd._id === product.id){
                   return { 
                       ...cartProd,
                       quantity: cartProd.quantity + quantity,
                   }
               }
            })
            setCartItems(updatedCart);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to cart`);
        setQty(1);

    }

    const toggleCartItemQuantity = (id,value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);

        console.log(foundProduct)

        if(value === 'inc'){
            foundProduct.quantity += 1;
            let newItems = cartItems.map((item,idx) => {
                if(item._id === id){
                    return foundProduct;
                } else {
                    return item;
                }
            });
            setCartItems(newItems)
            setTotalPrice((prev) => prev + foundProduct.price);
            setTotalQuantities((prev) => prev + 1);
        } else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                foundProduct.quantity -= 1;
                let newItems = cartItems.map((item,idx) => {
                    if(item._id === id){
                        return foundProduct;
                    } else {
                        return item;
                    }
                });
            setCartItems(newItems)
            setTotalPrice((prev) => prev - foundProduct.price);
            setTotalQuantities((prev) => prev - 1);
            }
        }
    }
  

    const onRemove = (product) => {
        let newCart = cartItems.filter(item => item._id !== product._id);
        setTotalPrice((prev) => prev - product.price * product.quantity);
        setTotalQuantities((prev) => prev - product.quantity);
        setCartItems(newCart);
    }


    const value = {
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
    };

    return (
        <Context.Provider value={value}>
             {children}
        </Context.Provider>
    )

}


export const useStateContext = () => useContext(Context);