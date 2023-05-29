<template>
    <view>
        <view class="uni-form-item uni-column d-flex a-center " v-for="info in cellList">
            <view class="m-2 font-md" style="width: 30%">{{ info }}</view>
            <input class="uni-input font-md" maxlength="10" placeholder="请输入"/>
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
        cellList: Array
    }
}
</script>
