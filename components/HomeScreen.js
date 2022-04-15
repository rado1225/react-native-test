import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  Container,
  Content,
  Button,
  Text,
  Icon,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import { Subscribe } from 'unstated';
import InvoiceContainer from '../containers/InvoiceContainer.js';

class HomeScreenContent extends React.Component {
  render() {
    let globalState = this.props.globalState;
    let invoiceList = <Text>No invoice</Text>;
    if (globalState.state.data.invoices.length) {
      invoiceList = (
        <List>
          {globalState.state.data.invoices.map((invoice) => {
            return (
              <ListItem key={invoice.id} noIndent>
                <Left>
                  <Text key={invoice.id}>
                    {invoice.id + ' : ' + invoice.date}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            );
          })}
        </List>
      );
    }

    return (
      <Subscribe to={[InvoiceContainer]}>
        {(globalState) => (
          <Container>
            <Content>
              <View style={{ flexDirection: 'row' }}>
                <Left>
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate('InvoiceEdit')
                    }
                  >
                    <Icon type="FontAwesome5" name="file-invoice-dollar" />
                    <Text style={{ paddingLeft: 0 }}>InvoiceEdit</Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    onPress={() => this.props.navigation.navigate('Summary')}
                  >
                    <Icon type="FontAwesome5" name="poll-h" />
                    <Text style={{ paddingLeft: 0 }}>Summary</Text>
                  </Button>
                </Right>
              </View>

              {invoiceList}
            </Content>

            <StatusBar style="auto" />
          </Container>
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
