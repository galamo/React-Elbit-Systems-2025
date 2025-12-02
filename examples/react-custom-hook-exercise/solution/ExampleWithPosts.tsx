import { useState } from "react";
import { useFetch } from "./useFetch";
import { Post } from "./types";

/**
 * Additional example showing useFetch with Posts
 * Demonstrates switching between different endpoints
 */
function ExampleWithPosts() {
  const [userId, setUserId] = useState<number>(1);

  // Fetch posts for a specific user
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>useFetch Hook - Posts Example</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Posts by User</h2>

        {/* User selector */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="userId"
            style={{ marginRight: "10px", fontWeight: "bold" }}
          >
            Select User ID:
          </label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={{
              padding: "8px 12px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              marginRight: "10px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>

          <button
            onClick={refetch}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#218838")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#28a745")
            }
          >
            🔄 Refetch
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            <p>Loading posts...</p>
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
        {!loading && !error && posts && (
          <>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Showing {posts.length} posts for User {userId}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 style={{ marginTop: 0, color: "#333", fontSize: "18px" }}>
                    {post.id}. {post.title}
                  </h3>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "#666",
                      lineHeight: "1.6",
                    }}
                  >
                    {post.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
          border: "1px solid #2196f3",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#1565c0" }}>
          📌 This Example Demonstrates:
        </h3>
        <ul style={{ color: "#0d47a1" }}>
          <li>Dynamic URL changes (userId parameter)</li>
          <li>Automatic refetch when URL changes</li>
          <li>Manual refetch with button</li>
          <li>Type safety with Post interface</li>
          <li>Different data structure handling</li>
        </ul>
      </div>
    </div>
  );
}

export default ExampleWithPosts;
