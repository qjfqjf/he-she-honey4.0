<template>
    <view>
        <u-radio-group max="1">
			<u-radio 
                class="mt-4 ml-2"
                :customStyle="{marginBottom: '8px'}"
                v-for="(item, index) in cellChoice"
                :key="index"
                :name="item.name"
                @change="radioChange"
                shape="square"
			>{{item.name}}</u-radio>
		</u-radio-group>   
    </view>
</template>

<script>

export default{
    data(){
        return{

        }
    },
    methods:{
        radioChange(){

        }
    },
    props:{
        cellChoice: Array,
    }
}
</script>