<template>
  <div class="var_cursorView" ref="ViewRef">
    <slot></slot>
    <slot name="cursor">
      <cursor/>
    </slot>
  </div>
</template>

<script lang="ts"> export default { name: 'CursorView' };</script>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import useCursorStore from '@store/cursor';
import Cursor from '@module/cursor';

const viewRef = ref<any>();
const cursorStore = useCursorStore();
onUnmounted(() => cursorStore.clear());
onMounted(() => cursorStore.bind(viewRef.value));
</script>

<style lang="scss" src="./style.scss"/>