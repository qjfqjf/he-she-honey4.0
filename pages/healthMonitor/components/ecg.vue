<template id="Ecg">
    <div ref="ecgContent" class="ecgContent" id="ecgContent" :style="{ width: width + 2 + 'px', height: height + 'px' }">
        <canvas ref="ecgCanvas" id="ecgCanvas" ></canvas>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            ecgList: [],
            canvas: null,
        }
    },
    props: {
        tip: {
            type: Boolean,
            default: () => {
                return true
            },
        },
        width: {
            type: Number,
            default: 240,
        },
        height: {
            type: Number,
            default: 750,
        },
        ecgData: {
            type: Array,
            default: () => {
                return []
            },
        },
        maxV: {
            type: Number,
            default: 500
        },
    },
    async mounted() {
        this.ecgList = this.ecgData
        this.init()
    },
    watch: {
        ecgData(val) {
            this.ecgList = val
            if (this.canvas) {
                this.$nextTick(() => {
                    this.draw()
                })
            }
        },
    },
    methods: {
        init() {
            if (!this.$refs.ecgCanvas) {
                console.log("无法获取到canvas元素");
                setTimeout(() => {
                    this.init()
                }, 50)
                return
            }
            this.$nextTick(() => {
                let canvas = (this.canvas = this.$refs.ecgCanvas.$el)
                canvas.width = Math.floor(this.width / 50) * 50 + 2
                canvas.height = this.height

                setTimeout(() => {
                    console.log(this.width, this.height)
                    this.draw()
                }, 100)
            })
        },
        draw() {
            console.log('drawing...');
            var canvas = this.canvas
            console.log(this.canvas);
            // console.log(canvas.getContext());
            if (this.canvas) {
                var ctx = this.canvas.getContext('2d')
                var offsetx = 50
                var offsety = 1
                var width = this.width
                var height = this.height
                var gridWidth = Math.floor(width / 50) * 50
                var gridHeight = Math.floor((height - 20) / 50) * 50

                if (!this.tip) {
                    offsetx = 1
                    gridHeight = Math.floor(height / 50) * 50
                }

                ctx.fillStyle = 'rgba(255,255,255,1)'
                ctx.fillRect(offsetx, offsety, width, height)

                var d = 10

                for (var i = 0; i <= gridWidth / d; i++) {
                    if (i % 5 == 0) {
                        ctx.strokeStyle = 'rgba(63, 169, 252,.6)'
                        ctx.lineWidth = 2
                    } else {
                        ctx.strokeStyle = 'rgba(63, 169, 252,.3)'
                        ctx.lineWidth = 1
                    }
                    ctx.beginPath()
                    ctx.moveTo(i * d + offsetx, offsety)
                    ctx.lineTo(i * d + offsetx, gridHeight + offsety)
                    ctx.stroke()
                }

                for (var j = 0; j <= gridHeight / d; j++) {
                    if (j % 5 == 0) {
                        ctx.strokeStyle = 'rgba(63, 169, 252,.6)'
                        ctx.lineWidth = 2
                    } else {
                        ctx.strokeStyle = 'rgba(63, 169, 252,.3)'
                        ctx.lineWidth = 1
                    }
                    ctx.beginPath()
                    ctx.moveTo(offsetx, j * d + offsety)
                    ctx.lineTo(gridWidth + offsetx, j * d + offsety)
                    ctx.stroke()
                }

                if (this.tip) {
                    ctx.font = '15px Arial'
                    ctx.fillStyle = 'rgb(0,0,0)'
                    ctx.fillText('time/ms', offsetx + width / 2 - 50, gridHeight + 20)

                    ctx.fillText('1.0mv', 0, 11)
                    ctx.fillText('0', 20, gridHeight / 2 + 5)
                    ctx.fillText('-1.0mv', 0, gridHeight)
                }

                this.drawLine(gridHeight / 2)
            }
            console.log('drawout');
        },
        drawLine(zero) {
            var context = this.canvas.getContext('2d')
            //线条颜色为绿色
            context.strokeStyle = '#f03e3e'
            //线条粗细为2
            context.strokeWidth = 2
            // 起始位置
            let x = 50
            if (!this.tip) {
                x = 1
            }
            context.moveTo(x, Math.floor(Math.floor(this.height / 15) / 2) * 15)
            context.beginPath()
            /**for循环 */
            let gap = (this.width - 2) / this.ecgList.length
            console.log(gap)
            if (gap > 1) {
                gap = 1
            }
            for (let i = 0; i < this.ecgList.length; i++) {
                let after = this.getPoiont(this.ecgList[i], zero)
                context.lineTo(x, after)
                x += gap
            }
            context.stroke()
            context.closePath()
            console.log('drawline');
        },
        getPoiont(value, zero) {
            let point = zero
            let max = this.maxV
            let bl = point / max
            if (value > 0) {
                point = zero - value * bl
            } else if (value < 0) {
                point = zero + -value * bl
            }
            return point
        },
    },
}
</script>
 
<style>
.ecgContent {
    width: 100%;
    height: 100%;
}

#ecgCanvas {
    width: 100%;
    height: 100%;
}
</style>