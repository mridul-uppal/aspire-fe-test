<!-- Component to show card controls -->
<template>
  <div class="actions-container bg-primary-layer pv-10 ph-5">
    <div class="flex-row font-small-med text-primary justify-around">
      <flex-col col="2" class="pointer-cursor" @click="cardAction('toggle-card-active')">
        <div class="action-container">
          <img :src="require('@assets/images/ice_flake.svg')" class="bg-primary p-2 radius-15 freeze-card">
        </div>
        <div class="action-container">
          <span>
            {{ card['active'] ? 'Freeze' : 'Unfreeze' }} Card
          </span>
        </div>
      </flex-col>
      <flex-col col="2">
        <div class="action-container">
          <img :src="require('@assets/images/dashboard.svg')" class="bg-primary p-5 radius-15 spend-limit">
        </div>
        <div class="action-container">
          <span>
            Set spend limit
          </span>
        </div>
      </flex-col>
      <flex-col col="2">
        <div class="action-container">
          <img :src="require('@assets/images/gpay.svg')" class="add-to-gpay">
        </div>
        <div class="action-container">
          <span>
            Add to GPay
          </span>
        </div>
      </flex-col>
      <flex-col col="2">
        <div class="pb-10 mt-6 action-container">
          <span class="bg-primary pt-4 pb-5 ph-7 radius-15">
            <i class="fas fa-undo text-white font-small" />
          </span>
        </div>
        <div class="action-container">
          <span>Replace Card</span>
        </div>
      </flex-col>
      <flex-col col="2" class="pointer-cursor" @click="handleCancelCard">
        <div class="pb-10 mt-6 action-container">
          <span class="bg-primary pt-4 pb-5 ph-8 radius-15">
            <i class="far fa-trash-alt text-white font-small" />
          </span>
        </div>
        <div class="action-container">
          <span>Cancel Card</span>
        </div>
      </flex-col>
    </div>
    <modal v-if="isModalActive" :show-close-icon="false">
      <template #default>

        <template v-if="modalComponent === 'cancel-card'">
          <div class="cancel-card-confirmation bg-white radius-10">
            <div class="bg-danger-lite p-15">
              <span class="font-regular text-dark text-bold">
                Cancel Card
              </span>
            </div>
            <div class="p-20 font-regular text-secondary-dark">
              <div>
                <span>
                  Are you sure want to remove this card ?
                </span>
              </div>
              <div class="flex-row align-center justify-between pt-30">
                <div>
                  <span class="text-secondary-dark ph-10 pv-5 font-medium-reg radius-5 pointer-cursor"
                    @click="closeModal">
                    No
                  </span>
                </div>
                <div>
                  <span class="bg-danger text-white ph-10 pv-5 font-medium-reg radius-5 pointer-cursor"
                    @click="cancelCard">
                    <i class="far fa-trash-alt font-medium" />
                    Yes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import FlexCol from '@components/common/FlexCol';
import Modal from '@components/common/Modal';

export default {
  components: { FlexCol, Modal },
  props: {
    card: {
      type: Object,
      default: null
    }
  },
  emits: ['event-emitted'],
  setup(_, { emit }) {
    const isModalActive = ref(false);
    const modalComponent = ref(null);
    const modalData = ref({});

    function cardAction(action, payload) {
      emit('event-emitted', action, payload);
    }

    function openModal(component, data) {
      modalData.value = data;
      modalComponent.value = component;
      isModalActive.value = true;
    }

    function closeModal(component, data) {
      isModalActive.value = false;
    }

    function handleCancelCard() {
      openModal('cancel-card');
    }

    function cancelCard() {
      closeModal();
      cardAction('cancel-card');
    }

    return {
      cardAction,
      handleCancelCard,
      isModalActive,
      modalComponent,
      openModal,
      closeModal,
      cancelCard
    };
  }
};
</script>

<style lang="scss" scoped>
.action-container {
  text-align: center;

  .freeze-card {
    height: 20px;
    width: 20px;
  }

  .spend-limit {
    height: 15px;
    width: 15px;
  }

  .add-to-gpay {
    height: 25px;
    width: 25px
  }
}

@media screen and (max-width:720px) {
  .actions-container {
    background: #edf3ff;
    padding-right: 10px;
    border-radius: 15px 15px 0 0;
  }
  .cancel-card-confirmation {
    min-width: 30vw;
  }
}

@media screen and (min-width:720px) {
  .actions-container {
    border-radius: 15px;
  }
  .cancel-card-confirmation {
  min-height: 25vh;
  min-width: 30vw;
}
}
</style>
