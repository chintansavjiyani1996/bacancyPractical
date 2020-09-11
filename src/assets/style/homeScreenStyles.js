import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {},
  contentContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10
  },
  filterContainer: {
    justifyContent: "flex-end",
    flexDirection: 'row',
    marginVertical: 8
  },
  filterIcon: {
    height: 20,
    width: 20,
    tintColor: 'grey'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#add8e6',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  itemIconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
  },
  iconPlaceholder: {
    color: "white",
    fontSize: 14
  },
  itemContentContainer: {
    width: '85%',
    marginHorizontal: 6
  },
  itemContent: {
    flexDirection: 'row',
    marginVertical: 3
  },
  itemTitle: { fontWeight: 'bold' },
  itemUrl: {
    color: 'black',
    textDecorationLine: 'underline'
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalWrapper: {
    backgroundColor: 'white',
    height: deviceHeight / 4,
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  modalHeaderContainer: {
    height: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconCloseContainer: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconClose: {
    height: 16,
    width: 16,
    tintColor: 'grey'
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  colorGrey: {
    color: 'grey'
  },
  padding: {
    padding: 10
  }
})