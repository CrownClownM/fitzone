export interface userAuth {
  isAuthenticated: string;
  user:            User;
}

export interface User {
  id:       string;
  name:     string;
  email:    string;
  password?: string;
}
