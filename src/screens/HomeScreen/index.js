import React from "react";
import { View, FlatList, TouchableOpacity, Text, Image, SafeAreaView, Dimensions, Linking, ActivityIndicator } from "react-native";
import { fetchStories, loadingAction } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { isEmpty, filter, orderBy } from "lodash";
import homeScreenStyles from "../../assets/style/homeScreenStyles";
import SearchBar from "../../components/searchBar";
import { Icons } from "../../common/Icons";
import Modal from 'react-native-modal';
import ListPopup from "../../components/listPopup";

const deviceWidth = Dimensions.get('window').width;


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            selectedItem: {},
            stories: [],
            searchKeyword: '',
            isRefresh: false,
            isFilterPopup: false,
            openListViewPopup: false,
            lastUpdatedStories: [],
            sortby: '',
        }
    }

    componentDidMount() {
        this.getStories();
        setInterval(() => {
            const { searchKeyword } = this.state;
            if (searchKeyword.trim() === '')
                this.getStories();
        }, 3000);
    }

    handleDialogClose = () => {
        this.setState({ openListViewPopup: false })
    }

    handleFilterOpen = () => {
        this.setState({ isFilterPopup: true })
    }

    handleFilterClose = () => {
        this.setState({ isFilterPopup: false })
    }

    getStories = async () => {
        const { stories, pageNumber, isRefresh } = this.state;
        pageNumber === 1 && isRefresh === false && this.props.loadingAction(true);
        await this.props.fetchStories(tags = 'story', 1);
        if (!isEmpty(this.props.stories.hits)) {
            if (stories.length >= this.props.stories.nbHits)
                this.setState({ isEndApiCall: true });
            else
                this.setState({
                    stories: pageNumber === 1 ? this.props.stories.hits : [...stories, ...this.props.stories.hits],
                    pageNumber: pageNumber + 1
                }, () => { this.setState({ lastUpdatedStories: stories }) })
        }
        this.setState({ isRefresh: false })
        this.props.loadingAction(false);
    }

    handleSearch = (searchKeyword) => {
        const { lastUpdatedStories } = this.state;
        this.setState({ searchKeyword })
        const filteredPosts = filter(lastUpdatedStories, (o) => {
            return o.title.toLowerCase().indexOf(searchKeyword) > -1 || o.author.toLowerCase().indexOf(searchKeyword) > -1
        });
        this.setState({ stories: filteredPosts })
    }

    handleFilter = (sortby) => {
        const { lastUpdatedPosts } = this.state;
        let sortedPosts = orderBy(lastUpdatedPosts, ['created_at'], [sortby]);
        this.setState({ isFilterPopup: false, posts: sortedPosts, sortby })
    }

    renderFilterModal = () => {
        const { sortby } = this.state;
        return (
            <Modal deviceWidth={deviceWidth} isVisible={true} style={homeScreenStyles.modalContainer}>
                <View style={homeScreenStyles.modalWrapper}>
                    <View style={homeScreenStyles.modalHeaderContainer}>
                        <TouchableOpacity onPress={this.handleFilterClose} style={homeScreenStyles.iconCloseContainer}>
                            <Image source={Icons.CLOSE} style={homeScreenStyles.iconClose} />
                        </TouchableOpacity>
                        <Text>{'Filter'}</Text>
                    </View>
                    <View style={homeScreenStyles.modalContentContainer}>
                        <TouchableOpacity onPress={() => this.handleFilter('asc')} style={homeScreenStyles.padding}>
                            <Text style={{ color: sortby == 'asc' ? 'black' : 'grey' }}>{'Filter by Date ASC'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleFilter('desc')} style={homeScreenStyles.padding}>
                            <Text style={{ color: sortby == 'desc' ? 'black' : 'grey' }}>{'Filter by Date DESC'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index}
                style={homeScreenStyles.itemContainer} onPress={() => { this.setState({ openListViewPopup: true, selectedItem: item }) }}>
                <View style={homeScreenStyles.itemContentContainer}>
                    <View style={{ marginVertical: 2 }}>
                        <Text style={homeScreenStyles.itemTitle}>{item.title}</Text>
                    </View>
                    <View>
                        <View style={homeScreenStyles.itemContent} >
                            <Text>{"Author: "}</Text>
                            <Text>{item.author}</Text>
                        </View>
                        <View style={homeScreenStyles.itemContent} >
                            <Text>{"Date: "}</Text>
                            <Text>{moment(item.created_at).format("Do MMM YY")}</Text>
                        </View>
                    </View>
                    {item.url && <TouchableOpacity onPress={() => { Linking.openURL(item.url); }}>
                        <Text style={homeScreenStyles.itemUrl} ellipsizeMode={'tail'} numberOfLines={1}>{item.url}</Text>
                    </TouchableOpacity>}
                </View>
            </TouchableOpacity>
        )
    }

    listEmptyComponent = () => {
        const { isLoading } = this.props;
        return (
            isLoading ? <ActivityIndicator />
                : <View style={{ alignItems: 'center' }}>
                    <Text>{'List is Empty'}</Text>
                </View>
        )
    }
    onRefresh = () => {
        this.setState({ isRefresh: true, pageNumber: 1 },
            () => {
                this.getStories();
            })
    }

    render() {
        const { selectedItem, stories, searchKeyword, isRefresh, isFilterPopup, openListViewPopup } = this.state;
        return (
            <SafeAreaView>
                <View style={homeScreenStyles.container}>
                    <View style={homeScreenStyles.contentContainer}>
                        {/* show search bar */}
                        <SearchBar
                            searchKeyword={searchKeyword}
                            onChangeSearchTerm={term => { this.handleSearch(term) }} />

                        {/* show filter button */}
                        <TouchableOpacity
                            onPress={this.handleFilterOpen}
                            style={homeScreenStyles.filterContainer}>
                            <Text style={{ color: 'grey' }}>{"fliter"}</Text>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Image source={Icons.FILTER} style={homeScreenStyles.filterIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={stories}
                        extraData={stories}
                        contentContainerStyle={[homeScreenStyles.contentContainer, { marginBottom: 30 }]}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={true}
                        refreshing={isRefresh}
                        onRefresh={() => this.onRefresh()}
                        ListEmptyComponent={this.listEmptyComponent}
                    />

                    {/* Dialog */}
                    {openListViewPopup &&
                        <ListPopup selectedItem={selectedItem} onClose={this.handleDialogClose} />}

                    {/* filter modal */}
                    {isFilterPopup && this.renderFilterModal()}
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.app.isLoading,
        stories: state.app.stories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStories: bindActionCreators(fetchStories, dispatch),
        loadingAction: bindActionCreators(loadingAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);