import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requests: [],
    };
    this.requestRef = null;
  }

  getrequests = () => {
    console.log("Inside get requests")
    this.requestRef = db.collection('requests').onSnapshot((snapshot) => {
      var requests = snapshot.docs.map((doc) => doc.data());
      this.setState({
        requests: requests,
      });
      console.log(requests)
    });
  };

  componentDidMount() {
    console.log("Inside component did mount")
    this.getrequests();
  }

  componentWillUnmount() {
    this.requestRef()
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 , height : '100%' , backgroundColor : "lightblue" }}>
        <View style={{ flex: 1 }}>
        <Text style={{fontSize : 40 , fontFamily : "serif" , color : "white" , marginBottom : 20}} >HomeScreen</Text>
          {this.state.requests.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Items</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requests}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
