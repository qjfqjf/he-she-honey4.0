<template>
  <view class="content">
    <z-nav-bar title="助残服务"></z-nav-bar>
    <public-module></public-module>
    <view class="body">
      <view>
        <text>张家口地区</text>
        <u-collapse @change="addSportsRecord">
          <u-collapse-item title="助残服务服务机构" name="Docs guide">
            <view class="view">
              <a>1</a>
              <a>2</a>
              <a>3</a>
            </view>
          </u-collapse-item>
          <u-collapse-item title="精神康复机构" name="Docs guide">
            <view class="view">
              <text>1</text>
              <text>2</text>
              <text>3</text>
            </view>
          </u-collapse-item>
          <u-collapse-item title="公益组织" name="Docs guide">
            <view class="view">
              <text>1</text>
              <text>2</text>
              <text>3</text>
            </view>
          </u-collapse-item>
          <u-collapse-item title="志愿者团队" name="Docs guide">
            <view class="view">
              <text>1</text>
              <text>2</text>
              <text>3</text>
            </view>
          </u-collapse-item>
        </u-collapse>
      </view>
      <view class="image">
        <img src="/static/img/service/Zhangjiakou Map.png">
      </view>
    </view>

  </view>
</template>
  
<script>
export default {
  components: {

  },
  data() {
    return {
    };
  },
  //方法
  methods: {
    addSportsRecord() {
      console.log(123);
    },
  },
}
</script>
  
<style lang="scss">
.content {
  background-color: #FFFFFF;
  height: 100%;

}
.body {
    padding: 30px;
}
.view {
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.image {
  height: 481px;
  width: 367px;
}
</style>