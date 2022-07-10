import { useState, useEffect } from "react";
import { Text, FlatList, View } from "react-native";
import Slider from "./app/compontents/Slider";
import { Divider } from "react-native-paper";
import PostListItem from "./app/compontents/PostListItem";
import { getFeaturedPosts, getLatestPosts } from "./app/api/post";
const data = [
  {
    id: "123",
    author: "Admin",
    title: "San Shwe",
    content: "this is content",
    createdAd: Date.now(),
    thumbnail:
      "https://images.unsplash.com/photo-1657299156537-f4bcdced5392?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "1234",
    author: "Admin",
    title: "Win Shwe",
    content: "this is content",
    createdAd: Date.now(),
    thumbnail:
      "https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: "1235",
    author: "Admin",
    title: "San Win Tun",
    content: "this is content",
    createdAd: Date.now(),
    thumbnail:
      "https://res.cloudinary.com/dp2ngy0oq/image/upload/v1657281868/cjlvufbchrtoyobpaqam.jpg",
  },
  {
    id: "1236",
    author: "Admin",
    title: "Ag Myo Tun",
    content: "this is content",
    createdAd: Date.now(),
    thumbnail:
      "https://images.unsplash.com/photo-1657244983736-0497fdc2f3d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
];
{
}

let pageNo = 1;
const limit = 5;

export default function App() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  const fetchFeaturedPosts = async () => {
    const { error, post } = await getFeaturedPosts();
    if (error) return console.log("error is ", error);
    console.log("featured post is ", post);
    setFeaturedPosts(post);
  };

  const fetchLatestPosts = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);
    if (error) console.log("error is ", error);
    setLatestPosts(posts);
  };

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  const ListHeaderComponent = () => {
    return (
      <View>
        {featuredPosts.length ? (
          <Slider data={featuredPosts} title="Featured Posts" />
        ) : null}
        <Divider />
        <View style={{ marginTop: 15, marginBottom: 3 }}>
          <Text style={{ color: "#383838", fontSize: 18 }}>Latest Post</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={latestPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginHorizontal: 10 }}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => {
          return (
            <View>
              <PostListItem post={item} />
            </View>
          );
        }}
      />
    </View>
  );
}
