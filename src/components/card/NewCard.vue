<!-- Component to add new card -->
<template>
  <div class="bg-white p-30 radius-5 new-card-container">
    <div>
      <span class="font-large text-secondary">
        New Card
      </span>
    </div>
    <div class="mt-30">
      <input v-model="cardName" ref="card_name" type="text" placeholder="Name on card" class="card_name">
    </div>
    <div class="mt-30 flex-row justify-between pv-10 align-center actions-container">
      <div>
        <span class="text-secondary-dark ph-10 pv-5 font-medium-reg radius-5 pointer-cursor"
          @click="emitEvent('cancel-new-card')">
          Cancel
        </span>
      </div>
      <div>
        <span class="bg-primary text-white ph-10 pv-5 font-medium-reg radius-5 pointer-cursor" @click="addNewCard">
          Submit
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
export default {
  name: 'NewCard',
  setup(_, { emit }) {
    const cardName = ref('');
    const card_name = ref(null);
    function addNewCard() {
      if (cardName.value.length) {
        emitEvent('add-new-card', { name: cardName.value });
      }
    }
    function emitEvent(action, payload) {
      emit('event-emitted', action, payload);
    }
    onMounted(() => {
      card_name.value.focus();
    });
    return {
      cardName,
      addNewCard,
      emitEvent,
      card_name
    };
  }
};
</script>
<style lang="scss" scoped>
.new-card-container {
  min-width: 25vw;
  position: relative;

  .card_name {
    border: none;
    border-bottom: 2px solid gray;

    &:focus {
      outline: none;
    }
  }
}
</style>
