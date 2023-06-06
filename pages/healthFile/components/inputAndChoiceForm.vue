<template>
    <view>
        <view class="uni-form-item uni-column" v-for="info in cell">
            <view class="m-2 font-md font-weight">{{info.question}}</view>
            <input class="uni-input font-md" maxlength="10" :placeholder="info.subTitle"/>
            <doc-choice class="mt-4" :cell-choice="info.choice"></doc-choice>
        </view>
    </view>
</template>

<script>
import docChoice from "./docChoice.vue";
export default{
    data(){
        return{

        }
    },
    methods:{

    },
    components:{
      docChoice
    },
    props:{
        cell: Array
    }
}
</script>
