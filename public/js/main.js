//register service worker
// navigator.serviceWorker.register("../serviceworker.js");

//event listeners.
//fin.desktop.main(onMain);

document.addEventListener("DOMContentLoaded", () => {
  if (typeof fin != "undefined") {
    fin.desktop.main(onMain);
  } else {
    ofVersion.innerText =
      "OpenFin is not available - you are probably running in a browser.";
  }
});

// test geoloaction
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
}

// test pointerLock
document.getElementsByTagName("canvas")[0].addEventListener("click", function() {
  if (document.pointerLockElement == null) {
    this.requestPointerLock();
  } else {
    document.exitPointerLock();
  }
}, false);


function captureVideo(){
	const constraints = {
	  video: true
	};

	const video = document.querySelector('video');

	navigator.mediaDevices.getUserMedia(constraints).
	  then((stream) => {
		  video.srcObject = stream;
		  document.getElementById('videoStop').addEventListener('click', function () {
            stream.getVideoTracks().forEach(function (track) {
				track.stop();
			});
        });
	});	
}


//Once the DOM has loaded and the OpenFin API is ready
async function onMain(args) {

	$("#actionButton2").click(function () {
        $("#emptydiv").append('<iframe src="http://openfin.co" height="200px" width="100%" />');
    });

  console.log(args);
	console.log('on main called');
  //const app = fin.desktop.Application.getCurrent();
  //const win = fin.desktop.Window.getCurrent();

  const app = fin.Application.getCurrentSync();
  const win = fin.Window.getCurrentSync();
  const uuid = app.uuid? app.uuid : app.identity.uuid;

  // listen on file download event
  win.on("file-download-completed", function (event) {
    console.log('file download complete');
    const fileExtension = event.fileName.split('.').pop();
    if (fileExtension === 'exe') {
      fin.System.launchFile({fileUuid: event.fileUuid});
    }
  }, function () {
      console.log("The registration was successful");
  },function (reason) {
      console.log("failure:" + reason);
  });

/*
  await fin.System.clearCache({
    cache: true,
    cookies: true,
    localStorage: true,
    appcache: true
  });
*/
/*
  fin.desktop.System.clearCache({
    cache: true,
    cookies: true,
    localStorage: true,
    appcache: true
}, ()=> console.log('clear cache'));
*/

  //fin.desktop.System.showDeveloperTools(uuid, uuid);
  fin.desktop.System.getVersion(version => {
    const ofVersion = document.querySelector("#of-version");
    ofVersion.innerText = version;
  });

/*
  fin.desktop.System.clearCache({
    cache: true,
    cookies: true,
    localStorage: true,
    appcache: true
}, ()=>{

  const app = fin.desktop.Application.getCurrent();
  fin.desktop.System.showDeveloperTools(app.uuid, app.uuid);
  fin.desktop.System.getVersion(version => {
    const ofVersion = document.querySelector("#of-version");
    ofVersion.innerText = version;
  });
  const callback = function(event) {
  console.log("The uncaught js error: ", event);
};

fin.System.on('uncaught-javascript-exception', callback);
});*/
/*
setTimeout(() =>{
	let a = [];
while (1) {
	a.push(Math.random() * 9999999);
}
}, 5000);
*/
  // set tray icon
    iconImage = "https://openfin.co/favicon-32x32.png",
	//iconImage = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABKVBMVEUAAABSTf9QTP9TUP9RTf9jXP9PS/9SUP9OSv9QTf9TTv9VUP9PSf9RTv9WTv9KRv9RTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTf9QTP9QTP9QTP9UUP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9TTv9RTf9QTP9QTP9QTP9QTP9RTf9QTP9QTP9QTf9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9RTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9QTP9RTf9QTP9QTP9QTP9QTf9QTP9QTP9QTP9TT/9QTP9UUf9QTP////+c69uyAAAAYXRSTlMAAAAAAAAAAAAAAAAAAAAADm3R+PnScA8QmZwSfP2AAR/a3CFHS1T8/l478n0Rwr9Q7QEDXexsDQJIPAEmb5qrzve+eVoe2/PDE1gN7i9uzxSs0FcOLg4S3voT3cBKAV8BobrzZQAAAAFiS0dEYiu5HTwAAAAHdElNRQfiAgQJJyMViSyGAAABjklEQVQ4y31TeV+CQBBdRzqorBQENDQTz9LSsLIShQ5LLY+s7DCN7/8lEmHXa3P+25n3e/vmzQxCJFyw6/VxvF8QwY1oAVKAM0fBB/eAVmdW5JA5jlB4n6ERRA5MJ6IKjQJiHAbwcSogkcSAVJoKODzCADMDFBGQPSaAE5FCwUAuT0R4TykUjFqIphzE2fnF6hrOFyOXiavsOoPY65JWruiGheBubu9i90XG8k+ucsmHx5xqkW5sqrW63+mFq8oSoEbA9u+psMWOGT3w7MNakoEGahrOo1oCrLaOc6bRRC3SWxO2nYbbOkm2EPHXLO8wuJ0OSXJTgI5KBRBBpt6GxS9ekEAojK49AXZKJCeg12AIv3xv4JltMxR8R9ALf3w6Dvu6NVX96mKj+O9wDyyrlXha7o9/MvQKtrovp3+UIksWWtTIKK3IayK4Zkc50PhJndcGC+MGqT8B9KXFhXFBZgLIzPHbFEO8LWZqSF3aOBHxz9or0eWHw/yGl5/eyNMgbx9vj3q8yA2i4Ofnz/8PB9agG+57b98AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDItMDRUMDk6Mzk6MzUrMDE6MDDl1ju7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAyLTA0VDA5OjM5OjM1KzAxOjAwlIuDBwAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
    mouseButton = ['left', 'middle', 'right'];

	let clickListener = (clickInfo) => {
		console.log(`The mouse has ${mouseButton[clickInfo.button]}-clicked on the app's tray icon at (${clickInfo.x},${clickInfo.y})`);
	}

	// app.setTrayIcon(iconImage, clickListener); 


/*  app.addEventListener("run-requested", function (event) {
    if(event.userAppConfigArgs) {
    //args parameter contains deep link context
    console.log(event.userAppConfigArgs.parameter1);
    }
  });*/
  
  var ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.font = '16px serif';
  ctx.fillText('Click the canvas and see', 10, 40);
  ctx.fillText('mouse hidden or shown', 10, 60);  
}

function copyme() {
	navigator.clipboard.readText().then(data => console.log(data));
}

function writeMe(){
    if (navigator.clipboard != undefined) {//Chrome
        navigator.clipboard.writeText('hello').then(function () {
			alert('write');
            // console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
		});
	}
}
