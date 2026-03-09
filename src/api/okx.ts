import http from "@/utils/okxrequest";
import { IRequestData } from "./typing";

class OkxApi {
    // 获取交易产品基础信息
    instruments(params: {
        instType: string;
        instId?: string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/account/instruments",
            params
        });
    }

    // 账单流水查询
    billsarchive(params: {
        instType?: string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/account/bills-archive",
            params
        });
    }

    // 查看持仓信息
    positions(params: {
        instType?: string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/account/positions",
            params
        });
    }

    // 查看历史持仓信息
    positionshistory(params: {
        instType?: string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/account/positions-history",
            params
        });
    }




    testinstruments(params: {
        instType: string;
    }
    ) {
        return http.post<IRequestData<{ token: string }>>({
            url: "/api/v5/account/instruments",
            data: params
        });
    }



    orderSell(req: {
        id: string;
    }
    ) {
        return http.post<IRequestData<{ token: string }>>({
            url: "/api/order.order/sell",
            data: req,
        });

    }

    setStop(req: {
        id: string;
        stop_loss_price: string;
        stop_win_price: string;
    }
    ) {
        return http.post<IRequestData<{ token: string }>>({
            url: "/api/order.order/setStop",
            data: req,
        });

    }


    // 下单
    order(req: {
        instId: string;   //产品ID，如 BTC-USDT-SWAP
        tdMode: string;   //保证金模式：isolated：逐仓 ；cross：全仓
        side: string;     //订单方向 buy：买， sell：卖
        sz: string;       //委托数量
        posSide: string;  //持仓方向在开平仓模式下必填，且仅可选择 long 或 short。 仅适用交割、永续。
        ordType: string;  //market：市价单
        attachAlgoOrds?: Array<{   //下单附带止盈止损信息
            slOrdPx: number; // 指定传-1
            slTriggerPx: string; //止损触发价
            slTriggerPxType: string;  // 指定传last
            tpOrdKind: string;  // 指定传condition
            tpOrdPx: number; // 指定传-1
            tpTriggerPx: string;//止盈触发价
            tpTriggerPxType: string;  // 指定传last
        }>;
    }) {
        return http.post<IRequestData<{ token: string }>>({
            url: "/api/v5/trade/order",
            data: req,
        });
    }


    // 设置杠杆
    setLeverage(req: {
        instId: string;//产品ID，如 BTC-USDT-SWAP
        lever: string;  //杠杆 如：5
        mgnMode: string; //保证金模式：isolated：逐仓 ；cross：全仓
    }) {
        return http.post<IRequestData<{ token: string }>>({
            url: "/api/v5/account/set-leverage",
            data: req,
        });
    }


    // 获取精英交易员合约多空持仓人数比
    statcontracts(params: {
        instId?: string;
        period?:string;
        limit?:string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/rubik/stat/contracts/long-short-account-ratio-contract-top-trader",
            params
        });
    }

    // 获取精英交易员合约多空持仓仓位比
    statposition(params: {
        instId?: string;
        period?:string;
        limit?:string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader",
            params
        });
    }

    // 获取合约多空持仓人数比
    accountratio(params: {
        instId?: string;
        period?:string;
        limit?:string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/rubik/stat/contracts/long-short-account-ratio-contract",
            params
        });
    }


     // 获取产品K线
     candles(params: {
        instId?: string;
        bar?:string;
        limit?:string;
    }
    ) {
        return http.get<IRequestData<{ token: string }>>({
            url: "/api/v5/market/candles",
            params
        });
    }

}

export const okxApi = new OkxApi();
