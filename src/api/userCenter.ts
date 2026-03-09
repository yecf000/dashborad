import http from "@/utils/request";
import { IRequestData, IUserData, IDepositData, IWithdrawalData, IWithDrawalDetailData, IInviteCode } from "./typing";

export class UserCenterApi {
  getOnlineService() {
    return http.get<IRequestData<{ phone: string }>>({
      url: "/api/index/customerService",
    });
  }
  getComplaintEmail() {
    return http.get<IRequestData<{ email: string }>>({
      url: "/api/index/customerEmail",
    });
  }

  getUserInfo() {
    return http.get<IRequestData<IUserData>>({
      url: "/api/user/info",
    });
  }

  getBankCardInfo() {
    return http.get<IRequestData<{ lists: IDepositData[] }>>({
      url: "/api/wallet.wallet/lists",
      data:{wallet_type:'bank'}
    });
  }

  getDigitalCurrencyInfo() {
    return http.get<IRequestData<{ lists: IDepositData[] }>>({
      url: "/api/wallet.wallet/lists",
      data:{wallet_type:'digital_currency'}
    });
  }



  recharge(req: {
    /**
     * 充值金额
     */
    amount: string;
    /**
     * 凭证
     */
    certificate: string;
    /**
     * 商户收款id
     */
    wallet_id: string;
}) {
    return http.post<IRequestData>({
      url: "/api/wallet.recharge/add",
      data: req,
    });
  }

  getWithdrawalConfig() {
    return http.get<IRequestData<IWithdrawalData>>({
      url: "/api/wallet.withdraw/getConfig",
    });
  }

  getWithdrawalDetailList(req:{
    wallet_type: 'bank' | 'digital_currency';
  }){
    return http.get<IRequestData<{lists:IWithDrawalDetailData[]}>>({
      url: "/api/wallet.withdraw/lists",
      data: req,
    });

  }

  withdrawalBankCard(req:{
    /**
     * 银行名称
     */
    bank_name: string;
    /**
     * 账户
     */
    payee_account: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 提现数量
     */
    ustd_amount: string;
    [property: string]: any;
}){
  return http.post<IRequestData>({
    url: "/api/wallet.withdraw/addBank",
    data: req,
  });

}

withdrawalChain(req:{

  dc_address:string
  /**
   * 备注
   */
  remark?: string;
  /**
   * 提现数量
   */
  ustd_amount: string;
 
}){
return http.post<IRequestData>({
  url: "/api/wallet.withdraw/addChain",
  data: req,
});

}


getInviteCode(){
  return http.get<IRequestData<IInviteCode>>({
    url: "/api/user/getInviteCode",
  });

}

resetPassword (req: {
  /**
   * 旧密码
   */
  old_password: string;
  /**
   * 新密码
   */
  password: string;
  /**
   * 确认密码
   */
  password_confirm: string;
}){
  return http.post<IRequestData>({
    url: "/api/user/changePassword",
    data: req,
  });

}

authentication(req:{
  /**
   * 证件背面
   */
  back_credentials: string;
  /**
   * 证件正面
   */
  front_credentials: string;
  /**
   * 证件号码
   */
  id_card: string;
  /**
   * 姓名
   */
  real_name: string;

}){
return http.post<IRequestData>({
  url: "/api/user/authentication",
  data: req,
});

}



}

export const userCenterApi = new UserCenterApi();
