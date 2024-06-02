import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/use.auth";
import { AUTH_GET_USER_DATA } from "@/constant/apiKeys";
import { UserData, UserError } from "../../types";

const useUserData = () => {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<UserError | null>(null);

  const fetchUserData = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        setLoading(true); // Ensure loading state is set before fetching data
        const response = await axios.get(
          `${process.env.API_URL}${AUTH_GET_USER_DATA}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error: any) {
        setError({ message: error.message });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { userData, loading, error, refreshUserData: fetchUserData };
};

export default useUserData;
