<template>
    <view>
        <view class="uni-form-item uni-column d-flex a-center " v-for="info in cellList" >
            <view class="m-2 font-md" style="width: 30%">{{ info.name }}</view>
            <input type="text" class="uni-input font-md"  maxlength="10" placeholder="请输入" database="database" v-model="info.value" :disabled="disableInput"/>
        </view>
        <checkbox-group @change="change">
            <checkbox v-model="disableInput" check="false">不清楚</checkbox>
        </checkbox-group>
        
    </view>
</template>

<script>

export default{
    data(){
        return{
            // dataList:[],
        }
    },
    methods:{
        change(){
            this.disableInput = !this.disableInput;
        }
    },
    props:{
        cellList: Array,
        disableInput: Boolean,
    },
}
</script>
