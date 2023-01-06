<template>
  <cursor.view class="App">
    <router-view/>
  </cursor.view>
</template>

<script lang="ts">export default { name: 'App' };</script>

<script lang="ts" setup>
import Cursor from '@module/cursor';
</script>

<style lang="scss" src="@scss/base.scss"></style>