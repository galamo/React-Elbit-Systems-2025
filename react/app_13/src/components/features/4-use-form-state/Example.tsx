import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";
import "./styles.css";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Types for form state
type FormState = {
  error?: string;
  success?: string;
  errors?: Record<string, string>;
} | null;

// Submit button component
function SubmitButton({ text = "Submit" }: { text?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="submit-button">
      {pending ? "Submitting..." : text}
    </button>
  );
}

// Example 1: Basic Form with Validation
async function validateEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await delay(1000);

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  if (!name || name.length < 2) {
    return { error: "Name must be at least 2 characters" };
  }

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address" };
  }

  return { success: `Welcome, ${name}! Confirmation sent to ${email}` };
}

function BasicValidationForm() {
  const [state, formAction] = useFormState(validateEmail, null);

  return (
    <div className="example-section">
      <h3>✅ Basic Form Validation</h3>
      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
          />
        </div>
        <SubmitButton />

        {state?.error && <div className="error-message">{state.error}</div>}
        {state?.success && (
          <div className="success-message">{state.success}</div>
        )}
      </form>
      <p className="hint">
        💡 Try submitting with invalid data to see validation errors
      </p>
    </div>
  );
}

// Example 2: Multi-Field Validation
async function validateSignup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await delay(1500);

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  const errors: Record<string, string> = {};

  if (!username || username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (password !== confirm) {
    errors.confirm = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { success: `Account created for ${username}!` };
}

function MultiFieldValidation() {
  const [state, formAction] = useFormState(validateSignup, null);

  return (
    <div className="example-section">
      <h3>📝 Multi-Field Validation</h3>
      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="signup-username">Username:</label>
          <input
            type="text"
            id="signup-username"
            name="username"
            placeholder="Choose a username"
          />
          {state?.errors?.username && (
            <span className="field-error">{state.errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            name="email"
            placeholder="your@email.com"
          />
          {state?.errors?.email && (
            <span className="field-error">{state.errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Create a password"
          />
          {state?.errors?.password && (
            <span className="field-error">{state.errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signup-confirm">Confirm Password:</label>
          <input
            type="password"
            id="signup-confirm"
            name="confirm"
            placeholder="Confirm your password"
          />
          {state?.errors?.confirm && (
            <span className="field-error">{state.errors.confirm}</span>
          )}
        </div>

        <SubmitButton text="Create Account" />

        {state?.success && (
          <div className="success-message">{state.success}</div>
        )}
      </form>
      <p className="hint">💡 Each field shows its own validation error</p>
    </div>
  );
}

// Example 3: Form with Server Response
type ServerResponse = {
  status: "idle" | "success" | "error";
  message?: string;
  data?: any;
} | null;

async function submitToServer(
  prevState: ServerResponse,
  formData: FormData
): Promise<ServerResponse> {
  await delay(2000);

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Simulate server validation
  if (title.toLowerCase().includes("spam")) {
    return {
      status: "error",
      message: "Your post was flagged as spam. Please revise.",
    };
  }

  if (content.length < 10) {
    return {
      status: "error",
      message: "Content must be at least 10 characters",
    };
  }

  return {
    status: "success",
    message: "Post published successfully!",
    data: { id: Date.now(), title, content },
  };
}

function ServerResponseForm() {
  const [state, formAction] = useFormState(submitToServer, null);

  return (
    <div className="example-section">
      <h3>🌐 Server Response Handling</h3>
      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="post-title">Post Title:</label>
          <input
            type="text"
            id="post-title"
            name="title"
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Content:</label>
          <textarea
            id="post-content"
            name="content"
            rows={4}
            placeholder="Write your post..."
          />
        </div>

        <SubmitButton text="Publish Post" />

        {state?.status === "error" && (
          <div className="error-message">
            <strong>Error:</strong> {state.message}
          </div>
        )}

        {state?.status === "success" && (
          <div className="success-message">
            <strong>Success!</strong> {state.message}
            {state.data && (
              <div className="post-preview">
                <h4>{state.data.title}</h4>
                <p>{state.data.content}</p>
                <small>Post ID: {state.data.id}</small>
              </div>
            )}
          </div>
        )}
      </form>
      <p className="hint">
        💡 Try using "spam" in the title to see error handling
      </p>
    </div>
  );
}

// Example 4: Progressive Enhancement
type StepState = {
  step: number;
  data: Record<string, any>;
  error?: string;
} | null;

async function handleMultiStep(
  prevState: StepState,
  formData: FormData
): Promise<StepState> {
  await delay(1000);

  const currentStep = prevState?.step || 1;
  const data = { ...prevState?.data };

  if (currentStep === 1) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) {
      return { step: 1, data, error: "Please fill all fields" };
    }

    return { step: 2, data: { ...data, name, email } };
  }

  if (currentStep === 2) {
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;

    if (!address || !city) {
      return { step: 2, data, error: "Please fill all fields" };
    }

    return { step: 3, data: { ...data, address, city } };
  }

  return prevState;
}

function MultiStepForm() {
  const [state, formAction] = useFormState(handleMultiStep, {
    step: 1,
    data: {},
  });

  return (
    <div className="example-section">
      <h3>📋 Multi-Step Form</h3>
      <div className="step-indicator">
        <div className={`step ${state?.step >= 1 ? "active" : ""}`}>
          1. Personal
        </div>
        <div className={`step ${state?.step >= 2 ? "active" : ""}`}>
          2. Address
        </div>
        <div className={`step ${state?.step >= 3 ? "active" : ""}`}>
          3. Complete
        </div>
      </div>

      <form action={formAction} className="demo-form">
        {state?.step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="multi-name">Full Name:</label>
              <input
                type="text"
                id="multi-name"
                name="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="multi-email">Email:</label>
              <input
                type="email"
                id="multi-email"
                name="email"
                placeholder="your@email.com"
              />
            </div>
          </>
        )}

        {state?.step === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="multi-address">Address:</label>
              <input
                type="text"
                id="multi-address"
                name="address"
                placeholder="Street address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="multi-city">City:</label>
              <input
                type="text"
                id="multi-city"
                name="city"
                placeholder="City"
              />
            </div>
          </>
        )}

        {state?.step === 3 && (
          <div className="completion-message">
            <h4>✅ Registration Complete!</h4>
            <p>
              <strong>Name:</strong> {state.data.name}
            </p>
            <p>
              <strong>Email:</strong> {state.data.email}
            </p>
            <p>
              <strong>Address:</strong> {state.data.address}, {state.data.city}
            </p>
          </div>
        )}

        {state?.error && <div className="error-message">{state.error}</div>}

        {state?.step < 3 && <SubmitButton text="Next Step" />}
      </form>
      <p className="hint">💡 Form state persists across steps</p>
    </div>
  );
}

export default function UseFormStateExample() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useFormState Hook</h1>
        <p className="feature-description">
          Manage form state with server actions and validation
        </p>
        <div className="navigation-links">
          <Link to="/" className="nav-link">
            ← Home
          </Link>
          <Link to="/use-form-state/exercise" className="nav-link">
            Try Exercise →
          </Link>
        </div>
      </div>

      <div className="examples-container">
        <BasicValidationForm />
        <MultiFieldValidation />
        <ServerResponseForm />
        <MultiStepForm />
      </div>

      <div className="code-section">
        <h2>📖 How It Works</h2>
        <pre className="code-block">
          {`import { useFormState } from 'react-dom';

// Define your action
async function submitForm(prevState, formData) {
  const email = formData.get('email');
  
  if (!email.includes('@')) {
    return { error: 'Invalid email' };
  }
  
  return { success: 'Form submitted!' };
}

function MyForm() {
  // Initialize with action and initial state
  const [state, formAction] = useFormState(submitForm, null);
  
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>{state.success}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`}
        </pre>

        <h2>✨ Key Benefits</h2>
        <ul className="benefits-list">
          <li>
            <strong>Server Integration:</strong> Works seamlessly with Server
            Actions
          </li>
          <li>
            <strong>State Management:</strong> Automatic state updates from
            actions
          </li>
          <li>
            <strong>Validation:</strong> Easy server-side validation handling
          </li>
          <li>
            <strong>Progressive Enhancement:</strong> Works without JavaScript
          </li>
        </ul>

        <h2>🎯 Best Practices</h2>
        <div className="best-practices">
          <div className="practice-card">
            <h3>✅ Do</h3>
            <ul>
              <li>Return consistent state structure</li>
              <li>Handle both success and error cases</li>
              <li>Provide clear error messages</li>
              <li>Use with useFormStatus for pending states</li>
            </ul>
          </div>
          <div className="practice-card">
            <h3>❌ Don't</h3>
            <ul>
              <li>Forget to handle errors</li>
              <li>Return inconsistent state shapes</li>
              <li>Ignore previous state parameter</li>
              <li>Mix with traditional onSubmit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
