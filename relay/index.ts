import gpio from "rpi-gpio";

await gpio.promise.setup(7, gpio.DIR_OUT);

let v = true;
setInterval(() => {
  gpio.write(7, !v);
  v = !v;
}, 3000);
