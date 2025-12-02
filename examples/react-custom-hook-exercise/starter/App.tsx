import { useFetch } from "./useFetch";
import { User, Post } from "./types";

/**
 * Example component demonstrating how to use the useFetch hook
 *
 * This component fetches users from the JSONPlaceholder API
 * and displays them in a list
 */
function App() {
  // TODO: Use the useFetch hook to fetch users
  // const { data, loading, error, refetch } = useFetch<User[]>(
  //   'https://jsonplaceholder.typicode.com/users'
  // );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>useFetch Hook Exercise</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Users List</h2>
        {/* TODO: Display loading state */}
        {/* TODO: Display error state */}
        {/* TODO: Display data */}
        {/* TODO: Add refetch button */}

        <p>Implement the useFetch hook to see the users here!</p>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <h3>Instructions:</h3>
        <ol>
          <li>Complete the useFetch hook implementation in useFetch.ts</li>
          <li>Uncomment the useFetch hook call above</li>
          <li>Display loading state while fetching</li>
          <li>Display error message if request fails</li>
          <li>Display the list of users when data is available</li>
          <li>Add a button to trigger refetch</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
