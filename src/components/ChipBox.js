import React, { useState, useEffect, useRef } from "react";
import "./chipbox.css";
import User from "./User";

function ChipBox() {
  const tempUsers = [
    { id: 1, name: "nick" },
    { id: 2, name: "nicker" },
    { id: 3, name: "pranav" },
    { id: 4, name: "arjun" },
    { id: 5, name: "aranjan" },
    { id: 6, name: "arakkal" },
  ];
  const [users, setUserNames] = useState(tempUsers);
  const [displayUsers, setDisplayusers] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const selectedChipsRef = useRef({});
  const displayUsersRef = useRef({});
  // layoutRef.current = layoutState;
  useEffect(() => {
    console.log("mounted", displayUsers);
    return () => {
      console.log("unmounted");
    };
  });
  const showUsers = (users) => {
    const userList = users.map((user, id) => (
      <User
        id={user.id}
        key={user.id}
        name={user.name}
        addUser={addUserToChip}
      />
    ));

    setDisplayusers(userList);
    displayUsersRef.current = userList;
  };

  const searchUsers = (e) => {
    const newList = users.filter((user) => {
      if (user.name.startsWith(e.target.value.toLowerCase())) {
        return user;
      }
    });
    showUsers(newList);
  };
  const removeFromList = () => {
    console.log(selectedChipsRef);

    selectedChips.map((elem) => {
      console.log(elem);
    });
  };
  const removeUserFromChip = (e) => {};
  const addUserToChip = (e) => {
    const chipsSelected = users.filter((user) => user.id === +e.target.id);
    const chipUser = (
      <User
        id={chipsSelected[0].id}
        key={chipsSelected[0].id}
        name={chipsSelected[0].name}
        removeUser={removeUserFromChip}
        close={true}
      />
    );
    setSelectedChips((prev) => [...prev, chipUser]);
    selectedChipsRef.current = selectedChips;
    removeFromList();
  };
  return (
    <>
      <div className="chipBoxContainer">
        <label htmlFor="chips-selected" className="chips">
          {selectedChips}

          <input
            id="chips-selected"
            list="usernames"
            className="chipbox"
            type="text"
            placeholder="Enter name"
            onClick={searchUsers}
            onChange={searchUsers}
          />
        </label>
        <ul>{displayUsers}</ul>
      </div>
    </>
  );
}

export default ChipBox;
