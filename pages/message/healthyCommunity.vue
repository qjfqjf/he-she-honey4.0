<template>
    <view class="d-flex flex-column bg-white">
        <z-nav-bar title="健康圈">
			<u-icon @click="goBack" class="ml-2" name="arrow-left" slot="left" color="#000000" size="24"></u-icon>
			<u-icon class="mr-2" @click="goAddFriend" name="plus" slot="right" color="#000000" size="24"></u-icon>
		</z-nav-bar>
        <view>
            <u-index-list :index-list="indexList">
                <template v-for="(item, i) in newArr">
                    <!-- #ifdef APP-NVUE -->
                    <!--					<u-index-anchor :text="indexList[index]"></u-index-anchor>-->
                    <!-- #endif -->
                    <u-index-item>
						<u-index-anchor v-show="item.length>0" style="" :text="indexList[i]"></u-index-anchor>
						<view class="list-cell" v-for="(cell, index) in item" :key="index">
							<view class="d-flex j-center a-center my-1">
								<u--image shape="circle" :showLoading="true" :src="avatar" width="40px"
									height="40px"></u--image>
								<span class="list-cell">{{ cell }}</span>
							</view>
						</view>
					</u-index-item>
                </template>
            </u-index-list>
        </view>
    </view>
</template>

<script>
import IndexList from './indexList.vue'
import {
		pinyin
	} from '@/utils/pinyin.js'
export default {
    data() {
        return {
            searchWords: "",
            indexList: [
					'A',
					'B',
					'C',
					'D',
					'E',
					'F',
					'G',
					'H',
					'I',
					'J',
					'K',
					'L',
					'M',
					'N',
					'O',
					'P',
					'Q',
					'R',
					'S',
					'T',
					'U',
					'V',
					'W',
					'X',
					'Y',
					'Z',
					'#',
				],
            avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
            itemArr: [
                []
            ],
            hairline: false,
            userInfo:'',
            newArr:[]
        }
    },
    async onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			await this.getFriend()
            
	},
    watch: {
			// 监听itemArr的变化
			itemArr: {
				handler: function(val, oldVal) {},
				deep: true,
			},
		},
    methods: {
        tabChange() {
				this.newArr = this.itemArr.filter(item => !!item);
                console.log('newArr', this.newArr);
                console.log('this.itemArr', this.itemArr);
			},
        chineseToInitials(word) {
				let SX = ''
				for (var i = 0; i < word.length; i++) {
					var c = word.charAt(i)
					if (/^[A-Z]+$/.test(c)) {
						SX += c
					}
				}
				console.log(SX)
				return SX
			},
        ucfirst(l1) {
				if (l1.length > 0) {
					var first = l1.substr(0, 1).toUpperCase()
					var spare = l1.substr(1, l1.length)
					return first + spare
				}
			},
        arraySearch(l1, l2) {
				for (var name in pinyin) {
					if (pinyin[name].indexOf(l1) !== -1) {
						return this.ucfirst(name)
					}
				}
				return false
			},
        chineseToPinYin(l1) {
				var l2 = l1.length
				var I1 = ''
				var reg = new RegExp('[a-zA-Z0-9]')
				for (var i = 0; i < l2; i++) {
					var val = l1.substr(i, 1)
					var name = this.arraySearch(val, pinyin)
					if (reg.test(val)) {
						I1 += val
					} else if (name !== false) {
						I1 += name
					}
				}
				I1 = I1.replace(/ /g, '-')
				while (I1.indexOf('--') > 0) {
					I1 = I1.replace('--', '-')
				}
				return I1
			},
        goBack(){
            uni.navigateBack({})
        },
		getFriend(){
			this.$http.post('/friend/index',{
            }).then((res)=>{
                console.log(res)
                // res.data.data.push({fullname:'法外狂徒'});
                const valList = res.data.data.map((item) => {
                const py = this.chineseToInitials(this.chineseToPinYin(item.fullname)).charAt(0);
                    return {
                        name: item.fullname,
                        img: item.headurl,
                        flag: py,
                    };
                });
                console.log('valList',valList);
                this.itemArr = this.indexList.map((val) => {
                    const temArr = valList
                        .filter((tem) => tem.flag === val)
                        .map((tem) => tem.name);
                    return temArr;
                });
                console.log('itemArr',this.itemArr);
                this.tabChange()
		    })
        },
        goAddFriend(){
            uni.navigateTo({
			    url:'/pages/message/addFriend'
			  })
        }
    },
    components: {
        IndexList
    }
}
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

.searchBar {

}

.buttonGrounp {
  .leftButton {
    border: 0px;
    width: 40%;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }

  .rightButton {
    border: 0px;
    width: 40%;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
}
</style>
