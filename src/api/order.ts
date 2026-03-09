import http from "@/utils/request";
import { IRequestData } from "./typing";

class OrderApi {


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

}

export const orderApi = new OrderApi();
