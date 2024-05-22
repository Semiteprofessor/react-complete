import { useState } from "react";
import "../eatNsplit.css";
import { v4 as uuidv4 } from "uuid";

const initialFriend = [
  {
    id: 118836,
    name: "Bola",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Kunle",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Uche",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const EatNSplit = () => {
  const [friends, setFriends] = useState(initialFriend);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  const handleShowAddFriend = () => {
    setShowAddFriend((prev) => !prev);
  };

  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    const newFriends = friends.map((friend) => {
      if (friend.id === selectedFriend.id) {
        return {
          ...friend,
          balance: friend.balance + value,
        };
      }
      return friend;
    });
    setFriends(newFriends);
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{`${
          !showAddFriend ? "Add Friend" : "Close"
        } `}</Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const FriendList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id;
  // console.log(selectedFriend.id, friend.id);
  return (
    <li className={isSelected ? "select" : ""}>
      <div className="friend">
        <img src={friend.image} alt={friend.name} width={50} />
        <div>
          <h3>{friend.name}</h3>
          {friend.balance < 0 && (
            <p className="red">
              You owe {friend.name} the sum of ₦{Math.abs(friend.balance)}
            </p>
          )}
          {friend.balance > 0 && (
            <p className="green">
              {friend.name} owes you the sum of {Math.abs(friend.balance)}
            </p>
          )}
          {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        </div>
      </div>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || image === "") return;

    const id = uuidv4();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <div>
        <label>Friend Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label> Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button>Add</button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bill === "" || paidByUser === "") return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <div>
        <label>💰 Bill Amount</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </div>
      <div>
        <label>🧔 Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value)
            )
          }
        />
      </div>
      <div>
        <label>👯‍♂️ {selectedFriend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend} />
      </div>
      <div>
        <label>😊 Who is paying the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
      </div>
      <button>Split Bill</button>
    </form>
  );
};

export default EatNSplit;
