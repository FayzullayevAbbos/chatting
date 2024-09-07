import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const User = ({ user1, user, selectUser, chat, setOnline }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id =
      user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper overflow-hidden  ${
          chat.name === user.name && "selected_user"
        }`}
        onClick={() => {
          console.log(user);
          selectUser(user);
          setOnline(user.isOnline);
        }}
      >
        <div className='user_info relative '>
          <div className='user_detail  '>
            <div className='avatar grid  place-content-center text-[20px] pb-[3px] bg-orange-400'>
              {user.name.charAt(0)}
            </div>
            <h4 className='text-[20px] absolute left-14 font-semibold top-1'>
              {user.name}
            </h4>
            {data?.from !== user1 && data?.unread && (
              <small className='unread absolute right-2 px-2 '>
                New
              </small>
            )}
          </div>
          <div
            className={`user_status ${
              user.isOnline ? "online" : "offline"
            } absolute bottom-0 left-9`}
          ></div>
          {data && (
            <p className='truncate absolute bottom-0 left-16 opacity-[0.4] pr-20 '>
              <strong>{data.from === user1 ? "Me:" : null}</strong>
              {data.text}
            </p>
          )}
        </div>
      </div>
      {/* <div
        onClick={() => {
          selectUser(user)
          setOnline(user.isOnline);
        }}
        className={`sm_container flex  md:hidden  ${
          chat.name === user.name && "selected_user"
        }`}
      >
        <div className='avatar grid  place-content-center text-[20px] pb-[3px] bg-orange-400'>
          {user.name.charAt(0)}
        </div>
      </div> */}
    </>
  );
};

export default User;
