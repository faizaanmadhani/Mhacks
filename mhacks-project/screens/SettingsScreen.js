import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

class FlatListDemo extends Component {
  static navigationOptions = {
    title: "Friends"
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        seed: this.state.seed + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CEDOCE",
          marginLeft: "14%"
        }}
      />
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CEDOCE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndThreshold={100}
        />
      </List>
    );
  }
}

export default FlatListDemo;
