import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";
import "./styles.css";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Exercise 1: Contact Form with Status
function ContactSubmitButton() {
  // TODO: Use useFormStatus to get the pending state
  // Hint: const { pending } = useFormStatus();
  const pending = false; // Replace this

  return (
    <button type="submit" disabled={pending} className="submit-button">
      {/* TODO: Show "Sending..." when pending, "Send Message" otherwise */}
      Send Message
    </button>
  );
}

function ContactFormExercise() {
  const [result, setResult] = useState<string>("");

  async function handleContact(formData: FormData) {
    await delay(2000);
    const name = formData.get("name");
    const message = formData.get("message");
    setResult(`Message from ${name} sent successfully!`);
  }

  return (
    <div className="exercise-section">
      <h3>📧 Exercise 1: Contact Form</h3>
      <p className="exercise-description">
        Add useFormStatus to show loading state on the submit button
      </p>

      <form action={handleContact} className="demo-form">
        <div className="form-group">
          <label htmlFor="contact-name">Name:</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email:</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message:</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            placeholder="Your message..."
          />
        </div>
        <ContactSubmitButton />
      </form>
      {result && <div className="success-message">{result}</div>}

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Import useFormStatus from 'react-dom'</li>
          <li>Use it inside the ContactSubmitButton component</li>
          <li>Destructure the pending property</li>
          <li>Show different text based on pending state</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 2: Login Form with Disabled Inputs
function LoginInputs() {
  // TODO: Get the pending state from useFormStatus
  // TODO: Disable all inputs when pending is true
  const pending = false; // Replace this

  return (
    <>
      <div className="form-group">
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          name="email"
          required
          disabled={pending}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          id="login-password"
          name="password"
          required
          disabled={pending}
          placeholder="Enter your password"
        />
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" name="remember" disabled={pending} />
          Remember me
        </label>
      </div>
    </>
  );
}

function LoginButton() {
  // TODO: Use useFormStatus to show loading state
  const pending = false; // Replace this

  return (
    <button type="submit" disabled={pending} className="submit-button">
      {/* TODO: Show spinner and "Logging in..." when pending */}
      {pending ? (
        <>
          {/* TODO: Add a spinner element */}
          Logging in...
        </>
      ) : (
        "Log In"
      )}
    </button>
  );
}

function LoginFormExercise() {
  const [result, setResult] = useState<string>("");

  async function handleLogin(formData: FormData) {
    await delay(2500);
    const email = formData.get("email");
    setResult(`Welcome back, ${email}!`);
  }

  return (
    <div className="exercise-section">
      <h3>🔐 Exercise 2: Login Form</h3>
      <p className="exercise-description">
        Disable all inputs during submission and show loading state
      </p>

      <form action={handleLogin} className="demo-form">
        <LoginInputs />
        <LoginButton />
      </form>
      {result && <div className="success-message">{result}</div>}

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Use useFormStatus in both LoginInputs and LoginButton</li>
          <li>Disable all inputs when pending is true</li>
          <li>
            Add a spinner element: <span className="spinner"></span>
          </li>
          <li>Show "Logging in..." text during submission</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 3: Newsletter Form with Progress
function NewsletterButton() {
  // TODO: Use useFormStatus to get pending and data
  // TODO: Show progress information using the data
  const pending = false; // Replace this
  const data = null; // Replace this

  return (
    <div className="progress-container">
      <button type="submit" disabled={pending} className="submit-button">
        {/* TODO: Show "Subscribing..." when pending */}
        Subscribe
      </button>
      {/* TODO: Show progress info when pending and data exists */}
      {/* Hint: Show the email being subscribed */}
    </div>
  );
}

function NewsletterFormExercise() {
  const [result, setResult] = useState<string>("");

  async function handleSubscribe(formData: FormData) {
    await delay(2000);
    const email = formData.get("email");
    setResult(`Successfully subscribed ${email} to our newsletter!`);
  }

  return (
    <div className="exercise-section">
      <h3>📬 Exercise 3: Newsletter Subscription</h3>
      <p className="exercise-description">
        Show progress information during form submission
      </p>

      <form action={handleSubscribe} className="demo-form">
        <div className="form-group">
          <label htmlFor="newsletter-email">Email Address:</label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            required
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="weekly" />
            Send me weekly updates
          </label>
        </div>
        <NewsletterButton />
      </form>
      {result && <div className="success-message">{result}</div>}

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Destructure both pending and data from useFormStatus</li>
          <li>Check if pending && data before showing progress</li>
          <li>Get email with: data.get('email') as string</li>
          <li>Show a message like "Subscribing email@example.com..."</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 4: Multi-Action Form
function SaveDraftButton() {
  // TODO: Use useFormStatus to show loading state
  // TODO: Only show loading when this specific button is clicked
  const pending = false; // Replace this

  return (
    <button
      type="submit"
      name="action"
      value="draft"
      disabled={pending}
      className="save-button"
    >
      {/* TODO: Show "Saving..." when pending */}
      Save Draft
    </button>
  );
}

function SubmitPostButton() {
  // TODO: Use useFormStatus to show loading state
  const pending = false; // Replace this

  return (
    <button
      type="submit"
      name="action"
      value="submit"
      disabled={pending}
      className="publish-button"
    >
      {/* TODO: Show "Submitting..." when pending */}
      Submit Post
    </button>
  );
}

function MultiActionExercise() {
  const [result, setResult] = useState<string>("");

  async function handlePost(formData: FormData) {
    await delay(1500);
    const action = formData.get("action");
    const title = formData.get("title");
    setResult(
      `Post "${title}" ${action === "submit" ? "submitted" : "saved as draft"}!`
    );
  }

  return (
    <div className="exercise-section">
      <h3>✍️ Exercise 4: Blog Post Form</h3>
      <p className="exercise-description">
        Handle multiple actions with different loading states
      </p>

      <form action={handlePost} className="demo-form">
        <div className="form-group">
          <label htmlFor="post-title">Post Title:</label>
          <input
            type="text"
            id="post-title"
            name="title"
            required
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-content">Content:</label>
          <textarea
            id="post-content"
            name="content"
            rows={5}
            required
            placeholder="Write your post..."
          />
        </div>
        <div className="button-group">
          <SaveDraftButton />
          <SubmitPostButton />
        </div>
      </form>
      {result && <div className="success-message">{result}</div>}

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Use useFormStatus in both button components</li>
          <li>Both buttons will be disabled when either is clicked</li>
          <li>Show appropriate loading text for each button</li>
          <li>Use name="action" and different values to distinguish buttons</li>
        </ul>
      </div>
    </div>
  );
}

export default function UseFormStatusExercise() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useFormStatus Hook - Exercises</h1>
        <p className="feature-description">
          Practice tracking form submission status
        </p>
        <div className="navigation-links">
          <Link to="/use-form-status" className="nav-link">
            ← Back to Examples
          </Link>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>

      <div className="exercises-container">
        <ContactFormExercise />
        <LoginFormExercise />
        <NewsletterFormExercise />
        <MultiActionExercise />
      </div>

      <div className="completion-checklist">
        <h2>✅ Completion Checklist</h2>
        <ul>
          <li>
            <input type="checkbox" id="ex1" />
            <label htmlFor="ex1">Contact form button shows loading state</label>
          </li>
          <li>
            <input type="checkbox" id="ex2" />
            <label htmlFor="ex2">
              Login form inputs are disabled during submission
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex3" />
            <label htmlFor="ex3">
              Login button shows spinner and loading text
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex4" />
            <label htmlFor="ex4">
              Newsletter form shows progress information
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex5" />
            <label htmlFor="ex5">
              Multi-action form buttons show appropriate loading states
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
