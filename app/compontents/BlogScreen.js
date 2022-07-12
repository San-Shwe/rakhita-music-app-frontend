import { useState, useEffect } from "react";
import { Text, FlatList, View } from "react-native";
import { Divider } from "react-native-paper";
import Slider from "./Slider";
import PostListItem from "./PostListItem";
import { getFeaturedPosts, getLatestPosts, getSinglePost } from "../api/post";

import Constants from "expo-constants"; // to get system information

let pageNo = 0;
const limit = 5;

export default function BlogScreen({ navigation }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reachToEnd, setReachToEnd] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchFeaturedPosts = async () => {
    const { error, post } = await getFeaturedPosts();
    if (error) return console.log("error is ", error);
    // console.log("featured post is ", post);
    setFeaturedPosts(post);
  };

  const fetchLatestPosts = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);

    if (error) console.log("error is ", error);

    setLatestPosts(posts);
  };

  const fetchMorePosts = async () => {
    console.log("running");
    if (reachToEnd || busy) return;
    pageNo += 1;
    setBusy(true);
    const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
    setBusy(false);
    if (error) console.log("error is ", error);
    if (latestPosts.length === postCount) return setReachToEnd(true);
    setLatestPosts([...latestPosts, ...posts]);
  };

  const fetchSinglePost = async (slug) => {
    const { error, post } = await getSinglePost(slug);
    if (error) return console.log(error);
    console.log(post);
    navigation.navigate("PostDetails", { post });
  };

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  const ListHeaderComponent = () => {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight }}>
        {featuredPosts.length ? (
          <Slider data={featuredPosts} title="Featured Posts" />
        ) : null}
        <Divider />
        <View style={{ marginTop: 15, marginBottom: 3 }}>
          <Text style={{ color: "#383838", fontSize: 20, fontWeight: "700" }}>
            Latest Post
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <PostListItem
          post={item}
          navigateTo={() => {
            fetchSinglePost(item.slug);
          }}
        />
      </View>
    );
  };

  const ItemSeparatorComponent = () => (
    <View style={{ paddingVertical: 10 }}>
      <Divider />
    </View>
  );

  return (
    <View>
      <FlatList
        data={latestPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginHorizontal: 10, paddingBottom: 20 }}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        onEndReached={async () => {
          await fetchMorePosts();
        }}
        // onEndReachedThreshold={0}
        ListFooterComponent={() => {
          return reachToEnd ? (
            <Text
              style={{ color: "red", textAlign: "center", paddingVertical: 20 }}
            >
              Reach To End
            </Text>
          ) : null;
        }}
      />
    </View>
  );
}
