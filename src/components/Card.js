


const Card=()=> {
    return (
        <div className="card">
            <div className="favourite">
                <img src="/img/heartUnliked.svg" alt="heartUnliked"/>
            </div>
            <img width={133} height={112} src="/img/snikers/1.jpg" alt="kross1"/>
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b> 12 999 руб.</b>
                </div>
                <button className="button">
                    <img width={32} height={32} src="/img/plus.svg" alt="plus"/>
                </button>
            </div>
        </div>

    )
}
export default Card;