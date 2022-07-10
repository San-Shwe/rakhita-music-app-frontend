import { View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import dateFormat from "dateformat";

const IMAGE_WIDTH = 100;
const PostListItem = ({ post }) => {
  const { thumbnail, title, createdAt, author } = post;

  const getThumbanil = (uri) => {
    if (uri) return { uri };
    return require("../../assets/default-thumbnail.jpg");
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
      <Image
        source={getThumbanil(thumbnail)}
        style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH / 1.7 }}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#383838" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#d3d3d3" }}>
          {dateFormat(createdAt, "mediumDate")} - {author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostListItem;
