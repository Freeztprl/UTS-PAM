import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const API = 'https://uts-pam.herokuapp.com';
export const SIZES = {
    // app dimensions
    width,
    height
};

export default SIZES;
export const ColorPrimary = '#B8E0d2';
export const ColorDanger = '#FF0000';