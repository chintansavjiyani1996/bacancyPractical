import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    height: deviceHeight / 2,
    backgroundColor: 'black',
    borderRadius: 10
  },
  iconCloseContainer: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignSelf: "flex-end",
    alignItems: 'center'
  },
  iconClose: {
    height: 16,
    width: 16,
    tintColor: 'white'
  },
  placeholderContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
  },
  iconPlaceholder: {
    color: 'white',
    fontSize: 18
  },
  itemContentContainer: {
    padding: 12,
    flex: 1
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  itemUrl: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  textWhite: { color: 'white' }
})