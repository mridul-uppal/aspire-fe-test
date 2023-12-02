<!-- View at home route -->
<template>
  <div>
    <div class="balance-container">
      <div class="flex-row">
        <flex-col xl="6" lg="6" md="6" sm="6" xs="6">
          <template #default>
            <div class="balance-label free-letter-spacing">
              <span>Available balance</span>
            </div>
            <div class="mt-10 flex-row align-center">
              <span class="pv-3 ph-7 bg-success radius-3 font-med text-white">S$</span>
              <span class="balance ml-10 font-large text-dark text-bold">{{ getNumber(bal) }}</span>
            </div>
          </template>
        </flex-col>
        <flex-col xl="6" lg="6" md="6" sm="6" xs="6">
          <template #default>
            <div class="flex-row justify-end">
              <span class="new-card-btn bg-primary ph-10 pv-7 radius-3 text-white pointer-cursor"
                @click="handleAddNewCard">
                <i class="fas fa-plus-circle" />
                New card
              </span>
            </div>
          </template>
        </flex-col>
      </div>
    </div>
    <div class="mt-30">
      <div class="card-tabs">
        <div class="flex-row align-baseline">
          <span class="text-dark text-bold bb-info pb-5 user-debit-cards">
            My debit cards
          </span>
          <span class="text-secondary-lite ml-20 pointer-cursor hover-text-bold hover-text-black">
            All company cards
          </span>
        </div>
      </div>
      <div class="cards-container radius-10 mt-10">
        <template v-if="cards.length">
          <div class="flex-row">
            <flex-col sm="12" xs="12" md="12" lg="6" xl="5">
              <div class="mt-10 flex-row justify-center">
                <div class="ph-30">
                  <card :card="activeCard" />
                </div>
              </div>
              <div class="card-navigator-container">
                <div class="flex-row align-center justify-center pt-10">
                  <i v-if="!isFirstCard"
                    class="fas fa-circle font-smaller text-success-lite pointer-cursor card-navigator"
                    @click="activatePreviousCard" />
                  <span class="pv-4 ph-10 radius-5 bg-success ml-7 pointer-cursor" />
                  <i v-if="!isLastCard"
                    class="fas fa-circle font-smaller text-success-lite ml-7 pointer-cursor card-navigator"
                    @click="activateNextCard" />
                </div>
              </div>
              <div class="mt-15 card-actions-container">
                <card-actions :card="activeCard" @event-emitted="handleChildEvent" />
              </div>
            </flex-col>
            <flex-col lg="6" xl="5" md="12" sm="12" class="bg-white">
              <div class="mt-10 pt-20 details-container">
                <collapse>
                  <collapse-item header-class="radius-5 bg-info-layer text-primary-dark" class="border-gray radius-5"
                    disabled expand-icon="fas fa-angle-down pt-4 pb-3 pl-4 pr-5"
                    collapse-icon="fas fa-angle-right pt-3 pb-2 pl-6 pr-6"
                    icon-class="text-white bg-primary-layer radius-10">
                    <template #header>
                      <div class="pv-15 ph-10">
                        <div class="flex-row align-center">
                          <img :src="require('@assets/images/card_details.svg')">
                          <span class="ml-10">Card details</span>
                        </div>
                      </div>
                    </template>
                    <template #default />
                  </collapse-item>
                  <collapse-item open header-class="radius-5 bg-info-layer text-primary-dark"
                    class="border-gray radius-5 mt-10" expand-icon="fas fa-angle-down pt-4 pb-3 pl-4 pr-5"
                    collapse-icon="fas fa-angle-right pt-3 pb-2 pl-6 pr-6"
                    icon-class="text-white bg-primary-layer radius-10">
                    <template #header>
                      <div class="pv-15 ph-10">
                        <div class="flex-row align-center">
                          <img :src="require('@assets/images/transactions.svg')">
                          <span class="ml-10">Recent transactions</span>
                        </div>
                      </div>
                    </template>
                    <template #default>
                      <div class="ph-10">
                        <dashboard-transaction v-for="transaction in transactions" :key="transaction['id']"
                          :transaction="transaction" class="bt-info-lite pv-10" />
                      </div>
                      <div class="bg-success-layer pv-10 text-success font-medium flex-row justify-center">
                        <span>View all card transactions</span>
                      </div>
                    </template>
                  </collapse-item>
                </collapse>
              </div>
            </flex-col>
          </div>
        </template>
        <template v-else>
          <div class="flex-row align-center justify-center p-20">
            <div class="cards-header">
              <div>
                <span class="font-reg-large text-warning">
                  <i class="fas fa-exclamation-circle" />
                  No Cards Available
                </span>
              </div>
              <div>
                <span>
                  <span class="text-underline text-info text-bold pointer-cursor" @click="handleAddNewCard">
                    Add a new card
                  </span>
                  <span class="text-secondary-dark">to proceed.</span>
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <modal v-if="isModalActive" :show-close-icon="false">
      <template #default>

        <template v-if="modalComponent === 'new-card'">
          <new-card @event-emitted="handleChildEvent" />
        </template>
      </template>
    </modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { getNumber } from '@mixins/helpers';
