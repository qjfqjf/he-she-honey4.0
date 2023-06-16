<template>
	<view class="container">
		<z-nav-bar title="预警规则"></z-nav-bar>
		<public-module></public-module>
		<view class="sugar-rule">
			<b>正常人血糖的正常范围:</b>
			<view class="sugar-context">
				<br>
				空腹血糖:3.9--6.2mmoL/L
				<br><br>
				餐后一小时:7.8--9.0mmoL/L
				<br><br>
				餐后一小时:3.9--7.8mmoL/L
				<br><br><br>
			</view>
			<view class="sugar-warning-rule">
				<br>
				超出这个范围后,系统将给出预警
				<view class="sugar-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="100" align="center"></uni-th>
							<uni-th class="table-body" width="130" height="100" align="center">橙色预警（较低级别异常）</uni-th>
							<uni-th class="table-body" width="200" height="100" align="center">红色预警（高级别预警）</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" height="80" align="center">血糖</uni-td>
							<uni-td class="table-body" align="center" height="80">7.0<空腹血糖<16.7 </uni-td>
							<uni-td class="table-body" align="center" height="80">空腹血糖<3.9或空腹血糖>16.7(空腹血糖>16.7应禁忌运动) </uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" height="80" align="center">血糖</uni-td>
							<uni-td class="table-body" align="center" height="80">11.0<非空腹<16.7 </uni-td>
							<uni-td class="table-body" align="center" height="80">非空腹血糖<3.9或非空腹>16.7(>16.7出现酮症的风险增加) </uni-td>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
			<view class="sugar-check-rule">
				血糖监测显示规则
				<view class="sugar-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="60" height="100" align="center">血糖类型</uni-th>
							<uni-th class="table-body" width="250" height="100" align="center">数据规则及操作说明</uni-th>
							<uni-th class="table-body" width="60" height="100" align="center">备注</uni-th>
						</uni-tr>

						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">随机</uni-td>
							<uni-td class="table-body" height="50" align="center">测试时不选择血糖类型，默认为随机血糖</uni-td>
							<uni-th class="table-body" width="40" height="50" align="center"></uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">随机</uni-td>
							<uni-td class="table-body" height="50" align="center">选择空腹，但上传时间在早上9:00之后</uni-td>
							<uni-td width="40" class="table-body" align="center"></uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">随机</uni-td>
							<uni-td class="table-body" height="50" align="center">选择餐后2h，上传时间在0:00 - 9:00</uni-td>
							<uni-td width="40" class="table-body" align="center"></uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">空腹</uni-td>
							<uni-td class="table-body" height="50" align="center">远择空腹，且数据上传时间在早上9:00之前</uni-td>
							<uni-td width="40" class="table-body" align="center"></uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">餐后2小时</uni-td>
							<uni-td class="table-body" height="50" align="center">选择餐后2h，且上传时间在中午12:00之前</uni-td>
							<uni-td width="40" class="table-body" align="center">早餐后2小时</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">餐后2小时</uni-td>
							<uni-td class="table-body" height="50" align="center">还择餐后2h，且上传时问在12:00-18:00之问</uni-td>
							<uni-td width="40" class="table-body" align="center">午餐后2小时</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td width="40" class="table-body" align="center">餐后2小时</uni-td>
							<uni-td class="table-body" height="50" align="center">选择餐后2h，且上传时间在18:00-24:00之间</uni-td>
							<uni-td width="40" class="table-body" align="center">晚餐后2小时</uni-td>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
		</view>
		<view class="bloodPressure-rule">
			<b>血压的正常范围：</b>
			<view class="bloodPressure-context">
				<br>
				静止状态下，正常人的血压：90<收缩压<135 mmHg,60<舒张压<85 mmHg,心率60-100次/分超出这个范围后,系统将给出预警 </view>
					<view class="bloodPressure-warning-rule">
						<br>
						<view class="bloodPressure-grid">
							<br>
							<uni-table class="table" border stripe>
								<!-- 表头行 -->
								<uni-tr class="table-header" align="center">
									<uni-th class="table-body" width="40" height="50" align="center"></uni-th>
									<uni-th class="table-body" width="100" height="50" align="center">橙色预警(较低级别异常)</uni-th>
									<uni-th class="table-body" width="100" height="50" align="center">红色预警(高级别预警)</uni-th>
								</uni-tr>
								<uni-tr class="table-header" align="center">
									<uni-th class="table-body" width="40" height="50" align="center">血压</uni-th>
									<uni-th class="table-body" width="100" height="50" align="center">140<=收缩压<=160;和/或90<=舒张压<100;和/或100<=心率<=	120</uni-th>
									<uni-th class="table-body" width="100" height="50" align="center">160<收缩压或<90;和/或100<舒张压或<60;和/或120<心率或<60</uni-th>
								</uni-tr>
							</uni-table>
							<br><br><br>
						</view>
					</view>
			</view>
			<view class="bloodSUA-rule">
				<b>正常人血尿酸的正常范围:</b>
				<view class="bloodSUA-context">
					<br><br>
					静止状态下，正常人的血尿酸：男208-428umol/L，女155-357umol/L
					超出这个范围后，系统将给出橙色预警
				</view>
				<view class="bloodSUA-warning-rule">
					<br>
					<view class="bloodSUA-grid">
						<br>
						<uni-table class="table" border stripe>
							<!-- 表头行 -->
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center"></uni-th>
								<uni-th class="table-body" width="100" height="50" align="center">橙色预警(男)</uni-th>
								<uni-th class="table-body" width="100" height="50" align="center">红色预警(女)</uni-th>
							</uni-tr>
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">血尿酸</uni-th>
								<uni-th class="table-body" width="100" height="50" align="center">428<血尿酸或<208</uni-th>
								<uni-th class="table-body" width="100" height="50" align="center">357<血尿酸或<155</uni-th>
							</uni-tr>
						</uni-table>
						<br><br><br>
					</view>
				</view>
			</view>
			<view class="bloodOximeter-rate-rule">
				<b>连续血氧、心率的正常范围：</b>
				<view class="bloodOximeter-context">
					<br>
					静止状态下，正常人的血氧值SPO2：90%-99%，正常人的心率：60-120次/分，超出这个范围后，系统将给出预警
					<br><br>
					超出这个范围后，系统将给出预警
				</view>
				<view class="bloodOximeter-warning-rule">
					<br>
					<view class="bloodOximeter-grid">
						<br>
						<uni-table class="table" border stripe>
							<!-- 表头行 -->
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center"></uni-th>
								<uni-th class="table-body" width="100" height="50" align="center">橙色预警</uni-th>
							</uni-tr>
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">血氧、心率</uni-th>
								<uni-th class="table-body" width="100" height="50" align="center">120<心率或<60,或血氧<90</uni-th>
							</uni-tr>
						</uni-table>
						<br><br><br>
					</view>
				</view>
			</view>
			<view class="bloodFat-rule">
				<b>血脂四项的正常范围：</b>
				<view class="bloodFat-context">
					<br><br>
					血脂一般参考值：总胆固醇2.8-5.·7mmol/L;甘油三醇0.56-1.7mmol/L;
					低密度脂蛋白0-2.6mmol/L;
					男性-高密度脂蛋白0.96-1.15mmol/L;女性-高密度脂蛋白0.90-1.55mmol/L
					<br><br>
				</view>
				<view class="bloodFat-warning-rule">
					<view class="bloodFat-grid">
						<br>
						<uni-table class="table" border stripe>
							<!-- 表头行 -->
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">血脂四项参考值</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">合适水平</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">临界范围</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">升高（橙色）</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">手动录入范围</uni-th>
							</uni-tr>
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">总胆固醇</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">小于5.2mmo/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">5.2-6.2mmo/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">大于等于5.2mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">2.5-10.4mmol/L</uni-th>
							</uni-tr>
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">甘油三酯</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">小于1.7mmol /L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">1.7-2.3mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">大于等于1.7mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">0.5-5.7mmol/L</uni-th>
							</uni-tr>
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">低密度脂蛋白</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">小于3.4mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">3.4-4.1mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">大于等于3.4mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">0.1-12.0mmol/L</uni-th>
							</uni-tr>
							<uni-tr class="table-header" align="center">
								<uni-th class="table-body" width="40" height="50" align="center">高密度脂蛋白</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">大于0.9mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center"></uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">小于等于0.9mmol/L</uni-th>
								<uni-th class="table-body" width="80" height="50" align="center">0.4-3.8mmol/L</uni-th>
							</uni-tr>
						</uni-table>
						<br><br><br>
					</view>
				</view>
			</view>

		</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 30rpx 25rpx;

		.sugar-rule {
			.sugar-warning-rule {
				.sugar-grid {
					.table {
						border-color: black;

						.table-header {
							.table-body {
								border-color: black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}

			.sugar-check-rule {
				.sugar-grid {
					.table {
						border-color: black;

						.table-header {
							.table-body {
								border-color: black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}

		}

		.bloodPressure-rule {
			.bloodPressure-warning-rule {
				.bloodPressure-grid {
					.table {
						border-color: black;

						.table-header {
							.table-body {
								border-color: black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}

		.bloodSUA-rule {
			.bloodSUA-warning-rule {
				.bloodSUA-grid {
					.table {
						border-color: black;

						.table-header {
							.table-body {
								border-color: black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}

		.bloodOximeter-rate-rule {
			.bloodOximeter-warning-rule {
				.bloodOximeter-grid {
					.table {
						border-color: black;

						.table-header {
							.table-body {
								border-color: black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}

		.bloodFat-rule {
			.bloodFat-warning-rule {
				.bloodFat-grid {
					.table {
						border-color: black;

						.table-header {
							.table-body {
								border-color: black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}
	}
</style>