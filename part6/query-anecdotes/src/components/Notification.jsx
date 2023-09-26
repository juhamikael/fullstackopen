import { useNotificationState } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationState();
  const style = {
    border: notification ? "solid" : "none",
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    borderWidth: 1,
    marginBottom: 5,
    left: "50%",
    transform: "translateX(-50%)",

    color: notification.startsWith("Error") ? "#f56565" : "#48bb78",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
