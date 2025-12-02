import { useFetch } from "./useFetch";
import { User, Post } from "./types";

/**
 * Example component demonstrating how to use the useFetch hook
 *
 * This component fetches users from the JSONPlaceholder API
 * and displays them in a list with proper loading and error handling
 */
function App() {
  // Use the useFetch hook to fetch users
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>useFetch Hook - Solution</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Users List</h2>

        {/* Loading state */}
        {loading && (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            <p>Loading users...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            style={{
              padding: "15px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
              color: "#c00",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Data display */}
        {!loading && !error && users && (
          <>
            <button
              onClick={refetch}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "20px",
                fontSize: "14px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              🔄 Refetch Users
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 style={{ marginTop: 0, color: "#333" }}>{user.name}</h3>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Website:</strong> {user.website}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Company:</strong> {user.company.name}
                  </p>
                  <p
                    style={{ margin: "5px 0", color: "#666", fontSize: "12px" }}
                  >
                    <strong>City:</strong> {user.address.city}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ marginTop: "20px", color: "#666" }}>
              Total users: {users.length}
            </p>
          </>
        )}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
          border: "1px solid #4caf50",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#2e7d32" }}>
          ✅ Solution Features:
        </h3>
        <ul style={{ color: "#1b5e20" }}>
          <li>✅ TypeScript generics for type safety</li>
          <li>✅ Loading state management</li>
          <li>✅ Error handling with user-friendly messages</li>
          <li>✅ Request cancellation with AbortController</li>
          <li>✅ Manual refetch functionality</li>
          <li>✅ Responsive grid layout</li>
          <li>✅ Clean and maintainable code</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#fff3e0",
          borderRadius: "8px",
          border: "1px solid #ff9800",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#e65100" }}>💡 Key Concepts:</h3>
        <ul style={{ color: "#bf360c" }}>
          <li>
            <strong>Custom Hooks:</strong> Reusable logic encapsulation
          </li>
          <li>
            <strong>TypeScript Generics:</strong> Type-safe data handling
          </li>
          <li>
            <strong>useEffect:</strong> Side effects and cleanup
          </li>
          <li>
            <strong>useState:</strong> State management
          </li>
          <li>
            <strong>useCallback:</strong> Memoized functions
          </li>
          <li>
            <strong>AbortController:</strong> Request cancellation
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
