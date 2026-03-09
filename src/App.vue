<template>
  <div id="app">
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
    </router-view> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import http from "@/utils/request";
import { useSocket } from "@/utils/socket";
import { ref, provide, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import account from '@/config/account'
import CryptoJS from 'crypto-js'
import { okxApi } from '@/api/okx';
import current from '@/config/current'
const currentList = ref(current.currentList); 
const datapushtimes = ref(30)
const suggestion:any = ref({})
const router = useRouter();
const { proxy } = getCurrentInstance();
const route = useRoute();
const globalData = ref();
const userinfoData = ref({
  last_USDT_balence:'0.00',
  USDT_balence:'0.00',
  position:[]
})
const OKBData: any = ref([

]);
let obj:any = ref({
  op: "subscribe",
  args: [],
});

currentList.value.map(item=>{
  let xobj = {
    "channel": "tickers",
    "instId": item.instId
  }
  obj.value.args.push(xobj)
})

OKBData.value = obj.value.args
OKBData.value.map((xitem: { data: never[]; }) => {
  xitem.data = []
})
const gettime = () => {
  // var d = new Date(+new Date() - 8 * 3600 * 1000);
  // d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());
  // return (d.toISOString())
  const timestamp = '' + (Date.now() / 1000)
  return timestamp
}
const currentrealSocket = useSocket(
  "wss://ws.okx.com:8443/ws/v5/public",
  {
    heartbeatInterval: 10000, //心跳
    reconnectInterval: 3000, // 重连时间
    maxReconnectAttempts: 5, //重新连接次数
  }
);
//获取实时价 
const getrealtimeData = () => {
  // send 发送消息 on 监听消息, off 移除监听 close关闭socket
  currentrealSocket.send(JSON.stringify(obj.value));
  currentrealSocket.on("message", (msg: string) => {
    if (msg != "pong") {
      //   console.log("实时数据", JSON.parse(msg));
      // console.log('收到消息:', JSON.parse(msg))
      let taritem = ref()
      taritem.value = JSON.parse(msg);
      if (taritem.value.arg && taritem.value.arg.instId) {
        let oitem = OKBData.value.find((okbitem: { instId: any; }) => okbitem.instId == taritem.value.arg.instId)
        oitem.last = taritem.value.data?taritem.value.data[0].last:''
        if (oitem && taritem.value && taritem.value.data && taritem.value.data.length) {
          if (oitem.data.length&&taritem.value.data[0].last != oitem.data[0].last) {
            // 推送涨跌方向
            taritem.value.data[0].diraction = (taritem.value.data[0].last - oitem.data[0].last > 0) ? '+' :'-'
            taritem.value.data[0].rate = (((taritem.value.data[0].last - oitem.data[0].last)/oitem.data[0].last)*100).toFixed(2)
            oitem.data = [...[taritem.value.data[0]], ...oitem.data]
            if (oitem.data.length > datapushtimes.value) {
              oitem.data.pop()
              analysis(oitem.data)
            }
          }else if(!oitem.data.length){
            taritem.value.data[0].diraction = '='
             taritem.value.data[0].rate = 0
            oitem.data = [...[taritem.value.data[0]], ...oitem.data]
          }
        }
      }
    }
  });
};
getrealtimeData()



provide("globalData", OKBData);


const accountrealSocket = useSocket(
  "wss://ws.okx.com:8443/ws/v5/private",
  {
    heartbeatInterval: 10000, //心跳
    reconnectInterval: 3000, // 重连时间
    maxReconnectAttempts: 5, //重新连接次数
  }
);
const getaccountrealtimeData = () => {
  let time = gettime()
  let accountparams = {
    "op": "login",
    "args":
      [
        {
          "apiKey": account.api,
          "passphrase": account.PASSPHRASE,
          "timestamp": time,
          "sign": CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(time + 'GET' + '/users/self/verify', account.apikey))
        }
      ]
  }
  // send 发送消息 on 监听消息, off 移除监听 close关闭socket
  accountrealSocket.send(JSON.stringify(accountparams));
  accountrealSocket.on("message", (msg: string) => {
    if (msg != "pong") {
      //   console.log("实时数据", JSON.parse(msg));
      // console.log('收到消息:', JSON.parse(msg))
      let taritem = JSON.parse(msg);
      if (taritem.code == 0 && taritem.event == 'login' && taritem.connId) {
        accountrealSocket.send(JSON.stringify({
          "op": "subscribe",
          "args": [{
            "channel": "account"
          },{
            "channel": "positions",
            "instType":'SWAP'
          }]
        }));
      }
      if(taritem.arg&&taritem.arg.channel=="positions"){
        if(taritem.data&&taritem.data[0]){
          userinfoData.value.position =  taritem.data
        }
      }
      if(taritem.arg&&taritem.arg.channel=="account"){
        if(taritem.data&&taritem.data[0]){
          userinfoData.value.last_USDT_balence = userinfoData.value.USDT_balence
          userinfoData.value.USDT_balence =  parseFloat(taritem.data[0].totalEq).toFixed(2)
        }
      }
      // if(taritem.data&&taritem.data[0]){
      //   let usdttaritem = taritem.data[0].balData.find((xitem: { ccy: string; })=>xitem.ccy=="USDT")
      //   if(usdttaritem){
      //     userinfoData.value.USDT_balence =  parseFloat(usdttaritem.cashBal).toFixed(2)
      //   }
      //   userinfoData.value.position =  taritem.data[0].posData
      //   console.log(userinfoData.value)
      // }
    }
  });
};
getaccountrealtimeData()



