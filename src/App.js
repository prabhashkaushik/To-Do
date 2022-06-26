import React, { useState } from "react";
import "./App.css";
function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  function addItem() {
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }
  function editItem(id, newText) {
    const currentItem = items.filter((item) => item.id === id);
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  // Main part of app
  return (
    <div className="app">
      {/* 1. Header  */}
      <div className="upper_part">
      <h1>Todo List</h1>
      </div>
      {/* 2. Add new item */}
      <input
        type="text"
        placeholder="Add Your item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      {/* (button) */}
      <button className="button" onClick={() => addItem()}>Submit</button>

      {/* 3. List of todos  */}
      <ul>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button">❌</button>
              </li>
              {showEdit == item.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="You want to edit....."
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)} />
                  <button className="button" onClick={() => editItem(item.id, updatedText)}> Edit </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
