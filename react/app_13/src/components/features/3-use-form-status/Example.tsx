import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";
import "./styles.css";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Example 1: Basic Submit Button with Status
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="submit-button">
      {pending ? (
        <>
          <span className="spinner"></span>
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
}

function BasicFormExample() {
  const [result, setResult] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    await delay(2000);
    const name = formData.get("name");
    const email = formData.get("email");
    setResult(`Form submitted! Name: ${name}, Email: ${email}`);
  }

  return (
    <div className="example-section">
      <h3>📝 Basic Form with Status</h3>
      <form action={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <SubmitButton />
      </form>
      {result && <div className="success-message">{result}</div>}
      <p className="hint">
        💡 Notice how the button shows "Submitting..." and is disabled during
        submission
      </p>
    </div>
  );
}

// Example 2: Form with Multiple Actions
function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="action"
      value="save"
      disabled={pending}
      className="save-button"
    >
      {pending ? "Saving..." : "Save Draft"}
    </button>
  );
}

function PublishButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="action"
      value="publish"
      disabled={pending}
      className="publish-button"
    >
      {pending ? "Publishing..." : "Publish"}
    </button>
  );
}

function MultiActionForm() {
  const [result, setResult] = useState<string>("");

  async function handleAction(formData: FormData) {
    await delay(1500);
    const action = formData.get("action");
    const title = formData.get("title");
    setResult(`${action === "publish" ? "Published" : "Saved"}: ${title}`);
  }

  return (
    <div className="example-section">
      <h3>📄 Form with Multiple Actions</h3>
      <form action={handleAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="title">Article Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter article title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            rows={4}
            placeholder="Write your article..."
          />
        </div>
        <div className="button-group">
          <SaveButton />
          <PublishButton />
        </div>
      </form>
      {result && <div className="success-message">{result}</div>}
      <p className="hint">
        💡 Each button shows its own loading state independently
      </p>
    </div>
  );
}

// Example 3: Form with Progress Indicator
function ProgressSubmitButton() {
  const { pending, data } = useFormStatus();

  return (
    <div className="progress-container">
      <button type="submit" disabled={pending} className="submit-button">
        {pending ? "Processing..." : "Submit Form"}
      </button>
      {pending && data && (
        <div className="progress-info">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-text">
            Submitting {data.get("name") as string}'s information...
          </p>
        </div>
      )}
    </div>
  );
}

function ProgressForm() {
  const [result, setResult] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    await delay(3000);
    const name = formData.get("name");
    setResult(`Successfully registered ${name}!`);
  }

  return (
    <div className="example-section">
      <h3>📊 Form with Progress Indicator</h3>
      <form action={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="reg-name">Full Name:</label>
          <input
            type="text"
            id="reg-name"
            name="name"
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="Enter your phone"
          />
        </div>
        <ProgressSubmitButton />
      </form>
      {result && <div className="success-message">{result}</div>}
      <p className="hint">
        💡 Shows a progress bar and submission details while processing
      </p>
    </div>
  );
}

// Example 4: Form with Disabled Inputs During Submission
function FormInputs() {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          disabled={pending}
          placeholder="Choose a username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          disabled={pending}
          placeholder="Create a password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            disabled={pending}
          />
          I agree to the terms and conditions
        </label>
      </div>
    </>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="submit-button">
      {pending ? (
        <>
          <span className="spinner"></span>
          Creating Account...
        </>
      ) : (
        "Sign Up"
      )}
    </button>
  );
}

function DisabledInputsForm() {
  const [result, setResult] = useState<string>("");

  async function handleSignup(formData: FormData) {
    await delay(2500);
    const username = formData.get("username");
    setResult(`Account created for ${username}!`);
  }

  return (
    <div className="example-section">
      <h3>🔒 Form with Disabled Inputs</h3>
      <form action={handleSignup} className="demo-form">
        <FormInputs />
        <SignupButton />
      </form>
      {result && <div className="success-message">{result}</div>}
      <p className="hint">
        💡 All inputs are disabled during submission to prevent changes
      </p>
    </div>
  );
}

export default function UseFormStatusExample() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useFormStatus Hook</h1>
        <p className="feature-description">
          Track form submission status and provide better user feedback
        </p>
        <div className="navigation-links">
          <Link to="/" className="nav-link">
            ← Home
          </Link>
          <Link to="/use-form-status/exercise" className="nav-link">
            Try Exercise →
          </Link>
        </div>
      </div>

      <div className="examples-container">
        <BasicFormExample />
        <MultiActionForm />
        <ProgressForm />
        <DisabledInputsForm />
      </div>

      <div className="code-section">
        <h2>📖 How It Works</h2>
        <pre className="code-block">
          {`import { useFormStatus } from 'react-dom';

// Must be in a separate component!
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function MyForm() {
  async function handleSubmit(formData: FormData) {
    // Process form data
    await api.submit(formData);
  }

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" />
      <SubmitButton />  {/* Must be child of form */}
    </form>
  );
}`}
        </pre>

        <h2>✨ Key Benefits</h2>
        <ul className="benefits-list">
          <li>
            <strong>Better UX:</strong> Show loading states during submission
          </li>
          <li>
            <strong>Prevent Double Submit:</strong> Disable buttons
            automatically
          </li>
          <li>
            <strong>Access Form Data:</strong> Show what's being submitted
          </li>
          <li>
            <strong>Simple API:</strong> No manual state management needed
          </li>
        </ul>

        <h2>🎯 Best Practices</h2>
        <div className="best-practices">
          <div className="practice-card">
            <h3>✅ Do</h3>
            <ul>
              <li>Use in child component of form</li>
              <li>Disable inputs during submission</li>
              <li>Show clear loading indicators</li>
              <li>Use with form actions, not onSubmit</li>
            </ul>
          </div>
          <div className="practice-card">
            <h3>❌ Don't</h3>
            <ul>
              <li>Use in the same component as form</li>
              <li>Forget to disable submit button</li>
              <li>Use with onSubmit handler</li>
              <li>Ignore the pending state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
