import { useState } from "react";
import { Button } from "./_element";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {

     const [bill, setBill] = useState("");
     const [paidByUser, setPaidByUser] = useState("");
     const [whoIsPlaying, setWhoIsPlaying] = useState("user");
     const paidByFriend = bill ? bill - paidByUser : "";

     function handleSubmit(e) {
          e.preventDefault();

          if (!bill || !paidByUser) {
               return;
          }

          onSplitBill(whoIsPlaying === "user" ? paidByFriend : -paidByUser);
     };

     return (

          <form className="form-split-bill" onSubmit={handleSubmit}>

               <h2>Split a bill with {selectedFriend.name}</h2>

               <label>► Bill value</label>
               <input type="text"
                    value={bill}
                    onChange={e => setBill(+e.target.value)} />

               <label>► Your expense</label>
               <input type="text"
                    value={paidByUser}
                    onChange={e => setPaidByUser(
                         +e.target.value > bill ? paidByUser : +e.target.value)} />

               <label>► {selectedFriend.name}'s expense</label>
               <input type="text" disabled value={paidByFriend} />

               <label>► Who is paying the bill</label>
               <select value={whoIsPlaying}
                    onChange={e => setWhoIsPlaying(e.target.value)}>

                    <option value="user">You</option>
                    <option value="friend">{selectedFriend.name}</option>

               </select>

               <Button>Split Bill</Button>

          </form>

     );

};