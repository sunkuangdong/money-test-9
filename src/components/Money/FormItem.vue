<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type"
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <input
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;
  x(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
  // @Watch('value') // 多此一举 : 因为 input 的值一旦被用户变化，就会触发 @update:value 事件，所以就没必要再加一个 watch 了。
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  .name {
    display: inline-block;
    padding-right: 3px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    width: 1.625rem;
  }
}
</style>