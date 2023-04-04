import Card from "../Card/Card";
import React from "react";
import AppContext from "../../context";
import Info from "./info";

const Favorites = () => {
    const {favorite, onAddToFavorite} = React.useContext(AppContext)
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои Закладки</h1>
            </div>
            {favorite.length>0?
                (<div className="d-flex flex-wrap">
                {favorite.map((item, index) =>
                    <Card
                        key={index}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        {...item}
                    />)}
            </div>):<Info image='img/cryingSmile.jpg'
                          title='Закладок нет :('
                          description='Вы ничего не добавляли в закладки'/>}
        </div>
    )
}
export default Favorites;