<template>
	<view class="d-flex j-center" :style="{'--color': color}">
		<view class="my-circle">
			<view class="outer-circle">
				<view class="inner-circle">
					<view class="value">{{value}}</view>
					<view class="unit">{{unit}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default: 0
			},
			unit: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#20c59d'
			}
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	$bg-color: var(--color, #20c59d);

	.my-circle {
		position: relative;
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
		background-color: $bg-color;
	}

	.outer-circle {
		position: absolute;
		top: 20%;
		left: 20%;
		transform: translate(-7.5%, -7.5%);
		width: 70%;
		height: 70%;
		border-radius: 50%;
		border: 10px solid #bce8de;
	}

	.inner-circle {
		position: absolute;
		top: 25%;
		left: 25%;
		width: 50%;
		height: 50%;
		border-radius: 50%;
		background-color: $bg-color;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.value {
			font-size: 28px;
			font-weight: 700;
			color: white;
		}

		.unit {
			font-size: 18px;
			color: white;
			margin-top: 5px;
		}
	}
</style>
