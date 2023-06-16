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
                    <view v-for="(list,index) in lists" :key="index">
                        <view class="">{{ list.questions }}</view>
                        <doc-choice :cell-choice="list.options" :isDisabled="disabled[index]"/>
                        <u-checkbox-group @change="changeDisabled(index)">
                            <u-checkbox v-show="index==0 || index==2 || index==3" 
                                    @change="show=true" 
                                    class="mt-4 ml-2 checkbox-item"
                                    :customStyle="{marginBottom: '8px'}"
                                    label="其他"
                                    ></u-checkbox>
                            <u-checkbox v-show="index!=0 && index!=2 && index!=3"
                                        class="mt-4 ml-2 checkbox-item"
                                        :customStyle="{marginBottom: '8px'}"
                                        label="无"
                                        ></u-checkbox>
                            </u-checkbox-group>   
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <view>
            <u-popup :round="10" mode="center" :show="show" @close="close" @open="open">
                <view class="m-5">
                    <text>答案</text>
                    <input type="text" placeholder="其他" style="border:none;border-bottom: 1px solid #ccc;">
                </view>
                <u-button @click="close" class="rounded-20" style="overflow: hidden" type="primary"  text="关闭"></u-button>
            </u-popup>
        </view>
        <u-button @click="" type="primary" text="提交"></u-button>
    </view>
</template>
<script>
import DocList from "../components/docList";
import DocChoice from "../components/docChoice";
import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";

export default {
    data() {
        return {
            disabled:[false,false,false,false,false,false,false,false],
            show : false,
            lists: [

                {
                    questions: "您是否患有以下疾病【可多选】",
                    options: ["高血压","冠心病","高脂血症","糖尿病","脑血管疾病","慢性胃炎","胃溃疡","支气管哮喘","慢性阻塞性肺疾病","骨质疏松症","青光眼","白内障"],
                    value:[]
                },

                {
                    questions: "您是否患有以下妇科疾病【可多选】",
                    options: ["念珠菌性(霉菌性)阴道炎","滴虫性阴道炎","细菌性阴道炎","老年性阴道炎","大肠杆菌宫颈炎","金黄色葡萄球菌宫颈炎","白色念珠菌宫颈炎"],
                    value:[]
                },
                {
                    questions: "HPV阳性、类型",
                    options: ["高危型：HPV16、18、31、33、35、39、45、51、52、56、58、59、68","中危型：HPV26、53、66、73、82","低危型：HPV6、11、40、42、43、44、54、61、70、72、81、89",],
                    value:[]
                },
                {
                    questions: "你是否服用过药物【可多选】",
                    options: ["抗高血压药","降脂药","降糖药","抗血小板药",],
                    value:[]
                },
                {
                    questions: "您的家人是否患有高血压【可多选】",
                    options: ["祖父/外祖父","祖母/外祖母","父亲","母亲","兄弟/姐妹",],
                    value:[]
                },
                {
                    questions: "您的家人是否患有糖尿病【可多选】",
                    options: ["祖父/外祖父","祖母/外祖母","父亲","母亲","兄弟/姐妹",],
                    value:[]
                },
                {
                    questions: "您的家人是否患有冠心病【可多选】",
                    options: ["祖父/外祖父","祖母/外祖母","父亲","母亲","兄弟/姐妹",],
                    value:[]
                },
                {
                    questions: "您的家人是否患有脑卒中【可多选】",
                    options: ["祖父/外祖父","祖母/外祖母","父亲","母亲","兄弟/姐妹",],
                    value:[]
                },
            ],
        }
    },
    methods: {
        changeDisabled(index){
            this.disabled.splice(index, 1, !this.disabled[index]);
            console.log(this.disabled);
        },
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
<style>
    
</style>
