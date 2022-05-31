import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";

function SingleUser(prop) {
  const { id } = prop;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then(setUser)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Link to={`/user/${user.id}`}>
      {user.firstName} {user.lastName}
    </Link>
  );
}

export default SingleUser;
