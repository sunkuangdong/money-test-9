<template>
    <Layout class-prefix="layout">
        <!--{{record}}-->
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
        <FormItem class="notes" field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
        <Tags/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator'
    import recordTypeList from "@/constants/recordTypeList"
    import Tabs from '@/components/Tabs.vue';
    @Component(
        {
            components: {Tabs, Tags, FormItem, NumberPad},
            // computed:{
            //     // computed监听一个函数内部的值,发生改变,函数就会发生改变
            //     recordList (){
            //         return this.$store.state.recordList;
            //     },
            // },
        }
    )
    export default class Money extends Vue{
        get recordList (){
            return this.$store.state.recordList;
        }

        recordTypeList = recordTypeList;
        record: RecordItem = {
            tags:[],notes:'',type:'-',amount:0
        };

        created(){
            this.$store.commit("fetchRecords")
        }

        onUpdateNotes(value: string){
            this.record.notes = value;
        }

        saveRecord(){
            this.$store.commit("createRecord",this.record);
        }
    }
</script>
<style lang="scss" scoped>
    ::v-deep .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 6px 0;
    }
</style>






