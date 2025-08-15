import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResults, searchUsers, selectSearch } from "../auth/searchSlice";
import type { AppDispatch } from "../store";

const UserSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector(selectSearch);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
        dispatch(searchUsers(value));
    } else {
        dispatch(clearResults());
    }
      
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search by username..."
        value={query}
        onChange={handleSearch}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.length > 0 ? (
          results.map((user: { id: React.Key | null | undefined; username: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          query && !loading && <li>No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
