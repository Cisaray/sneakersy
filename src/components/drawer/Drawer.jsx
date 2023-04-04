import React from 'react';
import Info from "../pages/info";
import axios from 'axios';
import styles from './drawer.module.scss';
import {useCart} from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onRemove, opened}) => {

    const {cartItems, setCartItems, setCartOpened, totalPrice} = useCart()
    const[isOrderComplete, setIsOrderComplete] = React.useState(false);
    const[orderId, setOrderId] = React.useState(0);
    const[isLoading, setIsLoading] = React.useState(false);
    const onClickOrder=async ()=>{
        try{
            setIsLoading(true)
            // const {data} = await axios.post('http://localhost:3000/orders', {items: cartItems})
            const {data} = await axios.post('https://my-json-server.typicode.com/CIsaray/sneakersData/orders', {items: cartItems})
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([]);
            for(let i=0; i<cartItems.length; i++){
                const item = cartItems[i]
                // await axios.delete(`http://localhost:3000/cart/${item.id}`)
                await axios.delete(`https://my-json-server.typicode.com/CIsaray/sneakersData/orders/${item.id}`)
                await delay(1000);
            }
        }catch (error){
            alert('Ошибка при создании заказа :(')
        }
        setIsLoading(false)
    };

    return (<div className={`${styles.overlay} ${opened? styles.overlayVisible :''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина
                    <img onClick={() => setCartOpened(false)} className="removeBtn cu-p" src="img/btn-remove.svg"
                         alt="Close"/>
                </h2>
                {cartItems.length > 0 ? (<div className='d-flex flex-column flex'>
                    <div className="items">
                        {cartItems.map((obj) => (<div key={obj.id} className="cartItem d-flex align-center mb-20">
                            <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                 className="cartItemImg"></div>
                            <div className="mr-20 flex">
                                <p className="mb-5">{obj.title}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img onClick={() => onRemove(obj.id)} className="removeBtn"
                                 src="img/btn-remove.svg" alt="remove"/>
                        </div>))}
                    </div>
                    <div className="cartTotalBlock">
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб. </b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(Math.floor((totalPrice*0.05)*100))/100} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img src="img/arrow.svg" alt="arrow"/>
                        </button>
                    </div>
                </div>) : (<Info image={isOrderComplete?'img/orderConfirmed.jpg':'img/emptyCart.jpg'}
                                 title={isOrderComplete?'Заказ оформлен!':'Корзина пустая'}
                                 description={isOrderComplete?`Ваш заказ #${orderId} скоро будет передан курьерской доставке`:
                                     'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}/>)
                }
            </div>
        </div>
    )
}
export default Drawer;