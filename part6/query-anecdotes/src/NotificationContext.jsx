import { createContext, useReducer, useContext, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `Created Anecdote: '${action.content}'`;
    case "VOTE":
      return `Voted for Anecdote '${action.content}'`;
    case "CLEAR":
      return "";
    case "ERROR":
      return `Error: ${action.content}`;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  const [state, dispatch] = context;
  return dispatch;
};

export const useNotificationState = () => {
  const context = useContext(NotificationContext);
  const [state, dispatch] = context;

  useEffect(() => {
    let timerId;
    if (state !== "") {
      timerId = setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [state, dispatch]);

  return state;
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
