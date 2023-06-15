<template>
    <view>
        <u-checkbox-group class="checkbox-wrapper" max="isMax" :disabled="isDisabled">
			<u-checkbox 
                class="mt-4 ml-2 checkbox-item"
                :customStyle="{marginBottom: '8px'}"
                v-for="(item, index) in cellChoice"
                :key="index"
                :label="item"
                :name="item.name"
                @change="radioChange"
                shape="square"
                
			>{{item.name}}</u-checkbox>
		</u-checkbox-group>   
    </view>
</template>

<script>

export default{
    data(){
        return{
            isMax:1
        }
    },
    methods:{
        radioChange(){

        }
    },
    props:{
        cellChoice: Array,
        isDisabled:Boolean,
    }
}
</script>
<style>
    .checkbox-wrapper {
        display: flex;
        flex-wrap: wrap;
}

    .checkbox-item {
        flex-basis: calc(100% / 1); /* 每行显示 4 个选项 */
}
</style>
