import React from "react";

import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const MessageForm = ({ handleSubmit, text, setText }) => {
  return (
    <form
      className='message_form relative '
      onSubmit={handleSubmit}
    >
      <div>
        <Input
          style={{
            // backgroundColor: "#333333",
            color: "white",
            border: "1px solid #333",
            padding: "10px",
          }}
          type='text'
          placeholder='Enter message'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='absolute right-[46%] bottom-[3px]'>
        <Button htmlType="submit" className='h-9' type='primary' large>
          <SendOutlined />
        </Button>
      </div>
    </form>
  );
};

export default MessageForm;
