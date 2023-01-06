<template>
  <div class="var-cursor" :class="{'is-down': getData.hasDown, 'is-hide': getData.hide}" :style="getStyle">
    <div class="var-cursor_block"/>
  </div>
</template>

<script lang="ts">export default { name: 'Cursor' }; </script>

<script lang="ts" setup>
import useCursorStore from '@store/cursor';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const cursorStore = useCursorStore();
const { getData } = storeToRefs(cursorStore);
const getStyle = computed(() => ({ top: getData.value.top + 'px', left: getData.value.left + 'px' }));
</script>

<style lang="scss" src="./style.scss"/>
