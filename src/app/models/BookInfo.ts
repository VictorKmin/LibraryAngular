export interface BookInfo {
  author: string;
  countOfComments: number;
  id: number;
  publisher: string;
  subject?: string;
  summary?: any;
  tags?: string;
  title: string;
  is_digital: boolean;
  is_delaying: boolean;
  type_of_content?: any;
  type_of_file?: any;
  user_id: number;
  image: any;
  is_reading: boolean;
  userName?: string,
  userIdWhoRead?: number,
  backTime? : string
}
