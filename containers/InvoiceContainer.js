import { Container } from 'unstated';
import Seeder from '../models/seeder/Seeder';

export default class InvoiceContainer extends Container {
  constructor(props = {}) {
    super();
    this.state = {
      data: props.initialSeeding ? Seeder.getSeed() : this.getEmptyData(),
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
}
