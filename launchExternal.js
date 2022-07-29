const { connect } = require("hadouken-js-adapter");

async function launchApp() {
    // connecto to the current running runtime
    // permissions option is currently NOT supported
    const fin  = await connect({
        uuid: "external-connection-test1",
        address: 'ws://localhost:9696',
        nonPersistent: true,
        permissions: {
            System: {
              launchExternalProcess: false
            }
        },
        runtime: {
            arguments: "--inspect=9222 --v=1",
            runtime: "canary"
        }
    });

    const version = await fin.System.getVersion();
    console.log("Connected to Hadouken version", version);
	
    const client = await fin.InterApplicationBus.Channel.connect('channelName');
    await client.register('client-action', (payload, identity) => {
        console.log(payload, identity);
        return {
            echo: payload
        };
    });
    const providerResponse = await client.dispatch('provider-action', { message: 'Hello From the client'});
    console.log(providerResponse);
}

launchApp().then(() => {
    console.log("success");
}).catch((err) => {
    console.log("Error trying to connect,", err.message);
    console.log(err.stack);
});  