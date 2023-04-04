import {Link} from "react-router-dom";
import React from "react";
import {useCart} from "../hooks/useCart";

const Header = () => {

    const {totalPrice, setCartOpened} = useCart()

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to='/'>
                <div className="d-flex align-center">
                    <img width={40} height={40} src='img/logo.png' alt='logo'/>
                    <div>
                        <h3 className="text-uppercase">REACT SNEAKERS</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li className="mr-30">
                    <img width={18} height={18} src='img/cart.svg' className="cu-p" alt='cart'/>
                    <span onClick={()=>setCartOpened(true)} className='cu-p'>{totalPrice} руб.</span>
                </li>
                <li className='mr-20'>
                    <Link to='/favorites'>
                        <img className='cu-p' width={18} height={18} src='img/favorites.svg' alt='favorites'/>
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img width={18} height={18} src='img/user.svg' alt='user'/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header;