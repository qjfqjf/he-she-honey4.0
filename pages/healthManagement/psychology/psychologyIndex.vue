<template>
    <view>
        <z-nav-bar title="咨询详情">
        </z-nav-bar>
        <public-module></public-module>

        <!-- 内容 -->
        <view class="container">
            <view class="item">
                <view class="public name">医生：{{ data.fullname }}</view>
                <view class="public date">时间：{{ data.time }}</view>
                <view class="public date">调适记录描述: {{ data.record }}</view>
                <view class="public date">心理建议描述: {{ data.propose }}</view>
                <view class="public date">自诉描述: {{ data.ppn }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            baseList: [
                // {
                //   name: '彭老师',
                //   content: '鹏辉你血压很高,明天到我这来复诊。',
                //   date: '2022-09-24 19:33:00',
                //   remarks: '一定记得'
                // }, {
                //   name: '平台管理员',
                //   content: '鹏辉你血压很高,明天到我这来复诊。',
                //   date: '2022-09-24 19:33:00',
                //   remarks: ''
                // }, {
                //   name: '李老师',
                //   content: '鹏辉你血压很高,明天到我这来复诊。',
                //   date: '2022-09-24 19:33:00',
                //   remarks: '一定记得'
                // },
            ],
            data: {},
            id:'',
        };
    },
    onLoad: function (option) {
        this.id = option.id;
        this.getDoctorAdvice()
    },
    methods: {
        getDoctorAdvice() {
            this.$http.post('/psy_consult/info', {
                id: this.id
            }).then((res) => {
                this.data = res.data
                // res.data.data.forEach(element => {
                //     const newData = {};
                //     newData.name = element.fullname;
                //     newData.content = element.recipel;
                //     newData.date = element.time;
                //     this.baseList.push(newData);
                // });
            })
        }
    }
}
</script>

<style lang="scss">
.container {
    .item {
        background-color: white;
        margin: 16rpx 0;
        padding: 30rpx;
        font-size: 30rpx;

        .public {
            margin: 14rpx;
        }
    }
}
</style>
