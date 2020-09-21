// version v0.0.1
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require('child_process').execSync
const fs = require('fs')
const rp = require('request-promise')
const download = require('download')

// 公共变量
const KEY = process.env.JD_COOKIE
const serverJ = process.env.PUSH_KEY
const KEY_2 = process.env.JD_COOKIE_2
const KEY_3 = process.env.JD_COOKIE_3
async function downFile () {
    // const url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js'
    const url = 'https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js'
    await download(url, './')
}

async function changeFiele () {
   let content = await fs.readFileSync('./JD_DailyBonus.js', 'utf8')
   content = content.replace(/var Key = ''/, `var Key = '${KEY}'`)
   await fs.writeFileSync( './JD_DailyBonus.js', content, 'utf8')
}

async function sendNotify (text,desp) {
  text=text+desp;

  const options ={
    uri:  `https://oapi.dingtalk.com/robot/send?access_token=${serverJ}`,
    json: { 
        "msgtype": "text", 
        "text": {
            "content": text
        } 
    },
    headers:{"Content-Type":"application/json ;charset=utf-8 "}
     
  }
  await rp.post(options).then(res=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}

async function start() {
  let cc="94";
  if (!KEY) {
    console.log('请填写 key 后在继续')
    return
  }

  // 下载最新代码
  await downFile();
  console.log('下载代码完毕')
  // 替换变量
  await changeFiele();
  console.log('替换变量完毕')
  // 执行
  await exec("node JD_DailyBonus.js >> result.txt");
  console.log('执行完毕')

  if (serverJ) {
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
      content = fs.readFileSync(path, "utf8");
    }
    await sendNotify(cc+"京东签到-" + new Date().toLocaleDateString(), content);
    console.log('发送结果完毕')
  }
  if (KEY_2) {
    await start_2();
    return
  }
  if (KEY_3) {
    await start_3();
    return
  }
  
  
}

async function start_2() {
  let cc="06";
  KEY=KEY_2;
  if (!KEY) {
    console.log('请填写 key 后在继续')
    return
  }
  // 替换变量
  await changeFiele();
  console.log('替换变量完毕')
  // 执行
  await exec("node JD_DailyBonus.js >> result.txt");
  console.log('执行完毕')

  if (serverJ) {
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
      content = fs.readFileSync(path, "utf8");
    }
    await sendNotify(cc+"京东签到-" + new Date().toLocaleDateString(), content);
    console.log('发送结果完毕')
  }  
}

async function start_3() {
  let cc="90";
  KEY=KEY_3;
  if (!KEY) {
    console.log('请填写 key 后在继续')
    return
  }
  // 替换变量
  await changeFiele();
  console.log('替换变量完毕')
  // 执行
  await exec("node JD_DailyBonus.js >> result.txt");
  console.log('执行完毕')

  if (serverJ) {
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
      content = fs.readFileSync(path, "utf8");
    }
    await sendNotify(cc+"京东签到-" + new Date().toLocaleDateString(), content);
    console.log('发送结果完毕')
  }  
}

start()
