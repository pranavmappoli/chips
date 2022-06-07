import React from "react";
import "./users.css";
import { FaUserSecret, GrClose } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function User(props) {
  return (
    <li onClick={props.addUser}>
      <div className="user-item" id={props.id}>
        <FaUserSecret />
        {props.name}
        {props.close && <AiOutlineClose onClick={props.closebtn} />}
      </div>
    </li>
  );
}
User.defaultProps = {
  close: false,
  closebtn: () => {
    return;
  },
};

export default User;