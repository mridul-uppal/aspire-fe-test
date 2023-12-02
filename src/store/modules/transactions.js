const state = {
  transactions: [],
};

const getters = {
  getTransactions: (state) => state["transactions"],
  getTransactionsByCard: (state) => (card) =>
    state["transactions"].filter((transaction) => transaction["card"] === card),
};

const actions = {
  addTransaction: function ({ commit }, transaction) {
    commit("ADD_TRANSACTION", transaction);
  },
  removeTransaction: function ({ commit }, transaction) {
    commit("REMOVE_TRANSACTION", transaction);
  },
};

const mutations = {
  ADD_TRANSACTION: function (state, transaction) {
    state["transactions"].push(transaction);
  },
  REMOVE_TRANSACTION: function (state, transaction) {
    let transactionIndex = state["transactions"].findIndex(
      (st) => st["id"] === transaction["id"]
    );
    if (transactionIndex > -1) {
      state["transactions"].splice(transactionIndex, 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
