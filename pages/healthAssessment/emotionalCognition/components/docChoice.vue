<template>
    <view>
        <u-radio-group
                v-model="value"
                placement="column"
        >
            <u-radio
                class="mt-4 ml-2"
                :customStyle="{marginBottom: '8px'}"
                v-for="(item, index) in cellChoice"
                :key="index"
                :label="item"
                :name="item"
                @change="radioChange"
            >
            </u-radio>
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
        value: ""
    }
}
</script>
