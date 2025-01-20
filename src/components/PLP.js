import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';

export default function PLP() {
      const [data, setData] = useState(null);
      let colorCode = 0;
      useEffect(() => {
        fetch('http://localhost:3500/products')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
      }, []);
      if (!data) return <div>Loading...</div>;
    return (
        <>
            <Header />
            <div className='plp'>
                {
                    data.products.map((e) => {
                        colorCode = colorCode + 1;
                        return <ProductCard name={e.name} image={e.id} price={e.price} description={e.description} color={colorCode % 3}/>
                    })
                }
            </div>
        </>
    )
}