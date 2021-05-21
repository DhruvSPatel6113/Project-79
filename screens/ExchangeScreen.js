import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      itemName: '',
      description: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemName, description) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection('requests').add({
      user_id: userId,
      item_name: itemName,
      description: description,
      request_id: randomRequestId,
    });

    this.setState({
      itemName: '',
      description: '',
    });

    return alert('Successfully Requested');
  };

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'lightblue',
          justifyContent : "center",
          alignItems : "center"
        }}>
        <Text style={styles.header}>Request Item</Text>
        <TextInput
          placeholder="Item"
          style={styles.formTextInput}
          onChangeText={(data) => {
            this.setState({
              itemName: data,
            });
          }}
          value={this.state.itemName}
        />
        <TextInput
          placeholder="description"
          multiline
          style={styles.formTextInput}
          onChangeText={(data) => {
            this.setState({
              description: data,
            });
          }}
          value={this.state.description}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(this.state.itemName && this.state.description){
               this.addRequest(this.state.itemName, this.state.description);
            }
            else{
              alert("Please fill the inpu fields")
            }
          }}>
          <Text>Request</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
    padding: 10,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 40,
  },
  header : {
    textAlign : "center",
    fontSize : 40,
    fontWeight : "bold",
    color : "white",
    fontFamily : "serif",
    marginBottom : 30
  }
});
