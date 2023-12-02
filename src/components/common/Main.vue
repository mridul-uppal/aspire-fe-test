<!-- Main Layot Component -->
<template>
  <div>
    <div class="flex-row">
      <flex-col xl="3" lg="3" md="4" sm="0" xs="0"
        class="bg-primary-dark max-allowed-container--sidebar overflow-y-hidden">
        <sidebar />
      </flex-col>
      <flex-col lg="9" md="8" sm="12" xs="12" xl="9" class="max-allowed-container--sidebar overflow-y-auto thinScrollbar">
        <div class="content">
          <router-view @event-emitted="handleChildEvent" />
        </div>
      </flex-col>
    </div>
    <div class="navigation-bar p-10">
      <div class="flex-row justify-around">
        <flex-col v-for="navbarAction in navbarActions" :key="navbarAction['name']" col="2"
          class="navbar-action-container">
          <img :src="require('@assets/images/' + navbarAction['icon'] + '.svg')">
          <div>
            <span :class="navbarAction['labelClass']">
              {{ navbarAction['label'] }}
            </span>
          </div>
        </flex-col>
      </div>
    </div>
  </div>
</template>

<script>

import FlexCol from '@components/common/FlexCol';
import Sidebar from '@components/common/Sidebar';
import { getRandomNumber, getRandomString, getUUID } from '@mixins/helpers';
import { getSampleCard, getRandomTransaction } from '@mixins/sampleDataGenerators';
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Main',
  components: { Sidebar, FlexCol },
  setup() {
    const navbarActions = [
      {
        name: 'home',
        label: 'Home',
        icon: 'navbar_home',
        labelClass: 'text-gray'
      },
      {
        name: 'cards',
        label: 'Cards',
        icon: 'card',
        labelClass: 'text-success'
      },
      {
        name: 'payments',
        label: 'Payments',
        icon: 'navbar_payments',
        labelClass: 'text-gray'
      },
      {
        name: 'credit',
        label: 'Credit',
        icon: 'navbar_credit',
        labelClass: 'text-gray'
      },
      {
        name: 'profile',
        label: 'Profile',
        icon: 'navbar_user',
        labelClass: 'text-gray'
      }
    ];

    // STORE ACTIONS
    const store = useStore();
    let addCard = (card) => store.dispatch('cards/addCard', card);
    let addTransaction = (transaction) => store.dispatch('cards/addTransaction', transaction);
    let freezeCard = (card) => store.dispatch('cards/freezeCard', card);
    let enableCard = (card) => store.dispatch('cards/enableCard', card);
    let setActiveCard = (card) => store.dispatch('cards/setActiveCard', card);
    let cancelCard = (card) => store.dispatch('cards/cancelCard', card);

    onBeforeMount(() => {
      buildSampleData();
    });

    function buildSampleData() {
      // BUILDING SAMPLE CARDS, TRANSACTIONS DATA AND UPDATING IN STORE
      let cards = [];
      [...Array(getRandomNumber(2, 4)).keys()].forEach(ind => {
        let sampleCard = buildSampleCard();
        cards.push(sampleCard['card']);
        addCard(sampleCard['card']);
        sampleCard['transactions'].forEach(transaction => addTransaction(transaction));
      });
      setActiveCard(cards[getRandomNumber(1, cards.length - 1)]);
    }

    function buildSampleCard() {
      let card = getSampleCard();
      return {
        card,
        transactions: [...Array(getRandomNumber(1, 20)).keys()].map(transactionInd =>
          getRandomTransaction(card['id']))
      };
    }

    function handleChildEvent(action, payload) {
      let actionHandlers = {
        'add-new-card': addNewCard,
        'toggle-card-active': handleCardActiveChange,
        'cancel-card': handleCardCancel
      };
      if (actionHandlers[action]) {
        actionHandlers[action](payload);
      }
    }

    function addNewCard(newCardData) {
      let sampleCard = buildSampleCard();
      addCard(sampleCard['card']);
      sampleCard['card']['name'] = newCardData['name'];
      sampleCard['transactions'].forEach(transaction => addTransaction(transaction));
      setActiveCard(sampleCard['card']);
    }

    function handleCardCancel(card) {
      cancelCard(card);
    }

    function handleCardActiveChange(card) {
      if (card['active']) {
        freezeCard(card);
      } else {
        enableCard(card);
      }
    }

    return {
      getRandomNumber,
      getRandomString,
      getUUID,
      buildSampleData,
      getSampleCard,
      getRandomTransaction,
      navbarActions,
      handleChildEvent
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@assets/sass/variables';

@media screen and (max-width:720px) {

  .content {
    background: map_get($colors, 'primary-dark');
    margin-bottom: 60px;

    .balance {
      color: white;
    }
  }

  .navigation-bar {
    display: block;
    position: fixed;
    bottom: 0px;
    box-shadow: 0 -3px 6px #00000014;
    width: 100%;
    background: white;
  }
}

@media screen and (min-width:720px) {
  .content {
    padding: 60px;
  }

  .navigation-bar {
    display: none;
  }
}

.navbar-action-container {
  text-align: center;
}
</style>
