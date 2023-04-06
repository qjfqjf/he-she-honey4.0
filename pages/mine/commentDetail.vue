<template>
	<view style="background-color: #ffffff;">
		<z-nav-bar title="评价详情"></z-nav-bar>
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="album">
					<view class="album__avatar">
						<image
							src="https://chris-project.oss-cn-guangzhou.aliyuncs.com/coding/images/2022-12-01/6d992bd9-9bae-440c-b616-0ce3cd8705a0.jpg"
							mode=""
							style="width: 32px;height: 32px; "
						></image>
					</view>
					<view class="album__content">
						<u--text
							text="Chris"
							bold
							size="17"
						></u--text>
						
						<view :style="{
							marginBottom: '8px',
							width: albumWidth + 'px'
						}">					
							<u--text
								text="张老师的服务太好了,和他聊天非常开心"
								:customStyle="{
									width: albumWidth + 'px'
								}"
							></u--text>
						</view>
						<u-album
							:urls="urls2"
							@albumWidth="width => albumWidth = width"
							multipleSize="68"
						></u-album>
						<u-gap
							height="5"
						></u-gap>
						<u-rate active-color="#26c2a2" inactive-color="#b2b2b2" :count="count" v-model="value" readonly></u-rate>
						<u-gap
							height="5"
						></u-gap>
						<u--text :text="datetime"></u--text>
					</view>
				</view>
			</view>
		</view>
		<z-navigation></z-navigation>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5,
				value: 2,
				albumWidth: 0,
				datetime: '2023-02-02 20:20',
				urls2: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.album {
        @include flex;
        align-items: flex-start;

        &__avatar {
             background-color: #fff;
             padding: 5px;
             border-radius: 3px;
         }
    
        &__content {
             margin-left: 10px;
             flex: 1;
         }
    }
</style>
