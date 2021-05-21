import * as React from 'react'
import {View} from 'react-native'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ExchangeScreen from './screens/ExchangeScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component{
  render(){
    return <AppContainer />
  }
}

const TabNavigator = createBottomTabNavigator({
  HomeScreen : {screen : HomeScreen},
  ExchangeScreen : {screen : ExchangeScreen}
})

const SwitchNavigator = createSwitchNavigator({
  LoginScreen : {screen : LoginScreen},
  TabNavigator : {screen : TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)