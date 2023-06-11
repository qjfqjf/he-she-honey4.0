<template>
    <view>
        <view class="uni-form-item uni-column d-flex a-center " v-for="info in cellList">
            <view class="m-2 font-md" style="width: 30%">{{ info }}</view>
            <u--text class="uni-input font-md" maxlength="10" type="primary" :text='dataListText'></u--text>
        </view>
    </view>
</template>

<script>

export default{
    data(){
        return{

        }
    },
    methods:{

    },
    props:{
        cellList: Array,
        dataListText:Array,
    }
}
</script>
