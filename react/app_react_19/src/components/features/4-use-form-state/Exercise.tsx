import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";
import "./styles.css";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Submit button component
function SubmitButton({ text = "Submit" }: { text?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="submit-button">
      {pending ? "Submitting..." : text}
    </button>
  );
}

// Exercise 1: Login Form with Validation
type LoginState = {
  error?: string;
  success?: string;
} | null;

async function handleLogin(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  await delay(1500);

  // TODO: Get email and password from formData
  // Hint: const email = formData.get('email') as string;

  // TODO: Validate email (must include '@')
  // TODO: Validate password (must be at least 6 characters)
  // TODO: Return error object if validation fails
  // TODO: Return success object if validation passes

  return { success: "Login successful!" }; // Replace this
}

function LoginExercise() {
  // TODO: Use useFormState with handleLogin action and null initial state
  // Hint: const [state, formAction] = useFormState(handleLogin, null);
  const state = null;
  const formAction = handleLogin;

  return (
    <div className="exercise-section">
      <h3>🔐 Exercise 1: Login Form</h3>
      <p className="exercise-description">
        Implement form validation using useFormState
      </p>

      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Enter password"
          />
        </div>

        <SubmitButton text="Log In" />

        {/* TODO: Show error message if state?.error exists */}
        {/* TODO: Show success message if state?.success exists */}
      </form>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Import useFormState from 'react-dom'</li>
          <li>Action receives prevState and formData parameters</li>
          <li>Use formData.get('fieldName') to get values</li>
          <li>Return objects with error or success properties</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 2: Registration Form with Field Errors
type RegisterState = {
  errors?: Record<string, string>;
  success?: string;
} | null;

async function handleRegister(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  await delay(2000);

  // TODO: Get all form fields
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO: Create an errors object
  const errors: Record<string, string> = {};

  // TODO: Validate username (min 3 characters)
  // TODO: Validate email (must include '@')
  // TODO: Validate password (min 8 characters)

  // TODO: If errors exist, return { errors }
  // TODO: Otherwise, return success message

  return { success: "Account created!" }; // Replace this
}

function RegisterExercise() {
  // TODO: Use useFormState with handleRegister
  const state = null;
  const formAction = handleRegister;

  return (
    <div className="exercise-section">
      <h3>📝 Exercise 2: Registration Form</h3>
      <p className="exercise-description">
        Show individual field errors using useFormState
      </p>

      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="reg-username">Username:</label>
          <input
            type="text"
            id="reg-username"
            name="username"
            placeholder="Choose a username"
          />
          {/* TODO: Show username error if it exists */}
        </div>

        <div className="form-group">
          <label htmlFor="reg-email">Email:</label>
          <input
            type="email"
            id="reg-email"
            name="email"
            placeholder="your@email.com"
          />
          {/* TODO: Show email error if it exists */}
        </div>

        <div className="form-group">
          <label htmlFor="reg-password">Password:</label>
          <input
            type="password"
            id="reg-password"
            name="password"
            placeholder="Create a password"
          />
          {/* TODO: Show password error if it exists */}
        </div>

        <SubmitButton text="Create Account" />

        {/* TODO: Show success message */}
      </form>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          {/* <li>Create an errors object: const errors: Record<string, string> = {}</li> */}
          <li>Add errors: if (condition) errors.fieldName = 'Error message'</li>
          {/* <li>Check if errors exist: if (Object.keys(errors).length > 0)</li> */}
          {/* <li>Display field errors: {state?.errors?.fieldName && ...}</li> */}
        </ul>
      </div>
    </div>
  );
}

// Exercise 3: Contact Form with Server Response
type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
} | null;

async function handleContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  await delay(1500);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // TODO: Validate all fields are filled
  // TODO: Validate message is at least 10 characters
  // TODO: Return error status if validation fails
  // TODO: Return success status with confirmation message

  return {
    status: "success",
    message: `Thank you, ${name}! We'll respond to ${email} soon.`,
  };
}

function ContactExercise() {
  // TODO: Use useFormState with handleContact
  const [state, formAction] = useFormState(handleContact, null);

  return (
    <div className="exercise-section">
      <h3>📧 Exercise 3: Contact Form</h3>
      <p className="exercise-description">
        Handle different response statuses from server
      </p>

      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="contact-name">Name:</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Email:</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Message:</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Your message..."
          />
        </div>

        <SubmitButton text="Send Message" />

        {/* TODO: Show error message if status is 'error' */}
        {/* TODO: Show success message if status is 'success' */}
      </form>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Check status: if (state?.status === 'error')</li>
          {/* <li>Return status object: return { status: 'error', message: '...' }</li> */}
          {/* <li>Validate message length: message.length < 10</li> */}
          <li>Include user data in success message</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 4: Newsletter Subscription with Previous State
type NewsletterState = {
  subscribed: boolean;
  email?: string;
  error?: string;
  count: number;
} | null;

async function handleSubscribe(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  await delay(1000);

  const email = formData.get("email") as string;

  // TODO: Use prevState to track subscription count
  // Hint: const count = (prevState?.count || 0) + 1;

  // TODO: Validate email
  // TODO: Return error if invalid
  // TODO: Return success with updated count

  return {
    subscribed: true,
    email,
    count: 1,
  };
}

function NewsletterExercise() {
  // TODO: Use useFormState with initial state { subscribed: false, count: 0 }
  const [state, formAction] = useFormState(handleSubscribe, {
    subscribed: false,
    count: 0,
  });

  return (
    <div className="exercise-section">
      <h3>📬 Exercise 4: Newsletter Subscription</h3>
      <p className="exercise-description">
        Use previous state to track subscription attempts
      </p>

      <form action={formAction} className="demo-form">
        <div className="form-group">
          <label htmlFor="newsletter-email">Email Address:</label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            placeholder="your@email.com"
          />
        </div>

        <SubmitButton text="Subscribe" />

        {/* TODO: Show subscription count */}
        {/* TODO: Show subscribed email if successful */}
        {/* TODO: Show error if exists */}
      </form>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Access previous state: prevState?.count</li>
          <li>Increment count: (prevState?.count || 0) + 1</li>
          <li>Initialize with state object, not null</li>
          <li>Show attempt count: "Attempt #{state?.count}"</li>
        </ul>
      </div>
    </div>
  );
}

export default function UseFormStateExercise() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useFormState Hook - Exercises</h1>
        <p className="feature-description">
          Practice managing form state with server actions
        </p>
        <div className="navigation-links">
          <Link to="/use-form-state" className="nav-link">
            ← Back to Examples
          </Link>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>

      <div className="exercises-container">
        <LoginExercise />
        <RegisterExercise />
        <ContactExercise />
        <NewsletterExercise />
      </div>

      <div className="completion-checklist">
        <h2>✅ Completion Checklist</h2>
        <ul>
          <li>
            <input type="checkbox" id="ex1" />
            <label htmlFor="ex1">Login form validates email and password</label>
          </li>
          <li>
            <input type="checkbox" id="ex2" />
            <label htmlFor="ex2">
              Registration form shows individual field errors
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex3" />
            <label htmlFor="ex3">
              Contact form handles success and error states
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex4" />
            <label htmlFor="ex4">
              Newsletter form tracks subscription attempts
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex5" />
            <label htmlFor="ex5">All forms show appropriate messages</label>
          </li>
        </ul>
      </div>
    </div>
  );
}
