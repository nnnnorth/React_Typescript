
import axios from "axios";

export interface Ipost {
  id: number,
  title: string,
  body : string
}

const posts = [
  {
    id: 1,
    title: "리덕스 떵크 미들웨어",
    body: "리덕스 떵크 미들웨어 본문 본문 내용"
  },
  {
    id: 2,
    title: "리덕스 떵크 미들웨어222",
    body: "리덕스 떵크 미들웨어 본문 본문 내용222"
  },
  {
    id: 3,
    title: "리덕스 떵크 미들웨어333",
    body: "리덕스 떵크 미들웨어 본문 본문 내용333"
  }
]



export const getTodos = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return response;
};

