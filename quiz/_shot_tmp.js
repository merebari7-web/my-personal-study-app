const puppeteer=require("puppeteer");const path=require("path");
(async()=>{
 const b=await puppeteer.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 const p=await b.newPage();
 await p.setViewport({width:1280,height:800});
 await p.goto("file://"+path.resolve("index.html"),{waitUntil:"load"});
 await p.waitForFunction(()=>typeof CLASSES!=="undefined",{timeout:20000}).catch(()=>{});
 await new Promise(r=>setTimeout(r,600));
 await p.screenshot({path:"/tmp/cur_gate.png"});
 await p.evaluate(()=>{document.getElementById("gateName").value="Ada Okafor";document.getElementById("gateEmail").value="ada@test.ng";gateSignUp();});
 await new Promise(r=>setTimeout(r,1200));
 await p.screenshot({path:"/tmp/cur_home.png"});
 await p.evaluate(()=>document.querySelector("#scrollTarget, main, .wrap")?.scrollIntoView?.({block:"start"}).catch?.(()=>{})).catch(()=>{});
 await p.evaluate(()=>window.scrollTo(0,650));
 await new Promise(r=>setTimeout(r,500));
 await p.screenshot({path:"/tmp/cur_cards.png"});
 await b.close();console.log("shots done");
})().catch(e=>{console.error(e);process.exit(1)});
