import { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { collection, addDoc, onSnapshot, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import Header from "./Header";

const Film = () => {
    const [films, setFilms] = useState([])
    const filmDB = collection(firestore, 'film');
    const orderDB = collection(firestore, 'order');

    useEffect(() => {
        onSnapshot(filmDB, res => {
            setFilms(res.docs)
        })
    }, [filmDB]);

    const addOrder = async (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            price: +e.target.price.value,
            quantity: +e.target.quantity.value,
        }
        const q = query(orderDB, where("name", "==", data.name));
        const oldOrder = await getDocs(q);
        if(oldOrder.empty) {
            if(data.quantity && data.quantity !== 0) {
                addDoc(orderDB, data)
                .then(res => {
                    console.log('Added');
                    alert('Order Success')
                })
                .catch((err) => {
                    alert(err.message);
                })
            }
        } else {
            oldOrder.forEach(order => {
                const orderData = order.data()
                if(orderData) {
                    updateDoc(doc(firestore,'order',order.id), {
                        quantity: order.data().quantity + data.quantity
                    })
                        .then(res => {
                            console.log('Updated');
                            alert('Order Success')
                        })
                        .catch((err) => {
                            alert(err.message);
                        })
                }
            })

        }
    }

    return (
        <div className="container">
            <Header />
            <h2>Film List</h2>
            <div className="list">
                <div className="form">
                    {films.map(film => (
                    <form onSubmit={addOrder} key={film.id}>
                        <div className="card">
                            <input name='name' defaultValue={film.data()?.name} hidden></input>
                            <input name='price' defaultValue={film.data()?.price} hidden></input>
                            <img src={film.data()?.imageUrl} alt={film.data()?.name} style={{width: "200px", height: "250px"}}/>
                            <h3>{film.data()?.name}</h3>
                            <div>Price: {film.data()?.price}$</div>
                            <input name="quantity" type="number" placeholder="Quantity" min={1} style={{width: "66px"}}/>
                            <button type="submit">Order</button>
                        </div>
                    </form>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Film;