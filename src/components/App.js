import { useState } from "react";


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}


export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAdd() {
    setShowAddFriend(show => !show);
  };

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  };

  function handleSelection(friend) {
    setSelectedFriend(selected => selected?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  };

  return (

    <div className="app">

      <div className="sidebar">

        <FriendsList
          friends={friends}
          handleSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && (
          <FormAddFriend handleAddFriend={handleAddFriend} />
        )}

        <Button onClick={handleShowAdd}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>

      </div>

      {selectedFriend && (
        <FormSplitBill selectedFriend={selectedFriend} />
      )}

    </div>

  );

};


function FriendsList({ friends, handleSelection, selectedFriend }) {

  return (

    <ul>

      {friends.map(friend => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
      ))}

    </ul>

  );

};


function Friend({ friend, handleSelection, selectedFriend }) {

  const isSelected = friend.id === selectedFriend?.id;

  return (

    <li className={isSelected ? "selected" : null}>

      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}₺
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}₺
        </p>
      )}

      {friend.balance === 0 && (
        <p>You and {friend.name} are even</p>
      )}

      <Button onClick={() => handleSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>

    </li>

  );

};


function FormAddFriend({ handleAddFriend }) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = Date.now();

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (

    <form className="form-add-friend" onSubmit={handleSubmit}>

      <label>► Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>► Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>

    </form>

  );

};


function FormSplitBill({ selectedFriend }) {

  return (

    <form className="form-split-bill">

      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>► Bill value</label>
      <input type="text" />

      <label>► Your expense</label>
      <input type="text" />

      <label>► {selectedFriend.name}'s expense</label>
      <input type="text" disabled />

      <label>► Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

    </form>

  );

};