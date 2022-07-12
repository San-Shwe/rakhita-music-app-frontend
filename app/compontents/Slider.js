import react, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

const width = Dimensions.get("window").width - 20;
let intervalId;
let currentSlideIndex = 0;

export default function Slider({ data, title }) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const flatList = useRef();

  // set current index on slider change
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const handleScrollTo = (index) => {
    flatList.current.scrollToIndex({ animated: false, index });
  };

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    if (dataToRender.length && flatList.current) {
      console.log("start slider");
      startSlider();
    }
  }, []);

  useEffect(() => {
    const length = dataToRender.length; // 6 featured posts including 2 clone posts
    // reset slide to first
    if (visibleSlideIndex === length - 1 && length) handleScrollTo(1);
    // reset slide to last
    if (visibleSlideIndex === 0 && length) handleScrollTo(length - 2);

    const firtSlide = currentSlideIndex === 0;
    const lastSlide = currentSlideIndex === length - 1;

    // only four post visible
    // set active slide index to show in slider indicator
    if (lastSlide && length) setActiveSlideIndex(0);
    // active first slider indicator when clone last post is activec
    else if (firtSlide && length) setActiveSlideIndex(1);
    // active last slider indicator when clone first post is activec
    else setActiveSlideIndex(currentSlideIndex - 1); // otherwise set current slide index
  }, [visibleSlideIndex]);

  const renderItems = ({ item }) => {
    return (
      <View>
        <Image source={{ uri: item?.thumbnail }} style={styles.image} />
        <View style={{ width }}>
          <Text
            numberOfLines={2}
            style={[styles.postTitle, { fontWeight: "700", color: "#383838" }]}
          >
            {item?.title}
          </Text>
        </View>
      </View>
    );
  };

  const startSlider = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current.scrollToIndex({
          animated: true,
          index: currentSlideIndex + 1,
        });
      }, 3000);
    } else {
      pauseSlider();
    }
  };

  const pauseSlider = () => {
    clearInterval(intervalId);
    console.log("pause << clear");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderHead}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: "row" }}>
          <SlideIndicator data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        keyExtractor={(item, index) => item?.id + index}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlider}
        renderItem={renderItems}
      />
    </View>
  );
}

const SlideIndicator = ({ data, activeSlideIndex }) =>
  data.map((item, index) => {
    return (
      <View
        key={item.id}
        style={[
          styles.slides,
          {
            backgroundColor:
              activeSlideIndex === index ? "#393838" : "transparent",
          },
        ]}
      />
    );
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
  },
  sliderHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  title: { fontWeight: "700", color: "#383838", fontSize: 22 },
  slides: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: 5,
  },
  image: {
    width,
    height: width / 1.7,
    borderColor: "#fff",
    borderRadius: 7,
    backgroundColor: "gray",
  },
  postTitle: {
    fontWeight: "700",
    color: "#383838",
    fontSize: 16,
  },
});
