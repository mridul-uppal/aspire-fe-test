<!-- Compnent for swing the Card with details -->
<template>
  <div class="flex-row">
    <div class="card-info-toggle-container">
      <div class="flex-row justify-end">
        <span class="text-success font-small text-bold bg-white bg-white pv-7 ph-10 radius-5 pointer-cursor"
          @click="toggleCardInfo">
          <i class="fas fa-eye pr-3" />
          {{ card['showCardInfo'] ? 'Hide' : 'Show' }} card number
        </span>
      </div>
    </div>
    <div :class="[card['active'] ? 'bg-success' : 'bg-secondary']" class=" card radius-10 text-white">
      <div class="p-20">
        <div class="flex-row justify-end">
          <img :src="require('@assets/images/card_logo.svg')">
        </div>
        <div class="mt-20">
          <span class="font-regular text-bold extra-letter-spacing">{{ card['name'] }}</span>
        </div>
        <div class="flex-row mt-25">
          <div class="font-medium extra-letter-spacing">
            <div class="flex-row align-center">
              <template v-if="card['showCardInfo']">
                {{ card['number'].replace(/(\d{4})/g, '$1 &nbsp;') }}
              </template>
              <template v-else>
                <i v-for="i in 12" :key="i" :class="[(i > 1) ? ([5, 9].includes(i) ? 'ml-15' : 'ml-3') : '']"
                  class="fas fa-circle font-x-small" />
                <span class="ml-15">
                  {{ (card['number']).slice(-4) }}
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="mt-10 flex-row align-center font-small text-bold extra-letter-spacing">
          <flex-col lg="4" xl="4" md="4" sm="4" xs="4">
            <span>Thru: {{ formatDate(card['validThru'], 'm/y') }}</span>
          </flex-col>
          <flex-col lg="4" xl="4" md="4" sm="4" xs="4">
            <div class="flex-row align-center">
              <span>
                CVV:
              </span>
              <span class="font-small ml-5">
                <template v-if="card['showCardInfo']">
                  {{ card['cvv'] }}
                </template>
                <template v-else>
                  <i class="fas fa-asterisk" />
                  <i class="fas fa-asterisk" />
                  <i class="fas fa-asterisk" />
                </template>
              </span>
            </div>
          </flex-col>
        </div>
        <div class="flex-row justify-end">
          <img :src="require('@assets/images/visa.svg')">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { formatDate } from '@mixins/helpers';
import FlexCol from '@components/common/FlexCol';

export default {
  name: 'Card',
  components: { FlexCol },
  props: {
    card: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const store = useStore();

    function toggleCardInfo() {
      store.dispatch(`cards/${props['card']['showCardInfo'] ? 'hide' : 'show'}CardInfo`, props.card);
    }

    return {
      formatDate,
      toggleCardInfo
    };
  }
};
</script>

<style lang="scss" scoped>
.card-info-toggle-container,
.card {
  width: 330px;
}

.card {
  height: 200px;
}

@media screen and (max-width:480px) {

  .card-info-toggle-container,
  .card {
    width: 100%;
  }
}
</style>
