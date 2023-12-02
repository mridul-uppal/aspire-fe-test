<!-- Component to show recent transactions -->

<template>
  <div class="p-5">
    <div class="flex-row align-center">
      <flex-col col="2">
        <span :class="[transactionTypeBgClasses[transaction['type']]]" class="ph-7 pb-4 pt-10 radius-15">
          <img :src="getTransactionIcon()" class="transaction-icon">
        </span>
      </flex-col>
      <flex-col col="7">
        <div class="text-black text-bold font-small-med">
          <span>
            {{ transaction['receiver'] }}
          </span>
        </div>
        <div class="text-secondary font-small mt-3">
          <span>
            {{ formatDate(transaction['time'], 'd M Y') }}
          </span>
        </div>
        <div class="text-primary text-bold font-small mt-10">
          <span class="bg-primary ph-5 pv-2 radius-10">
            <img :src="require('@assets/images/dashboard_transaction.svg')">
          </span>
          <span class="ml-5">
            <span>{{ transaction['type'] == 'debit' ? 'Charged to' : 'Refund on' }}</span> debit card
          </span>
        </div>
      </flex-col>
      <flex-col col="3" class="transaction-amount">
        <span :class="[transactionTypeTextClasses[transaction['type']]]" class="text-bold">
          {{ transactionTypeSymbols[transaction['type']] }}
          S$ {{ transaction['amount'] }}
        </span>
      </flex-col>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@mixins/helpers';
import FlexCol from '@components/common/FlexCol';

export default {
  components: { FlexCol },
  props: {
    transaction: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const transactionTypeBgClasses = {
      refund: 'bg-info-layer',
      credit: 'bg-success-layer',
      debit: 'bg-danger-layer'
    };
    const transactionTypeTextClasses = {
      refund: 'text-success',
      credit: 'text-success',
      debit: 'text-danger'
    };
    const transactionTypeSymbols = {
      refund: '+',
      credit: '+',
      debit: '-'
    };
    function getTransactionIcon() {
      return require('@assets/images/' + props.transaction.type + '.svg');
    }
    return {
      formatDate,
      getTransactionIcon,
      transactionTypeSymbols,
      transactionTypeBgClasses,
      transactionTypeTextClasses
    };
  }
};
</script>
<style lang="scss" scoped>
.transaction-icon {
  width: 13px;
  height: 13px;
}

.transaction-amount {
  text-align: right;
}
</style>
