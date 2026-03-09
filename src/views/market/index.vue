<script lang="ts" setup>

import { ref, inject, getCurrentInstance } from "vue";
import { okxApi } from '@/api/okx';
import { CountTo } from 'vue3-count-to';
import chart from "./components/chart.vue";
import onlychart from "./components/onlychart.vue";
import current from '@/config/current'
let globalData: any = inject("globalData");
let userinfoData: any = inject("userinfoData");
const chartMember = ref("chart1");
const currentList = ref(current.currentList);
//现持仓
const currentPosition: any = ref([])



const getTime = (timestamp: string) => {
    var date = new Date(parseInt(timestamp));//时间戳为13位的话需要parseInt下
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}
const getcurrentPosition = () => {
    okxApi.positions({
        instType: 'SWAP',
    }).then(res => {
        currentPosition.value = res.data
    })
}

// 获取精英交易员合约多空持仓人数比
const getstatcontracts = () => {
    okxApi.statposition({
        instId: 'BTC-USDT-SWAP',
        period: '15m'
    }).then(res => {
        console.log(res.data)
    })
}

// 获取精英交易员合约多空持仓仓位比
const getstatposition = () => {
    okxApi.statposition({
        instId: 'BTC-USDT-SWAP',
        period: '15m'
    }).then(res => {
        console.log(res.data)
    })
}

// 获取合约多空持仓人数比
const getaccountratio = () => {
    okxApi.accountratio({
        instId: 'BTC-USDT-SWAP',
        period: '15m'
    }).then(res => {
        console.log(res.data)
    })
}


// 初始化K线走势
const initkline = (instId: any, index: any) => {
    okxApi.candles({
        instId: instId,
        bar: '1D',
        limit: '30'
    }).then(res => {
        let list: any = res.data
        let pointArr: any = []
        list.map((item: any[]) => {
            pointArr.push(parseFloat(item[4]))
        })
        let open = list[0][1]
        currentList.value[index].klineList = pointArr.reverse()
        currentList.value[index].show = true
        currentList.value[index].open = open
    })
}

currentList.value.map((item, index) => {
    initkline(item.instId, index)
})
// 初始化面板
const initdashboard = () => {
    getcurrentPosition() //加载现持仓
}
initdashboard()

</script>





