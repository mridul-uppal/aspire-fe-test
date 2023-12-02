<!-- Component to show Modal Popup -->
<template>
  <div class="modal-container flex-row align-center justify-center">
    <i v-if="showCloseIcon" class="fas fa-times text-white modal-close font-huge pointer-cursor"
      @click="$emit('close')" />
    <slot />
  </div>
</template>

<script>
export default {
  Name: 'AppModal',
  props: {
    showCloseIcon: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .modal-close {
    position: fixed;
    top: 50px;
    right: 50px;
  }
}
</style>
