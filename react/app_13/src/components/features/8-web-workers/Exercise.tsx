import { useState } from "react";
import "./styles.css";

/**
 * Web Workers Exercise
 *
 * TODO: Implement a Web Worker solution for image processing
 *
 * Requirements:
 * 1. Create a worker that applies filters to images (grayscale, blur, etc.)
 * 2. Compare performance with main thread processing
 * 3. Show progress updates during processing
 * 4. Handle multiple images in parallel
 *
 * Bonus:
 * - Add ability to cancel ongoing operations
 * - Implement worker pooling for multiple images
 * - Add transferable objects for better performance
 */

export default function WebWorkersExercise() {
  const [status] = useState<string>("Ready to start");

  return (
    <div className="web-workers-container">
      <h1>🧵 Web Workers Exercise</h1>

      <div className="explanation-box">
        <h3>Your Task</h3>
        <p>Create a Web Worker-based image processing application that can:</p>
        <ul>
          <li>Apply filters to images without blocking the UI</li>
          <li>Process multiple images in parallel</li>
          <li>Show real-time progress updates</li>
          <li>Allow cancellation of ongoing operations</li>
        </ul>
      </div>

      <div
        className="result-box"
        style={{
          background: "#f8f9fa",
          color: "#495057",
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <h3>Status: {status}</h3>
        <p>Start implementing your solution here!</p>

        <div style={{ marginTop: "2rem" }}>
          <h4>Steps to complete:</h4>
          <ol>
            <li>Create an image-processing.worker.ts file</li>
            <li>Implement filter algorithms (grayscale, blur, sepia, etc.)</li>
            <li>Set up worker communication with postMessage</li>
            <li>Add progress tracking</li>
            <li>Implement cancellation mechanism</li>
            <li>Compare with main thread processing</li>
          </ol>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h4>Hints:</h4>
          <ul>
            <li>Use Canvas API to manipulate image data</li>
            <li>ImageData can be transferred using Transferable Objects</li>
            <li>Use AbortController pattern for cancellation</li>
            <li>Consider using OffscreenCanvas in workers (if supported)</li>
          </ul>
        </div>
      </div>

      <div className="tips-box" style={{ marginTop: "2rem" }}>
        <h3>💡 Resources</h3>
        <ul>
          <li>
            <strong>MDN Web Workers:</strong>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Documentation
            </a>
          </li>
          <li>
            <strong>Transferable Objects:</strong>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Learn more
            </a>
          </li>
          <li>
            <strong>OffscreenCanvas:</strong>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              API Reference
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
