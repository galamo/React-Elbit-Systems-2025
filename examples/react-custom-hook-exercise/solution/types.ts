/**
 * Type definitions for the exercise
 */

// Example User type from JSONPlaceholder API
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Example Post type from JSONPlaceholder API
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
