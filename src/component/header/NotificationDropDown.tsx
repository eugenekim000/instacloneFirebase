import React, {
  ReactElement,
  useRef,
  useEffect,
  useContext,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { notificationQuery } from "../../queries";
import { db } from "../../firebase";
import { NotificationItem } from "./NotificationItem";
import Skeleton from "@material-ui/lab/Skeleton";

interface Props {
  setHeartRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NotificationDropdown({ setHeartRender }: Props): ReactElement {
  const myRef: any = useRef();
  const user = useContext(UserContext);
  const [notifications, setNotifications] = useState<any>([]);

  const handleClickOutside = (e: any) => {
    if (!myRef.current!.contains(e.target)) {
      setHeartRender(false);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;

    unsubscribe = db
      .collection("users")
      .doc(user.displayName)
      .collection("notifications")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setNotifications(snapshot.docs.map((doc) => doc.data()));
        snapshot.docs.map((doc) => console.log(doc.data()));
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={myRef} className="profile-dropdown-container">
      <div className="notification-dropdown-wrapper">
        {notifications[0] ? (
          notifications.map((notification: any) => (
            <NotificationItem notification={notification}></NotificationItem>
          ))
        ) : (
          <>
            <Skeleton variant="rect" width={400} height={200} />
          </>
        )}
      </div>
    </div>
  );
}
