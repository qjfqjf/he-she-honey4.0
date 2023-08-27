<template>
	<view>
		<z-nav-bar title="健康咨询">
			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>
			<!--            <u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>-->
		</z-nav-bar>
		<view>
			<advisory :tab-list="tabList"/>
		</view>
	</view>
</template>

<script>
  import advisory from "../componment/advisory";
  import Advisory from "../componment/advisory.vue";
	export default {
		components: {Advisory},
    data() {
      return {
        tabList: [{name:"找康复师"}, {name:'找机构'}]
      };
    }
  }
</script>

<style lang="scss">

</style>
