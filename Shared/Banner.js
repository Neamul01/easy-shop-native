import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData(defaultBannerData);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.swiper}>
        <Swiper style={{ flex: 1 }} autoplay autoplayTimeout={2}>
          {bannerData.map((data, index) => (
            <View key={index} style={styles.slide}>
              <Image
                style={styles.bannerImage}
                resizeMode="contain"
                source={{ uri: data.img }}
              />
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "gainsboro",
    width: width - 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  swiper: {
    height: 200,
    width: "100%",
    marginTop: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    marginHorizontal: "auto",
  },
});

const defaultBannerData = [
  {
    id: 1,
    img: "https://cdn.dribbble.com/users/5739021/screenshots/16617500/media/d461aa0e0febbfc13cd77bb52b2646f5.jpg?resize=400x0",
  },
  {
    id: 2,
    img: "https://i.ytimg.com/vi/MkBgqyAp6lY/maxresdefault.jpg",
  },
  {
    id: 3,
    img: "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2148.jpg",
  },
];
