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
const num=1;
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
  let cc="";
  if (!KEY) {
    console.log('请填写 key 后在继续')
    return
  }
  if(num==1){
      cc="94";
  }else if(num==2){
      cc="06";
  }else{
      cc="90";
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
  if (KEY_2&&num<2) {
    KEY=KEY_2;
    console.log('第2个账号开始签到')
    await start();
    num++;
  }else{
      num++
      console.log('KEY_2不存在')
  }
  if (KEY_3&&num<3) {
    KEY=KEY_3;
    console.log('第3个账号开始签到')
    await start();
    num++;
  }else{
      console.log('KEY_3不存在')
  }
}

start()
