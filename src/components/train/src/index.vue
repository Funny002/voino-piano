<template>
  <div class="var-train" :class="{
    'is-end': data.end,
    'is-load': data.load,
    'is-start': data.start,
  }">
    <div class="var-train_content">
      <slot name="footer">
        <train-foot/>
      </slot>
      <template v-for="key in 5" :key="key">
        <slot name="compartment">
          <train-compartment/>
        </slot>
      </template>
      <slot name="header">
        <train-head/>
      </slot>
    </div>
    <div class="var-train_track">
      <slot name="track"/>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'Train' };</script>

<script lang="ts" setup>
import { TrainCompartment, TrainFoot, TrainHead } from '@module/train';
import { reactive } from 'vue';

const data = reactive({
  end: false,
  load: false,
  start: false,
});

function active() {
  data.end = false;
  data.start = true;
  setTimeout(() => {
    data.start = false;
    data.load = true;
  }, 1000);
}

function end() {
  setTimeout(() => {
    data.load = false;
    data.end = true;
  }, 1000);
}

defineExpose({ active, end });
</script>

<style lang="scss" src="./style.scss"/>
