import Friend from "./Friend";


export default function FriendsList({ friends, handleSelection, selectedFriend }) {

     return (

          <ul>

               {friends.map(friend => (
                    <Friend
                         friend={friend}
                         key={friend.id}
                         handleSelection={handleSelection}
                         selectedFriend={selectedFriend} />
               ))}

          </ul>

     );

};