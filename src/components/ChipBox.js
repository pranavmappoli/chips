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
  const selectedChipsRef = useRef([]);
  const displayUsersRef = useRef([]);
  // layoutRef.current = layoutState;

  const showUsers = (users) => {
    const userList = users.map((user) => (
      <User
        addUserFlag={true}
        id={user.id}
        key={user.id}
        name={user.name}
        addUser={addUserToChip}
      />
    ));
    displayUsersRef.current = userList;
    setDisplayusers(userList);
    removeFromList();
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
    const newDisplayUsers = displayUsersRef.current.filter((user) => {
      if (selectedChipsRef.current.length == 0) return true;
      for (const obj of selectedChipsRef.current) {
        if (obj.props.id == user.props.id) return false;
      }
      return true;
    });

    displayUsersRef.current = newDisplayUsers;
    setDisplayusers(newDisplayUsers);
  };

  const removeUserFromChip = (e) => {
    let removeduserID;
    const newchips = selectedChipsRef.current.filter((user) => {
      if (user.props.id !== +e.currentTarget.id) return true;
      else {
        removeduserID = user.props.id;
        return false;
      }
    });
    // console.log(removeduserID, e, e.currentTarget.id);
    selectedChipsRef.current = newchips;
    setSelectedChips(newchips);
    showUsers(users);
  };
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
    selectedChipsRef.current = [...selectedChipsRef.current, chipUser];
    setSelectedChips((prev) => [...prev, chipUser]);
    removeFromList();
  };

  const cleanUsers = () => {
    selectedChipsRef.current = [];
    setDisplayusers([]);
    setSelectedChips([]);
    selectedChipsRef.current = [];
    displayUsersRef.current = [];
  };
  return (
    <>
      <div className="chipcontainer">
        <div className="chipBoxContainer">
          <label htmlFor="chips" className="chips">
            {selectedChips}
            <div className="input-list">
              <input
                id="chips-selected"
                list="usernames"
                className="chipbox"
                type="text"
                placeholder="Enter name"
                onFocus={searchUsers}
                onChange={searchUsers}
              />
              <ul>{displayUsers}</ul>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

export default ChipBox;
