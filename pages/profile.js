import React, { useEffect, useState } from "react";
import { getUserProfile } from "../lib/auth";

export default () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserProfile().then((res) => {
      setUserData(res);
    });
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};
