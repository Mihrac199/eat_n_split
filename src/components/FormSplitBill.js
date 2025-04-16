import { useState } from "react";

export default function FormSplitBill({ selectedFriend }) {

     const [bill, setBill] = useState(null);
     const [paidByUser, setPaidByUser] = useState(null);
     const [whoIsPlaying, setWhoIsPlaying] = useState("user");
     const paidByFriend = bill ? bill - paidByUser : null;

     return (

          <form className="form-split-bill">

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

          </form>

     );

};