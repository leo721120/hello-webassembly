import * as fs from 'fs-extra'
import fn from '../build'

fs.readFile('./build/untouched.wasm').then(function (buffer) {
    const byte = new WebAssembly.Module(buffer);
    return new WebAssembly.Instance(byte, {
        env: {
            abort() {
                console.error("abort");
            },
        },
    }).exports as any as typeof fn;
}).then(function (asm) {
    console.info(`asm.f(2) == ${asm.f(2)}`);
    console.info(`asm.f(3) == ${asm.f(3)}`);
    console.info(`asm.f(5) == ${asm.f(5)}`);
}).catch(console.error);