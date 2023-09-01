import React, { useState } from "react";
export const Headers = ({ allProducts, setAllProducts, total, countProducts, setCountProducts, setTotal }) => {

    const [active, setActive] = useState(false);

    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };
    //FUNCION QUE MANEJARA EL CAMBIO DE LA CANTIDAD DEL PRODUCTO EN EL INPUT
    const changeQuantityInput = (product, value) => {
        const products = allProducts.map(item =>
            item.id === product.id
                ? { ...item, quantity: Number(value) }
                : item
        );
        setAllProducts([...products]);
        let totalAnterior = total - product.price * product.quantity;
        let countAnterior = countProducts - product.quantity;
        let totalFinal = totalAnterior + product.price * Number(value);
        let countFinal = countAnterior + Number(value);
        setCountProducts(countFinal);
        setTotal(totalFinal);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    }

    return (
        <header style={{ backgroundColor: "yellow" }}>
            <h1 style={{ marginLeft: "10px", fontFamily: "sans-serif" }}>Jaguar Sport</h1>
            <div className="container-icon" style={{ marginRight: "10px" }}>
                <div className="container-cart-icon"
                    onClick={() => setActive(!active)}>
                    <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" alt="carrito" className="icon-cart" />
                    <div className="count-products">
                        <span id="contador-productos">{countProducts}</span>
                    </div>
                </div>
                <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                    {allProducts.length ? (
                        <>
                            <div className='row-product' style={{ marginTop: "10px" }}>
                                {allProducts.map(product => (
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div style={{ width: "65px" }}>
                                            <img src={product.urlImage} alt={product.title} />
                                        </div>
                                        <div style={{ width: "200px" }}>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <p
                                                    className='titulo-producto-carrito'>
                                                    {product.title}
                                                </p>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <div>
                                                    <span
                                                        className='precio-producto-carrito' style={{ marginRight: "3px" }}>
                                                        ${product.price}
                                                    </span>
                                                    <input type="number" 
                                                     style={{ width: "50px", textAlign:"center"}} 
                                                     value={product.quantity}
                                                     onChange={e=>changeQuantityInput(product, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img
                                                src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                                                alt="cerrar"
                                                className="icon-close"
                                                onClick={() => onDeleteProduct(product)}
                                            />
                                        </div>
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>
                            <button className='btn-clear-all'
                                onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>
        </header>
    );
};

