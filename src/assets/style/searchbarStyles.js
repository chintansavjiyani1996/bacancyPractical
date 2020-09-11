import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    height: 40
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  },
  inputContainer: {
    flex: 1,
    color: 'black',
  },
  iconSearch: {
    height: 20,
    width: 20,
  },
});