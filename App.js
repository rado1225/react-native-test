import React from 'react';
import { View, Text } from 'react-native';
// expo-fontとアイコンをimportする
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import InvoiceEditScreen from './components/InvoiceEditScreen';
import SummaryScreen from './components/SummaryScreen';
import { Provider } from 'unstated';
import InvoiceContainer from './containers/InvoiceContainer';

const Stack = createStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="InvoiceEdit" component={InvoiceEditScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  // ロードが終わるまでは「loading...」を表示するため、state「isReady」で制御
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  //DidMountのタイミングでフォントリソースをメモリ上に読み込み、終わったらisReadyをオン
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    // Wait for font loading... フォントの読み込み中なら、「loading...」を表示
    if (!this.state.isReady) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    let globalState = new InvoiceContainer({ initialSeeding: true });
    return (
      <Provider inject={[globalState]}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    );
  }
}
