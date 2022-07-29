const { connect } = require("hadouken-js-adapter");

async function launchApp() {
    const fin  = await connect({
        uuid: "OpenfinPOC1",
        runtime: {
            version: '10.66.41.18',
            arguments: '--inspect=9222 --v=1 --enable-mesh --security-realm=test'
        }
    });

    const version = await fin.System.getVersion();
    console.log("Connected to Hadouken version", version);
}

launchApp().then(() => {
    console.log("success");
}).catch((err) => {
    console.log("Error trying to connect,", err.message);
    console.log(err.stack);
});  
