import Card from "../Card/Card";
import React from "react";
import axios from "axios";
import Info from "./info";

const Orders = () => {

    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                // const {data} = await axios.get('http://localhost:3000/orders')
                const {data} = await axios.get('https://my-json-server.typicode.com/CIsaray/sneakersData/orders')
                setIsLoading(false)
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
            } catch (error) {
                alert('Не удалось загрузить Ваши покупки :(')
                console.error(error);
            }
        })();
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои Покупки</h1>
            </div>
            {orders.length>0?
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(10)] : orders).map((item, index) =>
                    <Card
                        loading={isLoading}
                        key={index}
                        {...item}/>
                )}
            </div>:<Info
                image='img/sadSmile.jpg'
                title='У вас нет заказов :('
                description='Вы нищеброд?  Оформите хотя бы один заказ.'/>}
        </div>
    )
}
export default Orders;