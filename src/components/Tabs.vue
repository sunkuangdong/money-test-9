<template>
  <ul class="tabs" :class="{ [classPrefix + 'tabs']: classPrefix }">
    <li
      v-for="(item, index) in dataSource"
      :key="index"
      @click="select(item)"
      :class="{
        selected: item.value === value,
        [classPrefix + '-tabs-item']: classPrefix,
      }"
      class="tabs-item"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];
  @Prop({ default: "-" })
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>