<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Collapse',
  props: {
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {};
  },
  methods: {
    handleCollapseItemExpand: function (collapseItemUUID, expanded) {
      if (expanded && this.accordion) {
        this.getCollapseItems()
          .filter(ci => ci['uuid'] !== collapseItemUUID)
          .forEach(collapseItem => collapseItem.closeCollapse());
      }
    },
    getCollapseItems: function () {
      return Array.from(this.$children).filter(child => child.$options['_componentTag'] === 'collapse-item');
    }
  }
};
</script>
