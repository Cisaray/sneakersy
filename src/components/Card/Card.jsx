import styles from './Card.module.scss'
import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

const Card = ({
                  imageUrl,
                  title,
                  price,
                  id,
                  loading = false,
                  onFavorite,
                  onPlus,
                  favorited = false,
              }) => {
    const {isItemAdded} = React.useContext(AppContext);
    const [isLiked, setIsLiked] = React.useState(favorited)
    const onClickPlus = () => {
        onPlus({imageUrl, title, price, id});
    }
    const onClickLike = () => {
        onFavorite({imageUrl, title, price, id});
        setIsLiked(!isLiked);
    }

    return (<div className={styles.card}>
            {loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
                    <rect x="0" y="105" rx="3" ry="3" width="150" height="15"/>
                    <rect x="0" y="125" rx="3" ry="3" width="90" height="15"/>
                    <rect x="0" y="160" rx="8" ry="8" width="80" height="25"/>
                    <rect x="118" y="160" rx="8" ry="8" width="32" height="32"/>
                </ContentLoader> :
                <>
                {onFavorite && <div className={styles.favourite} onClick={onClickLike}>
                        <img src={isLiked ? "img/heartLiked.svg" : "img/heartUnliked.svg"} alt="heartUnliked"/>
                    </div>}
                    <img width={133} height={112} src={imageUrl} alt="kross1"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onPlus && <button className={styles.button} onClick={onClickPlus}>
                            <img width={32} height={32} src={isItemAdded(id)  ? "img/plusConfirmed.svg" : "img/plus.svg"}
                                 alt="plus"/>
                        </button>}
                    </div>
                </>}
        </div>

    )
}
export default Card;