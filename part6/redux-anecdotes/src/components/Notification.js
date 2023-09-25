import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, type } = notification;

  if (!message) {
    return null;
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    color: type === "success" ? "green" : "red",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
