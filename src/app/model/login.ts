export interface Login {
  id: number;
  email: string;
  role : RoleUser;
}

export interface RoleUser {
  id: number;
  name: string;
  description: string;
}
