const state = {
  cards: [],
  activeCard: null,
};

const getters = {
  getCards: (state) => state["cards"],
  getCardById: (state) => (id) => state["cards"].find((sc) => sc["id"] === id),
  getActiveCard: (state) => state["activeCard"],
  getActiveCardIndex: (state) =>
    state["cards"].findIndex((sc) => sc["id"] === state["activeCard"]["id"]),
};

const actions = {
  addCard: function ({ commit }, card) {
    commit("ADD_CARD", card);
  },
  removeCard: function ({ commit }, card) {
    commit("REMOVE_CARD", card);
  },
  setActiveCard: function ({ commit }, card) {
    commit("SET_ACTIVE_CARD", card);
  },
  showCardInfo: function ({ commit }, card) {
    commit("TOGGLE_CARD_INFO", { card, show: true });
  },
  hideCardInfo: function ({ commit }, card) {
    commit("TOGGLE_CARD_INFO", { card, show: false });
  },
  freezeCard: function ({ commit }, card) {
    commit("SET_CARD_ACTIVE_STATUS", { card, active: false });
  },
  enableCard: function ({ commit }, card) {
    commit("SET_CARD_ACTIVE_STATUS", { card, active: true });
  },
  cancelCard: function ({ commit, getters }, card) {
    let cards = getters["getCards"];
    cards = cards.filter((sc) => sc["id"] !== card["id"]);
    commit("CANCEL_CARD", card);
    if (cards.length) {
      commit("SET_ACTIVE_CARD", cards[0]);
    } else {
      commit("SET_ACTIVE_CARD", null);
    }
  },
  activatePreviousCard: function ({ commit, getters }, card) {
    let cards = getters["getCards"];
    let activeCardIndex = getters["getActiveCardIndex"];
    if (activeCardIndex > 0) {
      commit("SET_ACTIVE_CARD", cards[activeCardIndex - 1]);
    }
  },
  activateNextCard: function ({ commit, getters }, card) {
    let cards = getters["getCards"];
    let activeCardIndex = getters["getActiveCardIndex"];
    if (activeCardIndex < cards.length - 1) {
      commit("SET_ACTIVE_CARD", cards[activeCardIndex + 1]);
    }
  },
  addTransaction: function ({ commit, dispatch }, transaction) {
    commit("ADD_TRANSACTION", transaction);
    dispatch("transactions/addTransaction", transaction, { root: true });
  },
};

const mutations = {
  ADD_CARD: function (state, card) {
    state["cards"].push(card);
  },
  REMOVE_CARD: function (state, card) {
    let cardIndex = state["cards"].findIndex((st) => st["id"] === card["id"]);
    if (cardIndex > -1) {
      state["cards"].splice(cardIndex, 1);
    }
  },
  SET_ACTIVE_CARD: function (state, card) {
    state["activeCard"] = card;
  },
  TOGGLE_CARD_INFO: function (state, { card, show }) {
    let stateCard = state["cards"].find((sc) => sc["id"] === card["id"]);
    stateCard["showCardInfo"] = show;
  },
  CANCEL_CARD: function (state, card) {
    let cardIndex = state["cards"].findIndex((sc) => sc["id"] === card["id"]);
    if (cardIndex > -1) {
      state["cards"].splice(cardIndex, 1);
    }
  },
  ADD_TRANSACTION: function (state, transaction) {
    let card = state["cards"].find((sc) => sc["id"] === transaction["card"]);
    if (card) {
      let amount = transaction["amount"];
      if (transaction["type"] === "debit") {
        amount = 0 - amount;
      }
      card["balance"] += amount;
    }
  },
  SET_CARD_ACTIVE_STATUS: function (state, { card, active }) {
    let stateCard = state["cards"].find((sc) => sc["id"] === card["id"]);
    stateCard["active"] = active;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
