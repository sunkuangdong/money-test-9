<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="(tag,index) in tagList" :key="index" @click="toggle(tag)"
                :class="{select:selectedTags.indexOf(tag)>=0}">{{tag.name}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator"
    import TagHelper from '@/mixins/TagHelper';
    import {mixins} from 'vue-class-component';
    @Component
    export default class Tags extends mixins(TagHelper) {
        get tagList(){
            return this.$store.state.tagList;
        }
        selectedTags: string[] = [];
        toggle(tag: string){
            const index = this.selectedTags.indexOf(tag);
            if(index>=0){
                this.selectedTags.splice(index,1)
            }else {
                this.selectedTags.push(tag)
            }
            this.$emit('update:value',this.selectedTags)
        }
        created(){
            this.$store.commit("fetchTags");
        }
    }
</script>

<style lang="scss" scoped>
    .tags{
        flex-grow: 1;
        font-size: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column-reverse;
        background: white;
        > .current{
            display: flex;
            flex-wrap: wrap;
            > li{
                $bg:#d9d9d9;
                background: $bg;
                height: 24px;
                border-radius: (24px/2);
                padding: 0 16px;
                margin-right: 12px;
                line-height: 24px;
                margin-top: 4px;
                &.select{
                    background: darken($bg,25%);
                    color: white;
                }
            }
        }
        > .new {
            padding-top: 16px;
            button{
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }
    }
</style>