import React from "react";
import "./users.css";
import { FaUserSecret, GrClose } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function User(props) {
  return (
    <>
      {props.addUserFlag && (
        <li onClick={props.addUser}>
          <div className="user-item" id={props.id}>
            <FaUserSecret />
            {props.name}
          </div>
        </li>
      )}

      {!props.addUserFlag && (
        <div>
          <div className="user-item-chip" id={props.id}>
            <FaUserSecret className="user-icon" />
            {props.name}
            {props.close && (
              <div
                id={props.id}
                className="close-btn"
                onClick={props.removeUser}
              >
                <AiOutlineClose id={props.id} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
User.defaultProps = {
  close: false,
  addUserFlag: false,
  removeUser: () => {
    return null;
  },
};

export default User;
