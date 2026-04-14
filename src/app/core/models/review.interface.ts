
export interface Review {
  _id:       string;
  review:    string;
  rating:    number;
  product:   string;
  user:      User;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id:  string;
  name: string;
}
