import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);

  const fetchProducts = async () => {
    let url = "http://localhost:3000/products";

    if (nextCursor) {
      url += `?cursorUpdatedAt=${encodeURIComponent(
        nextCursor.updated_at
      )}`;

      url += `&cursorId=${nextCursor.id}`;
    }
    
    console.log("URL:", url);
    const res = await axios.get(url);

    setProducts(prev => [...prev, ...res.data.data]);
    setNextCursor(res.data.nextCursor);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>₹{product.price}</p>
          <hr />
        </div>
      ))}

      <button onClick={fetchProducts}>
        Load More
      </button>
    </div>
  );
}

export default App;