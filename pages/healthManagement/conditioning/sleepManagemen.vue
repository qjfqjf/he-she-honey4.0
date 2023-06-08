<template>
  <view>
    <z-nav-bar title="睡眠管理">

    </z-nav-bar>
    <public-module></public-module>


    <!-- 内容 -->
    <view class="container">
      <view class="nothing" v-if="baseList.length === 0">
			<!-- 健康管理组件 -->
			<empty-state :title="title" :tourl="tourl"></empty-state>
		  </view>
    </view>
  </view>
</template>

<script>
  import emptyState from '../../healthFile/outpatientArchives/components/emptyState.vue'
  export default {
    components: {
      emptyState
    },
    data() {
      return {
        baseList: []
      };
    },
    methods: {
      deleteReport(id) {
        console.log('删除', id)
      }
    }
  }
</script>

<style lang="scss">
  .container {
    background-color: #FFFFFF;
		height: 100%;
		.nothing{
			text-align: center;
			padding-top: 300rpx;
			width: 400rpx;
			margin: 0 auto;
		}
  }
</style>