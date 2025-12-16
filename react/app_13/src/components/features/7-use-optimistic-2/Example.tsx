import { useOptimistic, useState, startTransition } from "react";

function fakeServerLike() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000); // very slow server
  });
}

export default function LikeButton() {
  const [likes, setLikes] = useState(10);

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current) => current + 1
  );

  async function handleLike() {
    // 🚀 Optimistic update MUST be in a transition
    startTransition(async () => {
      addOptimisticLike(likes);
      // Simulate server request
      await fakeServerLike();

      // Update real state
      setLikes((prev) => prev + 1);
    });
  }

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <p>❤️ Likes: {optimisticLikes}</p>
      <button onClick={handleLike}>Like</button>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        (Server response delayed 2s)
      </p>
    </div>
  );
}
