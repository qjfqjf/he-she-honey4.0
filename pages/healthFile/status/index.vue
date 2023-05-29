<template>
    <view class="h-100 d-flex j-sb flex-column">
        <z-nav-bar title="健康状况"></z-nav-bar>
        <!-- 公共组件-每个页面必须引入 -->
        <public-module></public-module>
        <view class="flex-1">
            <u-collapse
                @change="change"
                @close="close"
                @open="open"
            >
                <u-collapse-item
                    title="健康状况调查"
                    name="Docs guide"
                >
                    <view v-for="list in lists">
                        <view class="">{{ list.questions }}</view>
                        <doc-choice :cell-choice="list.options"/>
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <view>
            <u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
                <view class="m-5">
                    <text>请检查填写格式是否有误</text>
                </view>
                <u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
            </u-popup>
        </view>
        <u-button @click="show = true" type="primary" text="提交"></u-button>
    </view>
</template>
<script>
import DocList from "../componments/docList.vue";
import DocChoice from "../componments/docChoice.vue";
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";

export default {
    data() {
        return {
            show : false,
            lists: [

                {
                    questions: "您是否患有一下疾病【可多选】",
                    options: ["高血压","冠心病","高脂血症","糖尿病","脑血管疾病","慢性胃炎","胃溃疡","支气管哮喘","慢性阻塞性肺疾病","骨质疏松症","青光眼","白内障"]
                }

            ]
        }
    },
    methods: {
        open(e) {
            // console.log('open', e)
        },
        close(e) {
            this.show = false;
        },
        change(e) {
            // console.log('change', e)
        }
    },
    components:{
        UButton,
        DocList,
        DocChoice
    }
}
</script>
