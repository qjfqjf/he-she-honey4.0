<template>

	<view>
		<z-nav-bar></z-nav-bar>
		<view class="">
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>
			<view>
				<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
					:show="show"></u-action-sheet>
				<u-button @click="show = true">打开ActionSheet</u-button>
			</view>



		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: '标题',
				list: [{
						name: '选项一'
					},
					{
						name: '选项二'
					}
				],
				show: false
			}
		}
	}
</script>