<template>
  <cursor/>
  <router-view/>
</template>

<script lang="ts">export default { name: 'App' };</script>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import useCursorStore from '@store/cursor';
import Cursor from '@module/cursor';

const cursorStore = useCursorStore();

onMounted(() => {
  cursorStore.bind();
  window.dispatchEvent(new CustomEvent('firstScreen'));
});

onUnmounted(() => cursorStore.clear());
</script>

<style lang="scss" src="@scss/base.scss"/>
