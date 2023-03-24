

const UnderHeader=()=>{
    return(
        <div className="d-flex align-center mb-40 justify-between">
            <h1>Все кроссовки</h1>
            <div className="search-block d-flex">
                <img src="/img/search.svg" alt="Search"/>
                <input placeholder="Поиск..."/>
            </div>
        </div>
    )
}
export default UnderHeader;