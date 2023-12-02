import { getRandomNumber, getRandomString, getUUID } from '@mixins/helpers';

// Generate random card details
export function getSampleCard () {
  let minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() + 2);
  let maxDate = new Date(2030, 11, 1);
  return {
    id: getUUID(),
    name: getRandomString(getRandomNumber(8, 15)),
    number: getRandomString(16, false, true),
    validThru: getRandomTimestamp(minDate.getTime(), maxDate.getTime()),
    cvv: getRandomString(3, false, true),
    showCardInfo: false,
    active: true,
    balance: 0,
    spendLimit: getRandomNumber(5000, 100000)
  };
}

// Generate random transactions
export function getRandomTransaction (cardUUID) {
  let minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 2);
  let date = new Date();
  return {
    id: getUUID(),
    time: getRandomTimestamp(minDate.getTime(), date.getTime()),
    type: ['credit', 'debit', 'refund'][getRandomNumber(0, 2)],
    amount: getRandomNumber(1, 350),
    receiver: getRandomString(getRandomNumber(5, 15)),
    card: cardUUID
  };
}

//Gnerate random time
export function getRandomTimestamp (min, max) {
  let date = new Date(getRandomNumber(max, min));
  return date.getTime();
}
