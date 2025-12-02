# React 19: useFormState Hook

## What is it?

`useFormState` allows you to update state based on the result of a form action, making it easy to handle server-side validation and form responses.

## Key Features

- **Server Actions Integration**: Works seamlessly with Server Actions
- **State Management**: Automatically updates state with action results
- **Error Handling**: Easy to display validation errors
- **Pending State**: Built-in pending state tracking

## Basic Syntax

```tsx
import { useFormState } from 'react-dom';

const [state, formAction] = useFormState(serverAction, initialState);
```

## Parameters

- **serverAction**: Async function that receives previous state and form data
- **initialState**: Initial state value

## Return Values

```tsx
[
  state,        // Current state (updated by action)
  formAction    // Enhanced action to use in form
]
```

## Use Cases

1. **Form Validation**: Show server-side validation errors
2. **Success Messages**: Display submission results
3. **Multi-Step Forms**: Track form progress
4. **Error Recovery**: Handle and display errors gracefully

## Example

```tsx
async function submitForm(prevState: any, formData: FormData) {
  const email = formData.get('email');
  
  if (!email.includes('@')) {
    return { error: 'Invalid email' };
  }
  
  return { success: 'Form submitted!' };
}

function MyForm() {
  const [state, formAction] = useFormState(submitForm, null);
  
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>{state.success}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Best Practices

1. Return consistent state structure from actions
2. Handle both success and error cases
3. Provide clear error messages
4. Reset state when needed
5. Use with useFormStatus for pending states