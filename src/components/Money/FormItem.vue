<template>
    <div>
        <label class="notes">
            <span class="name">{{this.fieldName}}</span>
            <input type="text" :value="value" @input="onValueChanged($event.target.value)" :placeholder="placeholder"/>
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Component, Prop} from "vue-property-decorator";
    @Component
    export default class Notes extends Vue {
        @Prop({default:""}) readonly value!: string;
        @Prop({required:true}) fieldName!: string;
        @Prop() placeholder?: string;

        // @Watch('value') // 多此一举 : 因为 input 的值一旦被用户变化，就会触发 @update:value 事件，所以就没必要再加一个 watch 了。
        onValueChanged(value: string){
            this.$emit('update:value',value)
        }
    }
</script>

<style lang="scss" scoped>
    .notes{
        display: flex;
        padding-left: 16px;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        input{
            height: 44px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>