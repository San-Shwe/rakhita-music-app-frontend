import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetails from "../compontents/PostDetails";
import BlogScreen from "../compontents/BlogScreen";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={BlogScreen}
        name="BlogScreen"
      />
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: (props) => {
            <TouchableWithoutFeedback {...props}>
              <view
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <AntDesign name="back" size={24} color="white" />
              </view>
            </TouchableWithoutFeedback>;
          },
        }}
        component={PostDetails}
        name="PostDetails"
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
