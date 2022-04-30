import React from "react";

const Notification = (prop) => {
  if (prop === null) {
    return null;
  }
  return <div className={prop.style}>{prop.text}</div>;
};

export default Notification;