<template>
    <!-- <div class="" style='padding:20px'>
        <div v-for="i in globalData[0].data">
            {{ i.last }}
        </div>
    </div> -->
    <div class="dashboard">
        <div class="part1">
            <div class="part1item item1">
                <div class="titleline">Sickle Plan <span style="font-size: 12px;margin-left: 10px;">1.0</span></div>
                <div class="titletxt">Your Property</div>
                <div class="titletxtnumber">$ <count-to :startVal="Number(userinfoData.last_USDT_balence)"
                        :endVal="Number(userinfoData.USDT_balence)" :decimals="2" :duration="3000"></count-to></div>
                <div class="des">
                    Paronia is a blockchain platform. We make blockchain accessible.
                </div>
                <div class="startbtn">
                    Start
                </div>
            </div>
            <div class="part1item item2">
                <div class="navbar">
                    <div class="current">
                        <img class="currenticon" src="@/assets/icons/btc.svg" alt="">
                        <div class="currentvalue">
                            ETH/USDT
                        </div>
                        <img class="ArrowDown" src="@/assets/icons/ArrowDown.svg" alt="">
                    </div>
                    <div class="timegroup">
                        <div class="timeitem" style="margin-right: 10px;color: #fff;">5M</div>
                        <div class="timeitem" style="margin-right: 10px;">15M</div>
                        <div class="timeitem">30M</div>
                    </div>
                </div>
                <div class="chartpart">
                    <chart ref="chart1"></chart>
                </div>
            </div>
            <div class="part1item item3">
                <div class="navbar">
                    <div class="title">
                        Market Overview
                    </div>
                    <div class="current">
                        <div class="currentvalue">
                            ETH/USDT
                        </div>
                        <img class="ArrowDown" src="@/assets/icons/ArrowDown.svg" alt="">
                    </div>
                </div>
                <div class="chartpart">
                    <chart ref="chart1"></chart>
                </div>
            </div>
        </div>
        <div class="part2">
            <div class="item" v-for="(i, index) in currentList" :key="index">
                <img class="current-icon" :src="i.icon" alt="">
                <div class="info">
                    <div class="line1">
                        <div class="lpart">
                            <div>{{ i.name }}</div>
                            <img class="swig-icon" src="@/assets/icons/swig.svg" alt="">
                            <div>USDT</div>
                        </div>
                        <div class="rpart">
                            <img v-if="(globalData[index].last - parseFloat(i.open)) > 0" class="arrow"
                                src="@/assets/icons/up.svg" alt="">
                            <img v-else class="arrow" src="@/assets/icons/down.svg" alt="">
                            <div class="number"
                                :style="{ color: (globalData[index].last - parseFloat(i.open)) < 0 ? '#E72D04' : '' }">
                                {{ ((globalData[index].last - parseFloat(i.open)) / parseFloat(i.open) * 100).toFixed(2) }} %
                            </div>
                        </div>
                    </div>
                    <div class="value">{{ globalData[index].last }}</div>
                    <div class="zchart">
                        <onlychart v-if="i.show" :dataList="i.klineList" :color="i.color"></onlychart>
                    </div>
                </div>
            </div>
        </div>
        <div class="part3">
            <div class="item1">
                <div v-show="i.margin && i.margin > 0" :class="i.upl > 0 ? 'items' : 'fitems'"
                    v-for="(i, index) in userinfoData.position">
                    <div class="lpart">
                        <div class="line1">{{ i.instId.split('-')[0] }}/USDT <span
                                style="margin-left: 10px;color: #6284f5;">{{ Number(i.margin).toFixed(1) }}U</span>
                        </div>
                        <div class="line2">{{ i.avgPx }} ->{{ i.last }}</div>
                        <div class="line3">Orders ID #{{ i.tradeId }}</div>
                        <div class="line4">{{ getTime(i.cTime) }}</div>
                    </div>
                    <div :class="i.posSide == 'short' ? 'srpart' : 'rpart'">
                        <div class="buydirec">
                            <div class="buydireclpart">
                                {{ i.posSide == 'short' ? 'Open Short' : 'Open Long' }}
                            </div>
                            <div class="buydirecrpart">
                                {{ i.lever }} Lots
                            </div>
                        </div>
                        <div class="yiel" :style="{ color: i.upl > 0 ? '#00895F' : '#BF1010' }">
                            {{ Number(i.upl).toFixed(4) }}
                            USDT
                        </div>
                    </div>
                </div>
                <!-- <div class="fitems" v-if="false">
                    <div class="lpart">
                        <div class="line1">BTC/USDT</div>
                        <div class="line2">60845.67 ->60855.67</div>
                        <div class="line3">Orders ID #105446</div>
                        <div class="line4">2024-08-10 15:09:48</div>
                    </div>
                    <div class="rpart">
                        <div class="buydirec">
                            <div class="buydireclpart">
                                Open Short
                            </div>
                            <div class="buydirecrpart">
                                100 Lots
                            </div>
                        </div>
                        <div class="yiel">
                            -1210.48 USDT
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="item2">
                <iframe class="k-line-demo"
                    src="https://www.tradingview.com/widgetembed/?symbol=OKX%3AAUCTIONUSDT&theme=dark&utm_term=OKX%3AAUCTIONUSDT&locale=zh_TW"></iframe>
            </div>
            <div class="item3">
                <div class="items">
                    <div class="lpart">
                        <div class="direction">
                            <img src="@/assets/icons/greenarrow.svg" alt="">
                        </div>
                        <div class="moneyinfo">
                            <div class="number">
                                <span style="color: #00C287;margin-right: 4px">$</span>
                                1892.25
                            </div>
                            <div class="mtext">
                                Income
                            </div>
                        </div>
                    </div>
                    <div class="rpart">
                        <div class="txt1">2024.02.01</div>
                        <div class="txt2">周五</div>
                    </div>
                </div>
                <div class="fitems">
                    <div class="lpart">
                        <div class="direction">
                            <img src="@/assets/icons/redarrow.svg" alt="">
                        </div>
                        <div class="moneyinfo">
                            <div class="number">
                                <span style="color: #E72D04;margin-right: 4px">$</span>
                                1892.25
                            </div>
                            <div class="mtext">
                                Expenses
                            </div>
                        </div>
                    </div>
                    <div class="rpart">
                        <div class="txt1">2024.02.01</div>
                        <div class="txt2">周五</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.dashboard {
    padding: 20px;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(119deg, #261E35 0%, #2F2347 99%);

    .part1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;

        .part1item {
            width: 612px;
            height: 290px;
            border-radius: 20px;
            opacity: 1;
            background: #3C354A;
            box-sizing: border-box;
            backdrop-filter: blur(140px);

            .des {
                width: 220px;
                word-break: break-word;
                line-height: 20px;
                margin-top: 40px;
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
            }

            .startbtn {
                padding: 12px 25px;
                border-radius: 10px;
                background: #261B4C;
                color: #FFFFFF;
                font-size: 16px;
                width: fit-content;
                margin-top: 28px;
                cursor: pointer;
            }

            .titletxt {
                margin-top: 20px;
                font-size: 30px;
                font-weight: bold;
                color: #FFFFFF;
            }

            .titletxtnumber {
                margin-top: 10px;
                font-size: 30px;
                font-weight: bold;
                color: #FFFFFF;
            }

            .titleline {
                font-size: 14px;
                color: #FFFFFF;
            }
        }

        .navbar {
            height: 40px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
                font-size: 18px;
                font-weight: bold;
                color: #FFFFFF;
            }

            .timegroup {
                display: flex;
                align-items: center;
                height: 100%;

                .timeitem {
                    height: 100%;
                    border-radius: 10px;
                    opacity: 1;
                    background: rgba(26, 17, 29, 0.7);
                    padding: 10px;
                    color: #868B93;
                }
            }

            .current {
                // width: 140px;
                height: 100%;
                border-radius: 10px;
                background: rgba(26, 17, 29, 0.7);
                padding: 10px 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;

                .currentvalue {
                    font-size: 14px;
                    font-weight: bold;
                    color: #FFFFFF;
                    margin-right: 10px;
                }

                .ArrowDown {
                    width: 12px;
                    height: 8px;
                }

                .currenticon {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
        }

        .chartpart {
            height: 190px;
        }

        .item1 {
            padding: 20px;
            background-image: url('@/assets/images/main.png');
            background-size: 100% 100%;
        }

        .item2 {
            padding: 20px;
            border: 1px solid rgb(83, 75, 100);
        }

        .item3 {
            padding: 20px;
            border: 1px solid rgb(116, 111, 126);
        }
    }

    .part2 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
            width: 252px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .info {
                margin-top: -22px;
                width: 100%;
                height: 155px;
                border-radius: 20px;
                opacity: 1;
                background: #3C354A;
                border: 1px solid rgba(255, 255, 255, 0.5);
                padding: 35px 15px 15px 15px;

                .zchart {
                    margin-top: 5px;
                    height: 55px;
                    width: 100%;
                }

                .value {
                    margin-top: 5px;
                    font-size: 20px;
                    color: #FFFFFF;
                    letter-spacing: 2px;
                }

                .line1 {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 20px;
                    justify-content: space-between;

                    .lpart {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        font-size: 14px;
                        line-height: 20px;
                        color: #868B93;

                        .swig-icon {
                            width: 18px;
                            height: 13px;
                            margin: 0 12px;
                        }
                    }

                    .rpart {
                        display: flex;
                        align-items: center;
                        height: 100%;

                        .arrow {
                            width: 16px;
                            height: 16px;
                        }

                        .number {
                            margin-left: 4px;
                            font-size: 14px;
                            color: #00C287;
                        }
                    }

                }
            }
        }

        .current-icon {
            width: 50px;
            height: 50px;
            position: relative;
            z-index: 2;
        }
    }

    .part3 {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(100vh - 553px);

        .item1 {
            width: 524px;
            height: 100%;
            border-radius: 20px;
            padding: 10px 10px 0 10px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 95%, rgba(255, 255, 255, 0.02) 95%, rgba(255, 255, 255, 0.25) 100%), #3C354A;

            .items {
                border-radius: 16px;
                background: radial-gradient(109% 109% at 50% 50%, #30293D 89%, #646464 100%);
                box-shadow: 0px 1px 2px 0px rgba(0, 200, 53, 0.1);
                height: 100px;
                display: flex;
                justify-content: space-between;
                padding: 10px 16px;
                align-items: center;
                margin-bottom: 10px;

                .rpart {
                    .yiel {
                        font-size: 24px;
                        font-weight: 600;
                        color: #BF1010;
                        margin-top: 15px;
                    }

                    .buydirec {
                        border-radius: 180px;
                        opacity: 1;
                        background: rgba(255, 255, 255, 0.7);
                        box-sizing: border-box;
                        border: 1px solid #00895F;
                        height: 20px;
                        display: flex;
                        font-size: 12px;
                        align-items: center;

                        .buydireclpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            background-color: #00895F;
                            color: #F5F7FE;
                            border-radius: 150px;
                        }

                        .buydirecrpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            color: #007954;
                        }
                    }
                }

                .srpart {
                    .yiel {
                        font-size: 24px;
                        font-weight: 600;
                        color: #00895F;
                        margin-top: 15px;
                    }

                    .buydirec {
                        border-radius: 180px;
                        opacity: 1;
                        background: rgba(255, 255, 255, 0.7);
                        box-sizing: border-box;
                        border: 1px solid #FA2525;
                        height: 20px;
                        display: flex;
                        font-size: 12px;
                        align-items: center;

                        .buydireclpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            background-color: #A22020;
                            color: #F5F7FE;
                            border-radius: 150px;
                        }

                        .buydirecrpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            color: #C50000;
                        }
                    }
                }

                .lpart {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .line1 {
                        font-size: 14px;
                        font-weight: bold;
                        color: #B5B3B3;
                    }

                    .line2 {
                        font-size: 12px;
                        color: #fff;
                    }

                    .line3 {
                        font-size: 14px;
                        color: #A2A0A8;
                    }

                    .line4 {
                        font-size: 12px;
                        color: #A2A0A8;
                    }
                }
            }

            .fitems {
                border-radius: 16px;
                background: radial-gradient(109% 109% at 50% 50%, #30293D 89%, #646464 100%);
                box-shadow: 0px 1px 2px 0px rgba(156, 0, 0, 0.37);
                height: 100px;
                display: flex;
                justify-content: space-between;
                padding: 10px 16px;
                align-items: center;
                margin-bottom: 10px;

                .rpart {
                    .yiel {
                        font-size: 24px;
                        font-weight: 600;
                        color: #BF1010;
                        margin-top: 15px;
                    }

                    .buydirec {
                        border-radius: 180px;
                        opacity: 1;
                        background: rgba(255, 255, 255, 0.7);
                        box-sizing: border-box;
                        border: 1px solid #00895F;
                        height: 20px;
                        display: flex;
                        font-size: 12px;
                        align-items: center;

                        .buydireclpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            background-color: #00895F;
                            color: #F5F7FE;
                            border-radius: 150px;
                        }

                        .buydirecrpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            color: #007954;
                        }
                    }
                }

                .srpart {
                    .yiel {
                        font-size: 24px;
                        font-weight: 600;
                        color: #00895F;
                        margin-top: 15px;
                    }

                    .buydirec {
                        border-radius: 180px;
                        opacity: 1;
                        background: rgba(255, 255, 255, 0.7);
                        box-sizing: border-box;
                        border: 1px solid #FA2525;
                        height: 20px;
                        display: flex;
                        font-size: 12px;
                        align-items: center;

                        .buydireclpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            background-color: #A22020;
                            color: #F5F7FE;
                            border-radius: 150px;
                        }

                        .buydirecrpart {
                            height: 100%;
                            padding: 0 10px;
                            display: flex;
                            align-items: center;
                            color: #C50000;
                        }
                    }
                }

                .lpart {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .line1 {
                        font-size: 14px;
                        font-weight: bold;
                        color: #B5B3B3;
                    }

                    .line2 {
                        font-size: 12px;
                        color: #fff;
                    }

                    .line3 {
                        font-size: 14px;
                        color: #A2A0A8;
                    }

                    .line4 {
                        font-size: 12px;
                        color: #A2A0A8;
                    }
                }
            }
        }

        .item2 {
            width: 788px;
            height: 100%;
            border-radius: 20px;
            background: #3C354A;

            .k-line-demo {
                border-radius: 20px;
                width: 100%;
                height: 100%;
            }
        }

        .item3 {
            width: 524px;
            height: 100%;
            border-radius: 20px;
            padding: 10px 10px 0 10px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 95%, rgba(255, 255, 255, 0.02) 95%, rgba(255, 255, 255, 0.25) 100%), #3C354A;

            .items {
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;

                .rpart {
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    text-align: end;

                    .txt1 {
                        font-size: 14px;
                        color: #fff;
                    }

                    .txt2 {
                        font-size: 12px;
                        color: #9A9A9A;
                    }
                }

                .lpart {
                    display: flex;
                    align-items: center;
                    height: 100%;

                    .moneyinfo {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .number {
                            display: flex;
                            font-size: 30px;
                            color: #FFFFFF;
                        }

                        .mtext {
                            font-size: 14px;
                            color: #9A9A9A;
                        }
                    }

                    .direction {
                        border-radius: 10px;
                        opacity: 1;
                        background: rgba(10, 9, 48, 0.3);
                        backdrop-filter: blur(20px);
                        height: 100%;
                        width: 70px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 16px;

                        img {
                            width: 30px;
                            height: 28px;
                        }
                    }
                }
            }

            .fitems {
                margin-bottom: 10px;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .rpart {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    text-align: end;
                    padding: 5px;

                    .txt1 {
                        font-size: 14px;
                        color: #fff;
                    }

                    .txt2 {
                        font-size: 12px;
                        color: #9A9A9A;
                    }
                }

                .lpart {
                    display: flex;
                    align-items: center;
                    height: 100%;

                    .moneyinfo {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .number {
                            display: flex;
                            font-size: 30px;
                            color: #FFFFFF;
                        }

                        .mtext {
                            font-size: 14px;
                            color: #9A9A9A;
                        }
                    }

                    .direction {
                        border-radius: 10px;
                        opacity: 1;
                        background: rgba(10, 9, 48, 0.3);
                        backdrop-filter: blur(20px);
                        height: 100%;
                        width: 70px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 16px;

                        img {
                            width: 30px;
                            height: 28px;
                        }
                    }
                }
            }


        }
    }
}

@font-face {
    font-family: 'MyCustomFont';
    src: url('@/assets/diy.ttf') format('truetype');
}

* {
    font-family: 'MyCustomFont';
}
</style>
