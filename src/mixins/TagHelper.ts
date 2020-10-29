import Vue from 'vue'
import Component from "vue-class-component"

@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt("请输入标签名");
        if (name !== null && !name) {
            return window.alert("不能为空");
        } else if (name === null) {
            return
        }
        this.$store.commit("createTag", name);
    }
}
export default TagHelper;