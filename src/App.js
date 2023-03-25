import Card from "./components/Card/Card";
import Header from "./components/header";
import Drawer from "./components/Drawer";
import React from 'react';


const App = (props) => {
    const[items, setItems] = React.useState([])
    React.useEffect(()=>{
        fetch('https://641e3ec70596099ce15d5267.mockapi.io/items')
            .then((res)=> {
                return res.json();
            })
            .then((json)=>{
                setItems(json);
            })
    })

    const[cartItems, setCartItems] = React.useState([])

    const[cartOpened, setCartOpened] = React.useState(false)

    const onAddToCart=(obj)=>{
        setCartItems(prev=>[...prev, obj]);
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onCloseCart={()=>setCartOpened((false))}/>}
            <Header
                onCartClick={()=>setCartOpened(true)}
                />
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.map((item)=>
                    <Card title={item.title} price={item.price} imageUrl={item.imageUrl}
                    onFavorite={()=>console.log('Добавили в закладки')}
                    onPlus={(obj)=>onAddToCart(obj)}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
