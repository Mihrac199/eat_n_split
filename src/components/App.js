import { useState } from "react";
import { Button } from "./_element";
import { initialFriends } from "./_config";
import FriendsList from "./FriendsList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";


export default function App() {

  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAdd() {
    setShowAddFriend(show => !show);
    // setSelectedFriend(null);
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