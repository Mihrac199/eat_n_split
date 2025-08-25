import { Button } from "./_element"


export default function Friend({ friend, handleSelection, selectedFriend }) {

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