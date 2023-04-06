<template>
	<view>
		<z-nav-bar title="消息提醒"></z-nav-bar>
		<u-gap
			height="10"
		></u-gap>
		<u-cell-group>
			<u-cell size="large" class="message" title="新消息声音">
				<u-switch slot="value" activeColor="#5ac725" v-model="voice" size="28" ></u-switch> 
			</u-cell>
			<u-cell size="large" class="message" title="新消息震动">
				<u-switch slot="value" activeColor="#5ac725" v-model="vibration" size="28" ></u-switch> 
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				voice: false,
				vibration: false
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.message {
	background-color: #ffffff;
}
</style>