provide("userinfoData", userinfoData);

// ----------------------------------------------------------------操作层

// 模拟数据
const mockdata = ()=>{
  
}
// 数据分析
const analyitemsnum:any = ref(200) 
const lastanaly:any = ref({}) 
const analysisresList:any = ref([]) 
const analysis = (data:Array<any>)=>{
  let ftimes = 0
  let wtimes = 0
  let frateall= 0
  let wrateall = 0
  // console.log(data)
  data.map(zitem =>{
    if(zitem.diraction=='-'){
      ftimes++
      frateall = frateall + Number(-1*zitem.rate)
    }
    if(zitem.diraction=='+'){
      wtimes++
      wrateall = wrateall + Number(zitem.rate) 
    }
  })
  let obj = ref({
    ftimes,
    wtimes,
    frateall:frateall.toFixed(2),
    wrateall:wrateall.toFixed(2),
    avfrate:(frateall/datapushtimes.value).toFixed(4),
    avwrate:(wrateall/datapushtimes.value).toFixed(4),
    dataresult:(wrateall-frateall).toFixed(2),
    time:Date.now()
  })
  // console.log('跌次数:',ftimes,' 涨次数:',wtimes,'总跌率:',frateall.toFixed(2),' 总涨率:',wrateall.toFixed(2),'总跌率平均值:',(frateall/30).toFixed(4),' 总涨率平均值:',(wrateall/30).toFixed(4),' 结果：',(wrateall-frateall).toFixed(2))
  analysisresList.value = [...[obj.value],...analysisresList.value]
  if(analysisresList.value.length>analyitemsnum.value){
    analysisresList.value.pop()
  }
  let tarresult = {
    res:'-',
    rateres:0,
    timezone:analysisresList.value[0].time-analysisresList.value[analysisresList.value.length-1].time,
  }
  analysisresList.value.map((xitem: { rateres: number; dataresult: any; })=>{
    if(tarresult.rateres==0){
      tarresult.rateres = Number(xitem.dataresult)
    }else{
      tarresult.rateres = tarresult.rateres +Number(xitem.dataresult)
    }
  })
  tarresult.res = Number(tarresult.rateres) >0?'利多':'利空'
  suggestion.value = Number(tarresult.res) >0?'利多':'利空'
  // console.log('建议:',tarresult)
}
//HTTPS下单
const order = () => {
  okxApi.order({
    "instId": "NOT-USDT-SWAP",
    "tdMode": "isolated",
    "side": "sell",
    "sz": "4",
    "posSide": "short",
    "ordType": "market",
  }).then(res => {
    console.log(res)
  })
}



</script>

<style lang="scss">
@import "@/assets/scss/default.scss";

#app {
  height: 100vh;
  background: rgb(247, 247, 247);
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
}

.overflow-visible {
  display: flex;
  justify-content: space-around;
}


</style>
