<template>
	<view style="background-color: #ffffff;">
		<z-nav-bar title="评价详情">
			<view class="preview" slot="right" @click="addComment(did)">
				<text style="font-size: 20rpx;" v-if="addtext">{{ addtext }}</text>
			</view>
		</z-nav-bar>
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="album" v-for="(item, index) in commentList">
					<view class="album__avatar">
						<image
							:src="item.headurl"
							mode=""
							style="width: 32px;height: 32px; "
						></image>
					</view>
					<view class="album__content">
						<u--text
							:text="item.fullname"
							bold
							size="17"
						></u--text>
						
						<view :style="{
							marginBottom: '8px',
							width: albumWidth + 'px'
						}">					
							<u--text
								:text="item.content"
								:customStyle="{
									width: albumWidth + 'px'
								}"
							></u--text>
						</view>
						<u-album
							:urls="item.urls"
							@albumWidth="width => albumWidth = width"
							multipleSize="68"
						></u-album>
						<u-gap
							height="5"
						></u-gap>
						<u-rate active-color="#26c2a2" inactive-color="#b2b2b2" :count="count" v-model="item.level" readonly></u-rate>
						<u-gap
							height="5"
						></u-gap>
						<u--text :text="datetime"></u--text>
					</view>
				</view>
			</view>
		</view>
		<!-- <z-navigation></z-navigation> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addtext:'添加评价',
				count: 5,
				value: 2,
				albumWidth: 200,
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
				commentList:[],
				did:" ",
			}
		},
		onLoad: function (option) {
			console.log(option.did); 
			this.did = option.did;
			console.log('did',this.did);
			this.getComment();
		},
		methods: {
			getComment(){
				this.$http.post('/rating/info',{
					did:this.did
				}).then((res)=>{
					console.log('res',res);
					// this.commentList = res.data.data
					res.data.data.forEach((element,index) => {
						this.commentList.push(element)
						if(this.commentList[index].urls)	this.commentList[index].urls = element.imgurl.split(',');
						
					});
				})
			},
			addComment(e){
				uni.navigateTo({
			    	url:'/pages/mine/addComment?did=' + e
			  })
			}
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
