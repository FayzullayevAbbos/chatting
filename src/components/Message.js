import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  // Function to format text
  const formatText = (text, length) => {
    let result = "";
    let currentIndex = 0;

    while (currentIndex < text.length) {
      let nextSpaceIndex = text.indexOf(" ", currentIndex + length);
      if (nextSpaceIndex === -1) {
        result += text.substring(currentIndex) + "\n";
        break;
      } else {
        result += text.substring(currentIndex, nextSpaceIndex) + "\n";
        currentIndex = nextSpaceIndex + 1; 
      }
    }

    return result;
  };

  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {formatText(msg.text, 10)}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
