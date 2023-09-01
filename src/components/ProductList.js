import React from "react";
import { data } from "../data";
export const ProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {

    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };


    return (
        <div className="container-items" style={{marginTop:"15px"}}>
            {data.map(product => (
                <div className="item" key={product.id}>
                    <figure>
                        <img src={product.urlImage} alt={product.title} />
                    </figure>
                    <div className="info-product">
                        <h2>{product.title}</h2>
                        <p>Categoria: {product.categorie}</p>
                        <p className="price">${product.price}</p>
                        <button className="btn-add-cart"
                            onClick={() => onAddProduct(product)}
                        >Añadir al carrito</button>
                    </div>
                </div>
            ))}
        </div>
    );
}