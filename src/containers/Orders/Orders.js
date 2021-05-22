import Order from "../../components/Order/Order";
import {useEffect, useState} from "react";
import firebaseInstance from "../../axios-orders";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebaseInstance.get('/orders.json')
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                setLoading(false);
                setOrders(fetchedOrders);
            })
            .catch(err => {
                setLoading(false);
            })
    })

    return (
        <div>
            {orders.map(order => (
                <Order key={order.id}
                       ingredients={order.ingredients}
                       price={+order.price}
                />
            ))}
        </div>
    );
}

export default Orders;