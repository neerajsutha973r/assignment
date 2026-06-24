import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("");
  const [cursorUpdatedAt, setCursorUpdatedAt] = useState("");
  const [cursorId, setCursorId] = useState("");

  const fetchProducts = async () => {
    let url = "https://assignment-95xc.vercel.app/products";//

    const queryParams = [];

    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }

    if (cursorUpdatedAt) {
      queryParams.push(
        `cursorUpdatedAt=${encodeURIComponent(cursorUpdatedAt)}`
      );
    }

    if (cursorId) {
      queryParams.push(`cursorId=${cursorId}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    console.log(url);

    const res = await axios.get(url);

    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <h3>Category</h3>

      <label>
        <input
          type="checkbox"
          checked={category === "Books"}
          onChange={(e) =>
            setCategory(e.target.checked ? "Books" : "")
          }
        />
        Books
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={category === "Electronics"}
          onChange={(e) =>
            setCategory(e.target.checked ? "Electronics" : "")
          }
        />
        Electronics
      </label>

      <br />
       <label>
        <input
          type="checkbox"
          checked={category === "Clothing"}
          onChange={(e) =>
            setCategory(e.target.checked ? "Clothing" : "")
          }
        />
        Clothing
      </label>
      <br />
       <label>
        <input
          type="checkbox"
          checked={category === "Sports"}
          onChange={(e) =>
            setCategory(e.target.checked ? "Sports" : "")
          }
        />
        Sports
      </label>
      <br></br>
       <label>
        <input
          type="checkbox"
          checked={category === "Home"}
          onChange={(e) =>
            setCategory(e.target.checked ? "Home" : "")
          }
        />
        Home
      </label>
      <br></br>

      <input
        type="text"
        placeholder="cursorUpdatedAt"
        value={cursorUpdatedAt}
        onChange={(e) => setCursorUpdatedAt(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="cursorId"
        value={cursorId}
        onChange={(e) => setCursorId(e.target.value)}
      />

      <br />
      <br />

      <button onClick={fetchProducts}>Search</button>

      <hr />

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>₹{product.price}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;