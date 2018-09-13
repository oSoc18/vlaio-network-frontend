import uuid from 'uuid/v1';

class Overlap {
  constructor({ partners, amount }) {
    this.id = uuid();
    this.partners = partners;
    this.amount = amount;
  }
}

export default Overlap;
