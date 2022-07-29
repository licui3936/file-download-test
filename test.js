const { connect } = require("hadouken-js-adapter");

async function launchApp() {
    const fin  = await connect({
        uuid: "OpenfinPOC",
        runtime: {
            version: 'canary',
            arguments: '--inspect=9222 --v=1'
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
