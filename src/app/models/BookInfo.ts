export interface BookInfo {
  author: string;
  countOfComments: number;
  id: number;
  publisher: string;
  subject?: string;
  summary?: any;
  tags?: any;
  title: string;
  is_digital: boolean;
  type_of_content?: any;
  type_of_file?: any;
  user_id: number;
  image: any;
  is_reading: boolean;
  user?: string,
  backTime? : string
}
