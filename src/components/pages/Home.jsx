import Card from "../Card/Card";
import React from "react";

const Home = ({
                  searchValue,
                  onChangeSearchInput,
                  setSearchValue,
                  filteredItems,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading
              }) => {
    const renderItems = () => {
        return (isLoading ? [...Array(10)] : filteredItems)
            .map((item, index) => (<Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />))}
    return (<div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="search-block d-flex">
                <img src="img/search.svg" alt="Search"/>
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                {searchValue && <img onClick={() => setSearchValue('')}
                                     className="clear cu-p"
                                     src="img/btn-remove.svg"
                                     alt="Clear"/>}
            </div>
        </div>
        <div className="d-flex flex-wrap">
            {renderItems()}
        </div>
    </div>)
}
export default Home;