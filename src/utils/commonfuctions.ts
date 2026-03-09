import lang from '@/lang/index'

export const commonfuctions = {
  // 10 digit timestamp to time conversion
  formatTimestamp(value: number) {
    if (value) {
      const date = new Date(value * 1000); // 将10位时间戳转换为13位
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return "";
  },
  getlang(e: string | number){
    return lang[e]?lang[e][localStorage.getItem('lang')||'en']:''
  }
};
