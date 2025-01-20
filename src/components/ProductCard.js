import React from "react";
import './ProductCard.css'
import "@fontsource/luckiest-guy";

export default function ProductCard({name, image, price, color, description}) {
    return (
        <>
            <div className="product-card">
                <div className="product-card-image-section">
                    <div className="product-image">
                        <img src={`images/` + image +`.jpg`} alt="" className={(color === 0 ? 'orange' : color === 1 ? 'blue' : color === 2 ? 'pink' : '')}/>
                    </div>
                </div>
                <div className="product-card-bottom-section">
                    <div className="product-title">{name}</div>
                    <div className="product-description" title={description}>
                     {description}
                    </div>
                    <div className="product-price">{price}</div>
                    <div className='add-to-cart-cta'>
                        <button className={(color === 0 ? 'orange' : color === 1 ? 'blue' : color === 2 ? 'pink' : '')}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}