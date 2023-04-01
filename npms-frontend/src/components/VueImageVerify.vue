<template>
    <div class="img-verify">
        <canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                width: 140,
                height: 40,
                imgCode: ''
            }
        },

        methods: {
            // Initialize drawing picture verification code
            init() {
                this.imgCode = this.draw()
            },

            // Click on the picture to redraw
            handleDraw() {
                this.imgCode = this.draw()
            },

            // random number
            randomNum(min, max) {
                return parseInt(Math.random() * (max - min) + min)
            },

            //random color
            randomColor(min, max) {
                const r = this.randomNum(min, max)
                const g = this.randomNum(min, max)
                const b = this.randomNum(min, max)
                return `rgb(${r},${g},${b})`
            },

            // draw pictures
            draw() {
                // 3.Fill the background color, the background color should be lighter
                const ctx = this.$refs.verify.getContext('2d')
                // fill color
                ctx.fillStyle = this.randomColor(180, 230)
                // filled position
                ctx.fillRect(0, 0, this.width, this.height)
                // define paramText
                let imgCode = ''
                // 4.Randomly generate strings and rotate them randomly
                for (let i = 0; i < 4; i++) {
                    // four random words
                    const text = this.pool[this.randomNum(0, this.pool.length)]
                    imgCode += text
                    // random font size
                    const fontSize = this.randomNum(18, 40)
                    // random font rotation
                    const deg = this.randomNum(-30, 30)
                    /**
                     * The idea of ​​drawing text and displaying four texts in different positions:
                     * 1. Define the font
                     * 2. Define alignment
                     * 3. Fill in different colors
                     * 4. Save the current state (to prevent the above state from being affected)
                     * 5. Translate translate()
                     * 6. Rotate rotate()
                     * 7. Fill text
                     * 8, restore out of the stack
                     */
                    ctx.font = fontSize + 'px Simhei'
                    ctx.textBaseline = 'top'
                    ctx.fillStyle = this.randomColor(80, 150)
                    /**
                     * The save() method pushes a copy of the current state onto a stack that holds the image state.
                     * This allows you to temporarily change the image state,
                     * Then, restore the previous value by calling restore().
                     * save is on the stack, and restore is on the stack.
                     * Used to save the state of the Canvas. After saving, you can call Canvas's translation, scaling, rotation, miscutting, cropping and other operations. restore: Used to restore the previously saved state of Canvas. Prevent operations performed on Canvas after save from affecting subsequent drawing.
                     *
                     */
                    ctx.save()
                    ctx.translate(30 * i + 15, 15)
                    ctx.rotate((deg * Math.PI) / 180)
                   // The fillText() method draws filled text on the canvas. The default color of text is black.
                    // Please use the font property to define the font and font size, and use the fillStyle property to render the text in another color/gradient.
                    // context.fillText(text,x,y,maxWidth);
                    ctx.fillText(text, -15 + 5, -15)
                    ctx.restore()
                }

                // 5.Randomly generate 5 interference lines, the color of the interference lines should be lighter
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath()
                    ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
                    ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
                    ctx.strokeStyle = this.randomColor(180, 230)
                    ctx.closePath()
                    ctx.stroke()
                }

                // 6.Randomly generate 40 disturbing dots
                for (let i = 0; i < 40; i++) {
                    ctx.beginPath()
                    ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI)
                    ctx.closePath()
                    ctx.fillStyle = this.randomColor(150, 200)
                    ctx.fill()
                }
                return imgCode;
            }
        },
        mounted() {
            this.init()
        }
    }
</script>
<style>
    .img-verify canvas {
        cursor: pointer;
        border-radius: 18px;
    }
</style>