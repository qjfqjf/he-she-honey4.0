<template>
	<view class="container">
		<z-nav-bar title="预警规则"></z-nav-bar>
		<public-module></public-module>
		<view class="sugar-rule">
			<b>血糖预警规则</b>
			<view class="sugar-context">
				<br>
				正常人血糖的正常范围:
				空腹血糖:3.9--6.1mmoL/L,餐后2小时血糖: <<7.8 <br><br>
					超出这个范围后，系统将给出预警
			</view>
			<view class="sugar-warning-rule">
				<br>
				| 预警规则:
				<view class="sugar-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th  class="table-body" rowspan="2" width="40" height="150" align="center">代谢分类</uni-th>
							<uni-th  class="table-body" colspan="2" width="80" height="100" align="center">世界卫生组织标准（mmol/L）</uni-th>
							<!-- <uni-th  class="table-body" width="80" height="100" align="center">世界卫生组织标准（mmol/L）</uni-th> -->
							<uni-th  class="table-body" rowspan="2" width="40" height="150" align="center">预警规则</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<!-- <uni-th class="table-body" width="40" height="150" align="center">代谢分类</uni-th> -->
							<uni-th class="table-body" width="40" height="100" align="center">空腹血糖</uni-th>
							<uni-th class="table-body" width="40" height="100" align="center">餐后2小时血糖</uni-th>
							<!-- <uni-th  class="table-body" width="40" height="150" align="center">预警规则</uni-th> -->
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">正常血糖（NGR)</uni-td>
							<uni-td class="table-body" align="center">3.9-6.1</uni-td>
							<uni-td class="table-body" align="center"><=7.8</uni-td>
							<uni-td class="table-body" align="center">低血糖：3.9<红色预警</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">空腹血糖受损（IFG）</uni-td>
							<uni-td class="table-body" align="center">6.1-7.0</uni-td>
							<uni-td class="table-body" align="center">------</uni-td>
							<uni-td class="table-body" align="center">橙色预警</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">糖耐量减低（IGT）</uni-td>
							<uni-td class="table-body" align="center">------</uni-td>
							<uni-td class="table-body" align="center">7.8-11.1</uni-td>
							<uni-td class="table-body" align="center">橙色预警</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">空腹血糖受损（IFG）</uni-td>
							<uni-td class="table-body" align="center">>=7.0</uni-td>
							<uni-td class="table-body" align="center">>=11.1</uni-td>
							<uni-td class="table-body" align="center">红色预警</uni-td>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
			<view class="sugar-check-rule">
				| 血糖监测规则
				<view class="sugar-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">测血糖类型</uni-th>
							<uni-th class="table-body" width="200" height="50" align="center">操作说明</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td rowspan="3" width="40" class="table-body" align="center">
								随机血糖
							</uni-td>
							<uni-td class="table-body" height="50" align="center">
								测试时不选择血糖类型，默认为随机血糖
							</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" height="50" align="center">
								选择测试事件在早上9:00之后
							</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" height="50" align="center">
								选择早上空腹（八小时以上）测试时间在早上9：00之前
							</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">
								空腹血糖
							</uni-td>
							<uni-td class="table-body" align="center">
								选择早上空腹(八小时以上)测试时间在早上9:00之前
							</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">
								餐后两小时血糖
							</uni-td>
							<uni-td class="table-body" align="center">
								选择早餐后两小时，午餐后两小时，晚餐后两小时
							</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">
								餐前血糖
							</uni-td>
							<uni-td class="table-body" align="center">
								餐后两小时后，下一餐前
							</uni-td>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-td class="table-body" align="center">
								睡前血糖
							</uni-td>
							<uni-td class="table-body" align="center">
								睡前测试血糖
							</uni-td>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
		</view>
		<view class="bloodPressure-rule">
			<b>血压预警规则</b>
			<view class="bloodPressure-context">
				<br>
				血压的正常范围：静止状态下，正常人的血压：90<收缩压<140 mmHg,60<舒张压<90 mmHg,心率60-100次/分超出这个范围后,系统将给出预警 
			</view>
			<view class="bloodPressure-warning-rule">
				<br>
				| 预警规则:
				<view class="bloodPressure-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">测血压类型</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">舒张压/收缩压mmHg</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">橙色预警</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">红色预警</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">理想血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">80/120</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">正常血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">80-85/120-130</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">正常偏高血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">86-90/131-140</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">轻度高血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">91-100/141-160</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">中度高血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">101-110/161-180</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">重度高血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">111+/180+</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">低血压</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">舒张压<60,收缩压<90,</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">------</uni-th>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
		</view>
		<view class="bloodSUA-rule">
			<b>血尿酸预警规则</b>
			<view class="bloodSUA-context">
				<br>
				正常人血糖的正常范围:
				<br><br>
				静止状态下，正常人的血尿酸：男208-428umol/L，女155-357umol/L
				<br><br>
				超出这个范围后，系统将给出预警
			</view>
			<view class="bloodSUA-warning-rule">
				<br>
				| 预警规则:
				<view class="bloodSUA-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center"></uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">正常值</uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">橙色预警</uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">红色预警</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">血尿酸（男）</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">208-428umol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">428<或<208umol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">480-umol/L</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">血尿酸（女）</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">155-357umol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">357<或<155umol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">420-umol/L</uni-th>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
		</view>
		<view class="bloodOximeter-rate-rule">
			<b>血氧、心率的预警规则</b>
			<view class="bloodOximeter-context">
				<br>
				连续血氧、心率的正常范围：静止状态下，正常人的血氧值SPO2：90%-99%，正常人的心率：60-120次/分，超出这个范围后，系统将给出预警
				<br><br>
				超出这个范围后，系统将给出预警
			</view>
			<view class="bloodOximeter-warning-rule">
				<br>
				| 预警规则:
				<view class="bloodOximeter-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center"></uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">正常值</uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">橙色预警</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">血氧值</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">90%-99%</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center"><90%</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">心率</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">60-120次/分</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">120>心率或<60次/分</uni-th>
						</uni-tr>
					</uni-table>
					<br><br><br>
				</view>
			</view>
		</view>
		<view class="bloodFat-rule">
			<b>血脂四项的预警规则</b>
			<view class="bloodFat-context">
				<br>
				血脂四项的正常范围：
				<br><br>
				血脂一般参考值：总胆固醇2.8-5.·7mmol/L;甘油三醇0.56-1.7mmol/L;
				<br><br>
				低密度脂蛋白0-2.6mmol/L;
				<br><br>
				男性-高密度脂蛋白0.96-1.15mmol/L;女性-高密度脂蛋白0.90-1.55mmol/L
			</view>
			<view class="bloodFat-warning-rule">
				<view class="bloodFat-grid">
					<br>
					<uni-table class="table" border stripe>
						<!-- 表头行 -->
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">血脂四项参考</uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">合适水平</uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">橙色预警</uni-th>
							<uni-th class="table-body" width="80" height="50" align="center">红色预警</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">总胆固醇（TC）</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center"><5.2mmo/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">>=5.2-<6.2mmo/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">>=6.2mmol/L</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">甘油三酯（TG）</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center"><1.7mmol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">>=1.7-<2.3mmol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">>=2.3mmol/L</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">低密度脂蛋白（LDL-C）</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center"><3.4mmol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">>=3.4-<4.1mmol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">>=4.1mmol/L</uni-th>
						</uni-tr>
						<uni-tr class="table-header" align="center">
							<uni-th class="table-body" width="40" height="50" align="center">高密度脂蛋白（HDL-C）</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center">男:40岁0.9-1.83mmol/L 女:40岁1.1-2.0mmol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center"><0.9mmol/L</uni-th>
							<uni-th class="table-body" width="100" height="50" align="center"></uni-th>
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
					.table{
						border-color: black;
						.table-header{
							.table-body{
								border-color:black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
			.sugar-check-rule{
				.sugar-grid {
					.table{
						border-color: black;
						.table-header{
							.table-body{
								border-color:black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
			
		}
		.bloodPressure-rule{
			.bloodPressure-warning-rule{
				.bloodPressure-grid{
					.table{
						border-color: black;
						.table-header{
							.table-body{
								border-color:black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}
		.bloodSUA-rule{
			.bloodSUA-warning-rule{
				.bloodSUA-grid{
					.table{
						border-color: black;
						.table-header{
							.table-body{
								border-color:black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}
		.bloodOximeter-rate-rule{
			.bloodOximeter-warning-rule{
				.bloodOximeter-grid{
					.table{
						border-color: black;
						.table-header{
							.table-body{
								border-color:black;
								font-weight: bold;
								font-size: 31rpx;
								color: black;
							}
						}
					}
				}
			}
		}
		.bloodFat-rule{
			.bloodFat-warning-rule{
				.bloodFat-grid{
					.table{
						border-color: black;
						.table-header{
							.table-body{
								border-color:black;
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