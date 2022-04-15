import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { Subscribe } from 'unstated';
import InvoiceContainer from '../containers/InvoiceContainer.js';
import styles from '../styles.js';

class HomeScreenContent extends React.Component {
  render() {
    let globalState = this.props.globalState;
    let invoiceList = <Text>No invoice</Text>;
    if (globalState.state.data.invoices.length) {
      invoiceList = globalState.state.data.invoices.map((invoice) => {
        return <Text key={invoice.id}>{invoice.id + ':' + invoice.date}</Text>;
      });
    }

    return (
      <Subscribe to={[InvoiceContainer]}>
        {(globalState) => (
          <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Hello World!</Text>
            <Button
              title="Go to InvoiceEdit"
              onPress={() => this.props.navigation.navigate('InvoiceEdit')}
            />
            <Button
              title="Go to Summary"
              onPress={() => this.props.navigation.navigate('Summary')}
            />
            {invoiceList}
            <StatusBar style="auto" />
          </View>
        )}
      </Subscribe>
    );
  }
}

const HomeScreen = ({ navigation }) => {
  return (
    <Subscribe to={[InvoiceContainer]}>
      {(globalState) => (
        <HomeScreenContent globalState={globalState} navigation={navigation} />
      )}
    </Subscribe>
  );
};

export default HomeScreen;