import Card from '@components/card/Card';
import Collapse from '@components/common/Collapse';
import CollapseItem from '@components/common/CollapseItem';
import DashboardTransaction from '@components/transaction/DashboardTransaction';
import { useStore } from 'vuex';
import CardActions from '@components/card/CardActions';
import FlexCol from '@components/common/FlexCol';
import Modal from '@components/common/Modal';
import NewCard from '@components/card/NewCard';

export default {
  name: 'Cards',
  components: {
    Card,
    Modal,
    FlexCol,
    NewCard,
    Collapse,
    CardActions,
    CollapseItem,
    DashboardTransaction
  },
  emits: ['event-emitted'],
  setup(_, { emit }) {
    const bal = ref(3000);
    const isModalActive = ref(false);
    const modalComponent = ref(null);
    const modalData = ref({});
    const store = useStore();
    const transactions = computed(() => store.getters['transactions/getTransactions'].slice(0, 5));
    const activeCard = computed(() => store.getters['cards/getActiveCard']);
    const cards = computed(() => store.getters['cards/getCards']);
    const isFirstCard = computed(() => store.getters['cards/getActiveCardIndex'] === 0);
    const isLastCard = computed(() => store.getters['cards/getActiveCardIndex'] === (cards.value.length - 1));
    function addNewCard() {
      emitEvent('add-new-card');
    }
    function activatePreviousCard() {
      store.dispatch('cards/activatePreviousCard');
    }
    function emitEvent(action, payload) {
      emit('event-emitted', action, payload);
    }
    function activateNextCard() {
      store.dispatch('cards/activateNextCard');
    }
    function handleCardActiveChange() {
      emitEvent('toggle-card-active', activeCard.value);
    }
    function handleCardCancel() {
      emitEvent('cancel-card', activeCard.value);
    }
    function handleAddNewCard() {
      openModal('new-card');
    }

    function openModal(component, data) {
      modalData.value = data;
      modalComponent.value = component;
      isModalActive.value = true;
    }

    function closeModal(component, data) {
      isModalActive.value = false;
    }

    function handleNewCardData(newCardData) {
      emitEvent('add-new-card', newCardData);
      closeModal();
    }

    function handleChildEvent(action, payload) {
      let actionHandlers = {
        'toggle-card-active': handleCardActiveChange,
        'cancel-card': handleCardCancel,
        'cancel-new-card': closeModal,
        'add-new-card': handleNewCardData
      };
      if (actionHandlers) {
        actionHandlers[action](payload);
      }
    }

    return {
      bal,
      cards,
      activeCard,
      isModalActive,
      modalComponent,
      openModal,
      closeModal,
      modalData,
      addNewCard,
      isLastCard,
      getNumber,
      isFirstCard,
      handleChildEvent,
      transactions,
      activateNextCard,
      activatePreviousCard,
      handleAddNewCard
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@assets/sass/variables';

.user-debit-cards {
  border-width: 3px;
}

.details-container {
  padding: 20px 30px;
}

@media screen and (max-width:720px) {

  .balance,
  .balance-label,
  .user-debit-cards {
    color: white;
  }

  .new-card-btn {
    background: none;
    color: map_get($colors, 'info');
    font-weight: bold;
    letter-spacing: 1px;
  }

  .card-tabs,
  .balance-container {
    padding: 20px 30px 0 30px;
  }

  .card-navigator {
    opacity: 0.3;
  }

}

@media screen and (min-width:720px) {

  .cards-container {
    box-shadow: 0 2pt 12pt #00000014;
    overflow: hidden;
    border: 1px solid map_get($colors, 'gray');
  }

  .card-actions-container {
    padding: 0 30px 20px 30px;
  }

  .card-actions-container,
  .card-navigator-container {
    width: 330px;
    padding-left: 30px;
  }

  .card-navigator {
    opacity: 1;
  }
}

.cards-header {
  text-align: center;
}
</style>
