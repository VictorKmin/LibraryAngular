import {User} from "./User";

export interface Comment {
  book_id: number;
  comment: string;
  created_at: Date
  id: number;
  user_id: number
  User: User
}
