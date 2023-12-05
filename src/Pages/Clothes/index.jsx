import { useState, useEffect } from "react";
import Card from "../../Components/Card";

const Clothes = () => {
    const [clothingMen, setClothingMen] = useState([]);
    const [clothingWomen, setClothingWomen] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                const menClothes = data.filter(product => product && product.category === "men's clothing");
                const womenClothes = data.filter(product => product && product.category === "women's clothing");
        
                setClothingMen(menClothes);
                setClothingWomen(womenClothes);
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
    }, []);

    return (
        <div>
            <h2>Ropa de Hombres</h2>
            {clothingMen.map(item => <Card key={item.id} product={item} />)}

            <h2>Ropa de Mujeres</h2>
            {clothingWomen.map(item => <Card key={item.id} product={item} />)}
        </div>
    );
}

export default Clothes;