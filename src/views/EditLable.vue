<template>
  <Layout>
    <div class="navBar">
      <Icon class="LeftIcon" name="left" @click.native="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
    </div>
    <div class="from-wrapper">
      <FormItem
        :value="currentTag.name"
        @update:value="update"
        field-name="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
@Component({
  components: { Button, FormItem },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("findTag", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    console.log(this.currentTag);
    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name });
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
    }
  }
  goBack() {
    this.$router.push({
      path: "/labels",
    });
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  .title {
  }
  .LeftIcon {
    width: 24px;
    height: 24px;
  }
  .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.from-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>