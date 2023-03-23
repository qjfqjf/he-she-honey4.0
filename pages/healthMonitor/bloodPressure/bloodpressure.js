const measureResult = {
	pressure: 0, //动态血压
	SYS: 0, // 收缩压值
	DIA: 0, // 舒张压值
	PUL: 0 // 脉搏值
}

let lastReceivedData = null;
let findStart = false
let startData = null
let endData = null
let endData2 = null
let mergedArr = null
export function handleJKBPData(buffer, hexArr) {
	console.log(buffer, hexArr)
	const data = new Int8Array(buffer);
	//处理动态血压
	if (data.length === 6 && data[0] === -2 && data[1] === -124 && data[5] === 4) {
		const dataString = hexArr.join('')
		// console.log(dataString)
		if (lastReceivedData !== dataString) {
			// result.value = (data[2] * 256) + (data[3] & 0xff)
			// console.log('动态压力值' + result.value)
			measureResult.pressure = parseInt(hexArr.join('').slice(4, 8), 16)
			lastReceivedData = dataString;
		}
	}
	// 处理最后结果
	// if (data.includes(-1)) {
	// 	startData = data.slice(data.findIndex(num => num === -1))
	// 	findStart = true
	// } else if (findStart && !data.includes(-2)) {
	// 	endData = data
	// } else if (findStart && data.includes(-2)) {
	// 	endData2 = data.slice(0, data.findIndex(num => num === -2) + 1)
	// 	findStart = false
	// 	mergedArr = new Int8Array(startData.length + endData.length + endData2.length);
	// 	mergedArr.set(startData);
	// 	mergedArr.set(endData, arr1.length);
	// 	mergedArr.set(endData2, arr1.length + arr2.length);
	// 	measureResult.SYS = mergedArr[10] & 0xff
	// 	measureResult.DIA = mergedArr[11] & 0xff
	// 	measureResult.PUL = mergedArr[12] & 0xff
	// } else {
	// 	// const mergedArr = new Int8Array(startData.length + endData.length + endData2.length);
	// 	// mergedArr.set(startData);
	// 	// mergedArr.set(endData, arr1.length);
	// 	// mergedArr.set(endData2, arr1.length + arr2.length);
	// 	// console.log(mergedArr)
	// 	console.log(startData, endData, endData2)
	// }
	console.log(measureResult)

	return measureResult

}
