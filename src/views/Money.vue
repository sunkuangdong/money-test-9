<template>
  <Layout class-prefix="layout">
    <!--{{record}}-->
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="createdAt">
      <FormItem
        class="notes notes-left"
        field-name="日期："
        placeholder="在这里输入日期"
        :value.sync="record.createdAt"
        type="date"
      />
      <FormItem
        class="notes notes-right"
        field-name="备注："
        placeholder="在这里输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="record.tags = $event" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: { Tabs, Tags, FormItem, NumberPad },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请选择一个标签!");
    }
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
  }
}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 6px 0;
}
.notes-left {
  border-right: 2px solid white;
}
.notes-right {
  border-left: 2px solid white;
}
.createdAt {
  display: flex;
}
</style>






