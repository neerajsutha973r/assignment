import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [cursorUpdatedAt, setCursorUpdatedAt] = useState("");
  const [cursorId, setCursorId] = useState("");
  const [nextCursor, setNextCursor] = useState(null);

  const fetchProducts = async (reset = false) => {
    try {
      let url = "https://assignment-95xc.vercel.app";

      const queryParams = [];

      if (category) {
        queryParams.push(
          `category=${encodeURIComponent(category)}`
        );
      }

      if (reset) {
        if (cursorUpdatedAt) {
          queryParams.push(
            `cursorUpdatedAt=${encodeURIComponent(
              cursorUpdatedAt
            )}`
          );
        }

        if (cursorId) {
          queryParams.push(`cursorId=${cursorId}`);
        }
      } else if (nextCursor) {
        queryParams.push(
          `cursorUpdatedAt=${encodeURIComponent(
            nextCursor.updated_at
          )}`
        );

        queryParams.push(`cursorId=${nextCursor.id}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      console.log(url);

      const res = await axios.get(url);

      if (reset) {
        setProducts(res.data.data);
      } else {
        setProducts((prev) => [...prev, ...res.data.data]);
      }

      setNextCursor(res.data.nextCursor);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const handleSearch = () => {
    fetchProducts(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <h3>Category Filter</h3>

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
            setCategory(
              e.target.checked ? "Electronics" : ""
            )
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

      <br />

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

      <br />
      <br />

      <input
        type="text"
        placeholder="cursorUpdatedAt"
        value={cursorUpdatedAt}
        onChange={(e) =>
          setCursorUpdatedAt(e.target.value)
        }
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

      <button onClick={handleSearch}>
        Search
      </button>

      <hr />

      {products.map((product) => (
  <div key={product.id}>
    <h3>{product.name}</h3>

    <p>Category: {product.category}</p>
    <p>Price: ₹{product.price}</p>

    <p>Created At: {product.created_at}</p>
    <p>Updated At: {product.updated_at}</p>

    <hr />
  </div>
))}

      {nextCursor && (
        <button onClick={() => fetchProducts(false)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;