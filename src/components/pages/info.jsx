import React from 'react';
import AppContext from "../../context";
import {Link} from "react-router-dom";

const Info = ({title, description, image}) => {
    const {setCartOpened} = React.useContext(AppContext)
    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img width={120} height={120} src={image} alt="emptyCart" className="mb-20"/>
            <h2>{title}</h2>
            <div className="opacity-6">{description}</div>
            <Link to='/'>
                <button onClick={() => setCartOpened(false)} className="greenButton">
                    <img src="img/arrowBack.svg" alt="Arrow"/>
                    Вернуться назад
                </button>
            </Link>
        </div>
    )
}
export default Info;