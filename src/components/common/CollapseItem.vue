<!-- Component to generate accordians -->
<template>
  <div>
    <div :class="[headerClass, (expanded ? '' : '')]" class="flex-row align-center justify-content-between pointer-cursor"
      @click="toggleCollapse">
      <div :class="showIcon ? 'col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11' : 'col-12'">
        <slot name="header" />
      </div>
      <div v-if="showIcon" class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1 flex-box justify-center">
        <i :class="[iconClass, expanded ? expandIcon : collapseIcon]" />
      </div>
    </div>
    <div v-show="expanded" ref="collapse-content" class="collapse-content">
      <slot />
    </div>
  </div>
</template>
<script>
import { getUUID } from '@mixins/helpers';

export default {
  name: 'CollapseItem',
  props: {
    headerClass: {
      tpye: [String, Array],
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    expandIcon: {
      type: String,
      default: 'fas fa-angle-down'
    },
    collapseIcon: {
      type: String,
      default: 'fas fa-angle-right'
    },
    iconClass: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      uuid: '',
      expanded: false,
      isMounted: false,
      timer: null
    };
  },
  watch: {
    open: function (isOpen) {
      if (isOpen) this.openCollapse();
      else this.closeCollapse();
    }
  },
  mounted: function () {
    this.uuid = getUUID();
    this.isMounted = true;
    if (this.open) {
      this.openCollapse();
    }
  },
  methods: {
    collapseParent: function () {
      return this.$parent;
    },
    toggleCollapse: function (showContent = false, triggered = false) {
      if (this.isMounted) {
        if (this.expanded) {
          this.closeCollapse();
        } else {
          this.openCollapse();
        }
      }
    },
    closeCollapse: function () {
      const content = this.$refs['collapse-content'];
      content.style.maxHeight = null;
      this.expanded = false;
      this.$emit('collapse');
      this.emitExpandedState();
    },
    openCollapse: function () {
      const content = this.$refs['collapse-content'];
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (parseInt(content.style.maxHeight) === content.scrollHeight) {
          clearInterval(this.timer);
        } else {
          content.style.maxHeight = content.scrollHeight + 100 + 'px';
        }
      }, 50);
      this.expanded = true;
      this.$emit('expand');
      this.emitExpandedState();
    },

    emitExpandedState: function () {
      this.collapseParent().handleCollapseItemExpand(this.uuid, this.expanded);
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  box-shadow: 0 4px 8px -4px lightgray;
}

.collapse-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
</style>
