import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);

  const fetchProducts = async () => {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    let url = "https://assignment-95xc.vercel.app/products";

    const queryParams = [];

    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }

    if (nextCursor) {
      queryParams.push(
        `cursorUpdatedAt=${encodeURIComponent(nextCursor.updated_at)}`
      );
      queryParams.push(`cursorId=${nextCursor.id}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    console.log(url);

    const res = await axios.get(url);

    setProducts((prev) => [...prev, ...res.data.data]);
    setNextCursor(res.data.nextCursor);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>₹{product.price}</p>
          <hr />
        </div>
      ))}

      <button onClick={fetchProducts}>Load More</button>
    </div>
  );
}

export default App;