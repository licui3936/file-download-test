let path=require('path');
let uri = 'file:///Users/licui/dev/app-template/public/app.json';
let newPath = uri.replace(/^file:\/\/\/?/, '').replace(/%20/g, ' ');
if(process.platform !== 'win32' && newPath.charAt(0) !== '/') {
	newPath = `/${newPath}`;
}
console.log("new path", newPath);
let p = path.resolve(newPath);
console.log(p);