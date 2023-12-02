<!-- Component to generate responsive divs -->
<template>
  <div :class="[
    `col-xl-${xl || col}`,
    `col-lg-${lg || xl || col}`,
    `col-md-${md || lg || xl || col}`,
    `col-sm-${sm || md || lg || xl || col}`,
    `col-xs-${xs || sm || md || lg || xl || col}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FlexCol',
  props: {
    col: {
      type: [Number, String],
      default: 12
    },
    xl: {
      type: [Number, String],
      default: undefined
    },
    lg: {
      type: [Number, String],
      default: undefined
    },
    md: {
      type: [Number, String],
      default: undefined
    },
    sm: {
      type: [Number, String],
      default: undefined
    },
    xs: {
      type: [Number, String],
      default: undefined
    }
  }
};
</script>
