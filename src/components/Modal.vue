<template>
  <div class="modal" v-if="show" @click.stop="hideModal">
    <div @click.stop class="modal_content">
      <slot name="title"></slot>
      <div class="modal_scroll">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideModal() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
}

.modal_content {
  margin: auto;
  background: var(--card-background-color);
  border-radius: 5px;
  min-width: 500px;
  min-height: 200px;
}

.modal_scroll {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 600px;
}
</style>
