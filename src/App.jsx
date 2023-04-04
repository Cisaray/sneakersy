import Header from "./components/pages/header";
import Drawer from "./components/drawer/Drawer";
import axios from "axios";
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Favorites from "./components/pages/favorites";
import Home from "./components/pages/Home";
import Orders from './components/pages/orders';
import AppContext from "./context";

const App = () => {
    const [items, setItems] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)
    const [favorite, setFavorite] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://my-json-server.typicode.com/CIsaray/sneakersData/cart'),
                    axios.get('https://my-json-server.typicode.com/CIsaray/sneakersData/favorites'),
                    axios.get('https://my-json-server.typicode.com/CIsaray/sneakersData/items'),
                    // axios.get('http://localhost:3000/cart'),
                    // axios.get('http://localhost:3000/favorites'),
                    // axios.get('http://localhost:3000/items')
                    ])

                setIsLoading(false)

                setFavorite(favoritesResponse.data)
                setCartItems(cartResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка при загрузке данных :(')
            }
        })()
    }, [])
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    const onAddToCart = async (obj) => {
        try {
            if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
                // await axios.delete(`http://localhost:3000/cart/${obj.id}`);
                await axios.delete(`https://my-json-server.typicode.com/CIsaray/sneakersData/cart/${obj.id}`);
                setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                // const {data} = await axios.post('http://localhost:3000/cart', obj);
                const {data} = await axios.post('https://my-json-server.typicode.com/CIsaray/sneakersData/cart', obj);
                setCartItems(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в корзину')
        }
    }
    const onAddToFavorite = async (obj) => {
        try {
            if (favorite.find((favObj) => favObj.id === obj.id)) {
                // await axios.delete(`http://localhost:3000/favorites/${obj.id}`);
                await axios.delete(`https://my-json-server.typicode.com/CIsaray/sneakersData/favorites/${obj.id}`);
                setFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                // const {data} = await axios.post('http://localhost:3000/favorites', obj);
                const {data} = await axios.post('https://my-json-server.typicode.com/CIsaray/sneakersData/favorites', obj);
                setFavorite(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в Закладки')
        }
    }
    const onRemoveItem = async (id) => {
        try {
            // await axios.delete(`http://localhost:3000/cart/${id}`);
            await axios.delete(`https://my-json-server.typicode.com/CIsaray/sneakersData/cart/${id}`);
            setCartItems((prev) => prev.filter(item => item.id !== id));
        } catch (error) {
            alert('Не удалось удалить товар из корзины :(')
        }
    }
    const filteredItems = items.filter(cross => {
        return cross.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id))
    }

    return (
        <AppContext.Provider value={{
            items, cartItems, favorite,
            isItemAdded, onAddToFavorite, onAddToCart, isLoading, setCartOpened, setCartItems
        }}>
            <div className="wrapper clear">
                <Drawer onRemove={onRemoveItem} opened={cartOpened}/>
                <Header/>
                <Routes>
                    <Route path='favorites' exact
                           element={<Favorites/>}/>
                    <Route path='orders' exact
                           element={<Orders setIsLoading={setIsLoading}/>}/>
                    <Route path='/' exact element={
                        <Home
                            filteredItems={filteredItems}
                            cartItems={cartItems}
                            favorite={favorite}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            isLoading={isLoading}
                        />}/>
                </Routes>
            </div>
        </AppContext.Provider>
    )
}

export default App;
