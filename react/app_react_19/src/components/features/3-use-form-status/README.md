# React 19: useFormStatus Hook

## What is it?

`useFormStatus` provides information about the status of a form submission, including whether it's pending and what data is being submitted.

## Key Features

- **Pending State**: Know when form is submitting
- **Form Data Access**: Access submitted form data
- **Action Tracking**: Track which action is running
- **Method Info**: Get the HTTP method being used

## Basic Syntax

```tsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

## Important Notes

- **Must be used in a child component** of a `<form>` with an action
- Only works with form actions (not onSubmit)
- Returns status of the parent form

## Return Values

```tsx
{
  pending: boolean,    // Is form submitting?
  data: FormData,      // Form data being submitted
  method: string,      // HTTP method (get/post)
  action: string | Function  // Form action
}
```

## Use Cases

1. **Submit Buttons**: Show loading state
2. **Form Validation**: Disable inputs during submission
3. **Progress Indicators**: Show submission progress
4. **Error Handling**: Display submission errors

## Example

```tsx
function ContactForm() {
  async function submitForm(formData: FormData) {
    await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
  }

  return (
    <form action={submitForm}>
      <input name="email" type="email" />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Sending...' : 'Send'}
    </button>
  );
}
```

## Best Practices

1. Use in separate component from form
2. Disable inputs during submission
3. Show clear loading states
4. Handle errors gracefully
5. Provide user feedback