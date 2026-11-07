import {mkdir,writeFile} from "node:fs/promises";
import {join,resolve} from "node:path";

const baseUrl=process.env.PLAY_CAPTURE_URL||"http://localhost:3000/";
const outputRoot=resolve("store-assets/android");
const targets=await (await fetch("http://127.0.0.1:9222/json/list")).json();
const target=targets.find(item=>item.type==="page"&&item.url.startsWith(baseUrl));
if(!target)throw new Error(`Open ${baseUrl} in the headless Chrome capture session first.`);

const socket=new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolvePromise,reject)=>{socket.addEventListener("open",resolvePromise,{once:true});socket.addEventListener("error",reject,{once:true})});
let commandId=0;
const pending=new Map();
socket.addEventListener("message",event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result)}});
function send(method,params={}){return new Promise((resolvePromise,reject)=>{const id=++commandId;pending.set(id,{resolve:resolvePromise,reject});socket.send(JSON.stringify({id,method,params}))})}
const pause=ms=>new Promise(resolvePromise=>setTimeout(resolvePromise,ms));
async function evaluate(expression){const result=await send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.text);return result.result?.value}
async function capture(device,name){
  await send("Emulation.setDeviceMetricsOverride",{width:device.width,height:device.height,deviceScaleFactor:device.scale,mobile:true,screenWidth:device.width,screenHeight:device.height});
  await send("Page.navigate",{url:baseUrl});await pause(1600);await evaluate(`window.scrollTo(0,0)`);await pause(250);
  if(name==="home"){
    await evaluate(`(()=>[...document.querySelectorAll('nav button')].find(b=>b.innerText.includes('मुख्यपृष्ठ'))?.click())()`);await pause(800);
  }else if(name==="nitya"){
    await evaluate(`(()=>[...document.querySelectorAll('nav button')].find(b=>b.innerText.includes('नित्यसेवा'))?.click())()`);await pause(1700);
  }else if(name==="charitra"){
    await evaluate(`(()=>document.querySelector('.menu-trigger')?.click())()`);await pause(300);
    await evaluate(`(()=>[...document.querySelectorAll('.drawer-list button')].find(b=>b.innerText.includes('चरित्र सारामृत'))?.click())()`);await pause(1500);
    await evaluate(`(()=>document.querySelector('.charitra-list button')?.click())()`);await pause(500);
  }else if(name==="panchang"){
    await evaluate(`(()=>[...document.querySelectorAll('nav button')].find(b=>b.innerText.includes('दिनदर्शिका'))?.click())()`);await pause(1200);
  }else if(name==="mantra"){
    await evaluate(`(()=>[...document.querySelectorAll('nav button')].find(b=>b.innerText.includes('मंत्रजप'))?.click())()`);await pause(400);
  }
  const {data}=await send("Page.captureScreenshot",{format:"png",fromSurface:true,captureBeyondViewport:false});
  const directory=join(outputRoot,device.name);await mkdir(directory,{recursive:true});
  await writeFile(join(directory,`${name}.png`),Buffer.from(data,"base64"));
  return {device:device.name,screen:name,path:join(directory,`${name}.png`),width:device.width*device.scale,height:device.height*device.scale};
}

await send("Page.enable");await send("Runtime.enable");
const results=[];
for(const device of [{name:"phone",width:432,height:768,scale:2.5},{name:"tablet",width:960,height:540,scale:2}]){
  for(const screen of ["home","nitya","charitra","panchang","mantra"])results.push(await capture(device,screen));
}
socket.close();
console.log(JSON.stringify(results,null,2));
