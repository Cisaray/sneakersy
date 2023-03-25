import styles from './Card.module.scss'
import React from 'react';


const Card=({imageUrl, title, price, onFavorite, onPlus})=> {
    const[isAdded, setIsAdded] = React.useState(false)
    const onClickPlus=()=>{
        onPlus({imageUrl, title, price});
        setIsAdded(!isAdded);
    }

    const[isLiked, setIsLiked] = React.useState(false)
    const onClickLike=()=>{
        setIsLiked(!isLiked)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favourite} onClick={onClickLike}>
                <img  src = {isLiked ? "/img/heartLiked.svg" : "/img/heartUnliked.svg"} alt="heartUnliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="kross1"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <button className={styles.button} onClick={onClickPlus}>
                    <img width={32} height={32} src ={isAdded ? "/img/plusConfirmed.svg": "/img/plus.svg"} alt="plus"/>
                </button>
            </div>
        </div>

    )
}
export default Card;