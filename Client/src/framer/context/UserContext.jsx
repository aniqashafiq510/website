import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Context"; 
import apis from "../../config/Api";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [auth] = useAuth();
  const userId = auth?.user?._id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.get(`${apis.User}/${userId}`);
        setUser(data.user || null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider value={[user, loading, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
