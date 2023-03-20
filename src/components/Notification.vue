<template>
    <TransitionGroup name="notification">
        <div class="notif" v-if="showNotification" @click="removeMsg">
            <slot></slot>
        </div>
    </TransitionGroup>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloseCircle } from '@mdi/js';
    export default {
    components: {
        SvgIcon
    },
    props: {
        showNotification: Boolean,
    },
    data() {
        return {
            path: mdiCloseCircle,
        }
    },
    }
</script>

<style scoped>
.notif {
    position: fixed;
    top: 50px;
    right: 80px;
    width: 200px;
    min-height: 50px;
    max-height: 200px;
    background: var(--btn-main-color);
    border: 1px solid var(--btn-main-color);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.notif p{
    padding-left: 10px;
    background: inherit;
}

.icon {
    cursor: pointer;
    background: inherit;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>