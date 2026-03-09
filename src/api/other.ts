import http from "@/utils/request";
import { IRequestData } from "./typing";

class OtherApi {
  currencyList(type: string) {
    const data = {
      type,
    };
    return http.get<IRequestData<{ token: string }>>({
      url: "/api/currency.currency/all",
      params: data,
    });
  }
  getTicker() {
    return http.get<IRequestData<{ token: string }>>({
      url: "/api/index/getTicker",
    });
  }
  goodsAddApi(
    instId: string,
    order_type: string,
    product_amount: string,
    product_type: string
  ) {
    const data = {
      instId,
      order_type,
      product_amount,
      product_type,
    };
    return http.post<IRequestData<{ token: string }>>({
      url: "/api/order.spot_goods_order/add",
      data: data,
    });
  }

  goodsListsApi() {
    return http.get<IRequestData<{ token: string }>>({
      url: "/api/order.spot_goods_order/lists",
    });
  }
  pedingListsApi(status: string) {
    const params = {
      status,
    };
    return http.get<IRequestData<{ token: string }>>({
      url: "/api/order.order/lists",
      params,
    });
  }

  orderAddApi(
    instId: string,
    product_amount: string,
    product_type: number,
    multiplier: number,
    stop_loss_price: any,
    stop_win_price: any,
    order_type: string
  ) {
    const data = {
      instId,
      product_amount,
      product_type,
      multiplier,
      stop_loss_price,
      stop_win_price,
      order_type,
    };
    return http.post<IRequestData<{ token: string }>>({
      url: "/api/order.order/add",
      data: data,
    });
  }

  usercurrencyList() {
    return http.get<IRequestData<{ token: string }>>({
      url: "/api/user/currency",
    });
  }
}

export const otherApi = new OtherApi();
