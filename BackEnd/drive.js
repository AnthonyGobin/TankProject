    Gpio = require('onoff').Gpio
    m1 = new Gpio(24, 'out') //backward right
    m2 = new Gpio(23, 'out') //forward right

    m3 = new Gpio(20, 'out') //backward left
    m4 = new Gpio(16, 'out') //forward left

const drive = {
    forward : () => {
        m2.write(Gpio.HIGH)
        m4.write(Gpio.HIGH)
    },

    backward : () => {
        m1.write(Gpio.HIGH)
        m3.write(Gpio.HIGH)
    },

    right : () => {
        m1.write(Gpio.HIGH)
        m4.write(Gpio.HIGH)
    },

    left : () => {
        m2.write(Gpio.HIGH)
        m3.write(Gpio.HIGH)
    },

    stop : () => {
        m1.write(Gpio.LOW)
        m2.write(Gpio.LOW)
        m3.write(Gpio.LOW)
        m4.write(Gpio.LOW)
    },
}

module.exports = drive