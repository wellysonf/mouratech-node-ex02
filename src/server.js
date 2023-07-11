import { app } from "./app.js";

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=>{
    console.log('Server iniciado.');
})