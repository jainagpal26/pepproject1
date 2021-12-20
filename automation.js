//npm install jsdom 
//npm install puppeteer
//npm install minimist
//npm install axios


//please run the below command and the 3 scrapped headings will be available in newly created "scarpped.txt" file
// it will automate the wikipidea and scrap the following 3 things

//node automation.js  --url="https://www.wikipedia.org/" --dest="scrapped.txt"


let minimist= require("minimist");
let fs= require("fs");
let puppeteer= require("puppeteer");
let jsdom=require("jsdom");
let axios=require("axios");

let args= minimist(process.argv);


async function run(){

    let browser= await puppeteer.launch({
        headless:false,
        args:['--start-maximized'],
        defaultViewport:null
    })

    let pages=await browser.pages();
    let page=pages[0];
//url pr
    await page.goto(args.url);
    //english pr click
    await page.waitForSelector("a.link-box[title='English — Wikipedia — The Free Encyclopedia']");
    await page.click("a.link-box[title='English — Wikipedia — The Free Encyclopedia']");
// all portols pr click
  
    await page.waitForSelector("a[href='/wiki/Wikipedia:Contents/Portals']");
    await page.click("a[href='/wiki/Wikipedia:Contents/Portals']");
//a-z index select
    await page.waitForSelector("a[href='/wiki/Wikipedia:Contents/A%E2%80%93Z_index']")
    await page.click("a[href='/wiki/Wikipedia:Contents/A%E2%80%93Z_index']")
    // first j pr click
  
    await page.waitForSelector("a[href='/wiki/Special:AllPages/J']")
    await page.click("a[href='/wiki/Special:AllPages/J']")
//last page pr saagye
    await page.waitForSelector("a[href='/wiki/J']")
    await page.click("a[href='/wiki/J']")

    //browser bnd krna hai
    await browser.close();


}run();
const url1="https://en.wikipedia.org/wiki/J"    
let dwnload=axios.get(url1)

dwnload.then(function(response){
    let html=response.data;
 
let dom=new jsdom.JSDOM(html);
let document =dom.window.document;
let ans=document.querySelector("span#History").textContent
fs.appendFileSync(args.dest,ans,"utf-8");
 let ans1=document.querySelector("a[href='#Other_languages']").textContent
 fs.appendFileSync(args.dest,ans1,"utf-8");
 let ans2=document.querySelector("a[ href='#Related_characters']").textContent
 fs.appendFileSync(args.dest,ans2,"utf-8");

})
