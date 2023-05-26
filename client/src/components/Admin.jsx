import { useEffect, useState } from "react";
import { firestore, storage } from "../firebaseConfig";
import { doc ,collection, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "../utils/axios";

const Admin = () => {
    const filmDB = collection(firestore, 'film');
    const orderDB = collection(firestore, 'order');
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('auth/verify')
            .then((res) => {
                console.log(res);
                onSnapshot(orderDB, res => {
                    setOrders(res.docs);
                    let totalPrice = 0;
                    res.docs.map(doc => totalPrice = totalPrice + (doc.data().price*doc.data().quantity));
                    setTotal(totalPrice);
                })
            })
            .catch(error => {
                alert(error.response.data);	
                navigate('/')
            });
    }, []);

    const handleDelete = (orderId) => {
        deleteDoc(doc(firestore,'order',orderId))
            .then(res => {
                console.log('Deleted');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const handleChange = (orderId, quantity) => {
        updateDoc(doc(firestore,'order',orderId), {
            quantity: quantity
        })
            .then(res => {
                console.log('Updated');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const img = e.target.image.files[0];
        const storageRef = ref(storage, img.name);
        const metadata = {
            contentType: img.type,
          };
        await uploadBytes(storageRef, img, metadata);
        const imageUrl = await getDownloadURL(storageRef);
        const data = {
            name: e.target.name.value,
            price: +e.target.price.value,
            imageUrl: imageUrl
        }
        addDoc(filmDB, data)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })        
    }

    return (
        <div className="admin">
            <Header />
            <form className="list" onSubmit={handleSubmit}>
                <h2>Add Film</h2>
                <div>
                    <input name="name" type="text" placeholder="Film's name"/>
                </div>
                <div>
                    <input name="price" type="number" placeholder="Price"/>
                </div>
                <div>
                    <input name="image" type="file" placeholder="Film's image" style={{width: "254px"}}/>
                </div>
                <div>
                    <button type="submit">Add Film</button>
                </div>
            </form>
            <div className="list">
                <h2>Order List</h2>
                {orders.map(order => (
                <div key={order.id}>
                    <div className="remove">
                        <button onClick={() => handleDelete(order.id)}>x</button>
                    </div>
                    <div className="item">
                        <input name='orderId' defaultValue={order.id} hidden></input>
                        <div>Film: {order.data().name}</div>
                        <div>Price: {order.data().price}$</div>
                        <span>
                            Quantity:
                            <input 
                                name='quantity'
                                type="number"
                                value={order.data().quantity}
                                onChange={(e) => handleChange(order.id, e.target.value)}
                                min={1}
                                placeholder="Quantity"
                                style={{width: "66px"}}
                            ></input>
                        </span>
                    </div>
                    <br />
                </div>
            ))}
            <hr />
            <div>Total: {total}$</div>
            </div>
        </div>
    )
}

export default Admin;