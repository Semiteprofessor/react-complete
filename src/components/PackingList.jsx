import { useState } from "react";
import "../App.css";

const PackingList = () => {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all items?"
    );
    confirm && setItems([]);
  };
  return (
    <div>
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <List
        items={items}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return <div className="logo">🌴 FAR AWAY 💼 </div>;
};

const Form = ({ handleAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description === "") return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4>What do you need for your ✈ trip ?</h4>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <>
            <option key={num} value={num}>
              {num}
            </option>
          </>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const List = ({ items, onDelete, onToggle, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
};

const Item = ({ item, onDelete, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button className="btn" onClick={() => onDelete(item.id)}>
        ❌
      </button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length)
    return (
      <footer className="stat">
        <em>Start adding some items to your packing list </em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stat">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go"
          : `🧰 You have ${numItems} items on your list, and you already packed  ${numPacked} (${percentage}%) `}
      </em>
    </footer>
  );
};

export default PackingList;
