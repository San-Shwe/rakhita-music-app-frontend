import Slider from "./app/compontents/Slider";

const data = [
  {
    id: "123",
    author: "Admin",
    title: "sanshwe",
    content: "this is content",
    thumbnail:
      "https://images.unsplash.com/photo-1657299156537-f4bcdced5392?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "1234",
    author: "Admin",
    title: "sanshwe",
    content: "this is content",
    thumbnail:
      "https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: "1235",
    author: "Admin",
    title: "sanshwe",
    content: "this is content",
    thumbnail:
      "https://res.cloudinary.com/dp2ngy0oq/image/upload/v1657281868/cjlvufbchrtoyobpaqam.jpg",
  },
  {
    id: "1236",
    author: "Admin",
    title: "sanshwe",
    content: "this is content",
    thumbnail:
      "https://images.unsplash.com/photo-1657244983736-0497fdc2f3d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
];

export default function App() {
  return <Slider data={data} title="Featured Posts" />;
}
