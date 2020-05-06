import React, { StyleSheet, Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

export const ThemeColor = "#FFC0CB";

export const screenWidth = Dimensions.get("window").width;

export const screenHeight = Dimensions.get("window").height;

export const statusBarHeight = StatusBar.currentHeight;

export const contentHeight = screenHeight - statusBarHeight - 100;

export const contentHeightWithoutNav = screenHeight - statusBarHeight - 50;

export const LigthGray = "#e0e0e0";

export const deleteRed = "#FF4D4F";

export const dislikeRed = "#FF6D00";

export const likeGreen = "#00C853";

export const actionGreen = "#1890FF";

export const actionBlue = "#267aff";

export const orange = "#FF8762";