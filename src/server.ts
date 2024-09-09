import { app } from "./app";

app.listen({
    port: 3333,
    host: '0.0.0.0',
}).then(() => {
    console.log('HTTP Server running on http://localhost:3333')
})