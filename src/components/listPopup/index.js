import React from "react";
import Modal from 'react-native-modal';
import moment from "moment";
import { TouchableOpacity, View, Text, Image, Linking } from "react-native";
import popUpStyle from "../../assets/style/popUpStyle";
import { Icons } from "../../common/Icons";
import { capitalize } from "../../common/utility";

class ListPopup extends React.Component {
  render() {
    const { selectedItem, onClose } = this.props;
    return (
      <Modal
        isVisible={true}
        backdropColor='transparent'
        backdropOpacity={0.8}>
        <View style={popUpStyle.container}>
          <TouchableOpacity onPress={onClose} style={popUpStyle.iconCloseContainer}>
            <Image source={Icons.CLOSE} style={popUpStyle.iconClose} />
          </TouchableOpacity>
          <View style={popUpStyle.itemContentContainer}>
            <View style={{ marginTop: 10 }}>
              <Text style={popUpStyle.textWhite} >{selectedItem.title}</Text>
            </View>
            {selectedItem.url &&
              <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.6}
                onPress={() => { Linking.openURL(selectedItem.url); }}>
                <Text style={popUpStyle.itemUrl}>{selectedItem.url}</Text>
              </TouchableOpacity>}
            <View style={popUpStyle.itemContent}>
              <View style={{ flexDirection: 'row' }} >
                <Text style={[popUpStyle.textWhite, { fontWeight: 'bold' }]}>Author: </Text>
                <Text style={popUpStyle.textWhite}>{capitalize(selectedItem.author)}</Text>
              </View>
              <Text style={popUpStyle.textWhite}>{moment(selectedItem.created_at).format("Do MMM YY")}</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ListPopup;