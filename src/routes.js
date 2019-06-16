import { createAppContainer, createStackNavigator } from "react-navigation";

import React from "react";
import Feed from "./pages/Feed";
import New from "./pages/New";

import { Image } from "react-native";
import logo from "./assets/logo.png";

export default createAppContainer(
	createStackNavigator(
		{
			Feed,
			New,
		},
		{
			defaultNavigationOptions: {
				headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
				headerBackTitle: null,
				headerTintColor: "#000",
			},
			mode: "modal",
		}
	)
);
