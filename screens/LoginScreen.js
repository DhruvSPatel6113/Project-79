import * as React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

var source

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
      isModalVisible: 'false',
      SecureText : 'true'
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (emailId && password && confirmPassword) {
      if (password !== confirmPassword) {
        return alert("password doesn't match\nCheck your password.");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailId, password)

          .then(() => {
            db.collection('users').add({
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              contact: this.state.contact,
              email_id: this.state.emailId,
              address: this.state.address,
            });

            return alert('User Added Successfully', '', [
              {
                text: 'OK',
                onPress: () => this.setState({ isModalVisible: 'false' }),
              },
            ]);
          })

          .catch((error) => {
            switch (error.code) {
              case 'auth/user-not-found':
                alert("user dosen't exists");
                console.log("doesn't exist");
                break;
              case 'auth/invalid-email' || 'auth/invalid-password':
                alert('incorrect email or password');
                console.log('invaild');
                break;
            }
          });
      }
    } else {
      alert('Please fill the input fields');
    }
  };

  userLogin = (emailId, password) => {
    if (emailId && password) {
      console.log(emailId , password)
      firebase
        .auth()
        .signInWithEmailAndPassword(emailId, password)
        .then(() => {
          alert('Successfully signed in')
          this.props.navigation.navigate("TabNavigator")
        })
        .catch((error) => {
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    } else {
      alert('Please fill the input feilds');
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>

              <TextInput
                style={styles.formTextInput}
                placeholder={'First Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
                value={this.state.firstName}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Last Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
                value={this.state.lastName}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
                value={this.state.contact}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
                value={this.state.address}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
                value={this.state.emailId}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                value={this.state.password}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Confrim Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
                value={this.state.confirmPassword}
              />

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ isModalVisible: false })}>
                  <Text style={{ color: '#ff5722' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View>
        {this.showModal()}
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: 'lightblue',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'seif',
            }}>
            Login
          </Text>

          <Image
            source={require('../images.png')}
            style={{ margin: 20, marginTop: 30, width: '90%' }}
          />

          <TextInput
            placeholder="Enter email"
            style={styles.input1}
            onChangeText={(data) => {
              this.setState({
                emailId: data,
              });
            }}
            value={this.state.emailId}
            keyboardType = {"email-address"}
          />

          <TextInput
            placeholder="Enter password"
            style={styles.input2}
            onChangeText={(data) => {
              this.setState({
                password: data,
              });
            }}
            secureTextEntry={true}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Text style={styles.txt}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}>
            <Text style={styles.txt}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input1: {
    borderWidth: 1,
    width: 200,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 50,
    marginTop: 20,
  },

  input2: {
    borderWidth: 1,
    width: 200,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 50,
    marginTop: 20,
  },

  btn: {
    borderWidth: 1,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'blue',
    marginTop: 30,
    borderColor: 'blue',
  },

  btn2: {
    borderWidth: 1,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'blue',
    marginTop: 30,
    borderColor: 'blue',
  },

  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50,
  },

  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },

  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },

  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },

  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold',
  },

  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
