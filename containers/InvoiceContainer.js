import { Container } from 'unstated';
import Seeder from '../models/seeder/Seeder';
import axios from 'axios';
const INVOICE_API_ENDPOINT = 'http://10.48.5.20:8080/invoice.js';

export default class InvoiceContainer extends Container {
  constructor(props = {}) {
    super();
    this.state = {
      data: props.initialSeeding ? Seeder.getSeed() : this.getEmptyData(),
      isDataLoading: false,
    };
  }

  seed() {
    this.setState({ data: Seeder.getSeed() });
  }

  clear() {
    this.getState({ data: this.getEmptyData() });
  }

  getEmptyData() {
    return {
      customers: [],
      products: [],
      invoices: [],
    };
  }

  getDataFromServer() {
    this.setState({ isDataLoading: true });
    axios
      .get(INVOICE_API_ENDPOINT, { params: {} })
      .then((results) => {
        console.log('HTTP Request succeeded.');
        console.log(results);
        this.setState({ data: results.data });
        this.setState({ isDataLoading: false });
      })
      .catch(() => {
        console.log('HTTP Requests failed.');
        this.setState({ isDataLoading: false });
      });
  }
}
