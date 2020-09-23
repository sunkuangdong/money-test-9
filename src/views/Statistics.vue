<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Chart :options="polar" />
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>￥{{group.total}}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{tagString(item.tags)}}</span>
            <span class="note">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录!</div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";
// const ECharts: any = require("vue-echarts").default;
// import "echarts/lib/chart/line";

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((item) => item.name).join("，");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  // ECharts数据
  get polar() {
    const data = [];

    for (let i = 0; i <= 360; i++) {
      const t = (i / 180) * Math.PI;
      const r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }
    return {
      xAxis: {
        type: "category",
        data: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Mon",
          "Tue",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
          ],
          type: "line",
        },
      ],
      tooltip: { show: true },
    };
  }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
  created(): void {
    this.$store.commit("fetchRecords");
  }

  beautify(str: string) {
    const day = dayjs(str);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  type = "-";
  // interval="day";
  // intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>
<style lang="scss" scoped>
.echarts {
  max-width: 100%;
  max-height: 50vh;
}
.noResult {
  text-align: center;
  padding: 16px;
  font-size: 24px;
  font-family: cursive;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.note {
  margin-right: auto;
  margin-left: 10px;
  color: #999;
}
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>