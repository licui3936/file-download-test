document.addEventListener("DOMContentLoaded", () => {
console.log('hello, preload script');
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 'content';
var head = document.head || document.getElementsByTagName('head')[0];
console.log(head);
//document.getElementsByTagName('head')[0].appendChild(style);
// document.head.appendChild(style);

  if (typeof fin != "undefined") {
  console.log('add initialized event listener in preload');
  
  //const app = fin.desktop.Application.getCurrent();
  //app.addEventListener('initialized', evt =>console.log('window initialized'));	  
  const app = fin.Application.getCurrentSync();
  app.addListener('initialized', evt =>console.log('window initialized'));	
  }
  //fin.Application.getCurrent().then(app => app.on('window-created', ()=>console.log('window created')));
});
