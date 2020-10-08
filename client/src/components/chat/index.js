import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import styles from "./index.module.scss";

const Chat = ({ token }) => {
  const [response, setResponse] = useState("");
  const [form, setForm] = useState({ message: "", token: "" });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const PORT =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

  const socket = socketIOClient(PORT);

  useEffect(() => {
    socket.emit("auth", { token });
    socket.on("message", ({ message }) => console.log(message));
  });
  const emitMessage = e => {
    e.preventDefault();
    socket.emit("message", form);
  };

  return (
    <div className={styles.chat}>
      <form onSubmit={e => emitMessage(e)}>
        <label for={"message"}>Message</label>
        <input name={"message"} onChange={e => onChange(e)} />
        <br />
        <br />
        <label for={"token"}>Token</label>
        <input name={"token"} onChange={e => onChange(e)} />
        <br />
        <br />
        <input type="submit" value="wyślij" />
      </form>
      <div>sasdasd</div>
    </div>
  );
};

export default Chat;
