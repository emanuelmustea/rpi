import { executeInstructions, Pin, PinDirection } from "https://deno.land/x/deno_gpio@1.4.0/mod.ts";

// alternative hybrid (transfer from bash to JS and vice-versa)
// note that this approach is a bit slower and can cause timing issues with some 'dumb' sensors that require precise instruction sequences.
const led = new Pin(24, PinDirection.OUT, 1);
// the Pin constructor queues up some export instructions.. we are executing these here
await executeInstructions(); // calls sysfs. returns a promise.

let value = 1;
setInterval(() => {
  led.setValue(value as any);
  value = value ? 0 : 1
  executeInstructions();
}, 2000)
