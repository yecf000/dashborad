export interface IRequestData<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface IAnnouncementList {
  /**
   * 内容
   */
  content?: string;
  /**
   * 发布时间
   */
  create_time?: string;
  id?: number;
  /**
   * 标题
   */
  title?: string;
}

export interface IUserData {
  /**
   * 账号
   */
  account: string;
  /**
   * 认证状态
   */
  authentication_status: number;
  /**
   * 认证状态描述
   */
  authentication_status_desc: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 证件反面
   */
  back_credentials: string;
  create_time: string;
  /**
   * 证件正面
   */
  front_credentials: string;
  /**
   * id
   */
  id: number;
  /**
   * 证件号码
   */
  id_card: null;
  /**
   * 邀请码
   */
  invite_code: string;
  /**
   * 邀请人
   */
  invite_user_id: null;
  mobile: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 姓名
   */
  real_name: string;
  sex: string;
  /**
   * 用户编码
   */
  sn: number;
  /**
   * USTD
   */
  user_money: string;
  version: string;
}

export interface IFileData {
  cid: number;
  id: string;
  name: string;
  type: number;
  uri: string;
  url: string;
}

export interface IDepositData {
  /**
   * 银行地址
   */
  bank_address?: string;
  /**
   * 银行名称
   */
  bank_name?: string;
  bank_swift?: string;
  /**
   * 提币地址
   */
  dc_address?: string;
  id?: string;
  /**
   * 收款人账户
   */
  payee_account?: string;
  /**
   * 收款人姓名
   */
  payee_name?: string;
  /**
   * 二维码链接
   */
  qrcode: string;
  /**
   * 钱包类型
   */
  wallet_type?: string;
}

export interface IWithdrawalData {
  /**
   * 提现手续费比例
   */
  handling_fee_ratio: string;
  /**
   * 最低提现额度
   */
  min_amount: string;
}

export interface IWithDrawalDetailData {
  admin_remark?: null;
  /**
   * 实际到账USDT数量
   */
  amount?: string;
  /**
   * 审核时间
   */
  audit_time?: null;
  /**
   * 发起时间
   */
  create_time?: string;
  /**
   * 货币
   */
  currency?: ICurrency;
  currency_id?: number;
  id?: number;
  /**
   * 拒绝理由
   */
  refused_reason?: null;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 手续费
   */
  service_charge?: string;
  /**
   * 状态
   */
  status?: string;

  status_desc?: string;
  /**
   * 提现USDT数量
   */
  ustd_amount?: string;
  user_id?: number;
  bank_name?: string;
  payee_account?: string;
  dc_address?: string;
}

/**
 * 货币
 */
export interface ICurrency {
  id: number;
  /**
   * 图标
   */
  logo: string;
  nickname: string;
  /**
   * 简称
   */
  title: string;
}

/**
 * 钱包
 */
export interface IWalletInfo {
  /**
   * 银行地址
   */
  bank_address: string;
  /**
   * 银行名称
   */
  bank_name: string;
  bank_swift: string;
  /**
   * 提币地址
   */
  dc_address: string;
  /**
   * 收款人账号
   */
  payee_account: string;
  /**
   * 收款人
   */
  payee_name: string;
  wallet_type: string;
}

export interface IInviteCode {
  invite_code: string;
  invite_url: string;
}
