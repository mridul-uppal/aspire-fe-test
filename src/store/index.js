import { createStore } from "vuex";
import cards from "./modules/cards";
import transactions from "./modules/transactions";

export default createStore({
  modules: {
    cards,
    transactions,
  },
});
