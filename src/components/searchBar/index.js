import React from 'react';
import { View, TextInput, Image } from 'react-native';

// custom imports
import searchbarStyles from "../../assets/style/searchbarStyles";
import { Icons } from '../../common/Icons';

class SearchBar extends React.Component {
  render() {
    const { onChangeSearchTerm, searchKeyword, customStyle } = this.props;
    return (
      <View style={[searchbarStyles.container, customStyle]}>
        <View style={searchbarStyles.searchIconContainer}>
          <Image source={Icons.SEARCH} style={searchbarStyles.iconSearch} />
        </View>
        <View style={searchbarStyles.inputContainer}>
          <TextInput
            onChangeText={onChangeSearchTerm}
            style={searchbarStyles.inputContainer}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholderTextColor={'grey'}
            placeholder="search"
            value={searchKeyword} />
        </View>
      </View>
    );
  }
}

export default SearchBar;