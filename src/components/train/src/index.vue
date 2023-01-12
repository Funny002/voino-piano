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
import { Queue } from '@utils/queue';

const queue_ = new Queue();


const data = reactive({
  end: false,
  load: false,
  start: false,
});

function active() {
  data.end = false;
  data.start = true;
  queue_.add(() => {
    data.start = false;
    data.load = true;
  }, 0, 800);
}

function end() {
  queue_.add(() => {
    data.load = false;
    data.end = true;
  }, 1000);
}

defineExpose({ active, end });
</script>

<style lang="scss" src="./style.scss"/>
