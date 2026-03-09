import http from "@/utils/request";
import { IRequestData } from "./typing";

class LoginApi {
  sendCode(email: string) {
    const data = {
      email,
      scene: "YZMZC",
    };

    return http.post<typeof data>({
      url: "/api/email.email/sendCode",
      data,
    });
  }

  register(account:string,password:string,code:number,real_name:any,id_card:any,front_credentials:any,back_credentials:any,invite_code:any) {
    const data = {
     account,
     password,
     password_confirm:password,
     code,
     real_name,
     id_card,
     front_credentials,
     back_credentials,
     invite_code
    };
    return http.post<IRequestData>({
      url: "/api/login/register",
      data,
    });
  }
  login(account:string,password:string) {
    const data = {
     account,
     password,
    
    };
    return http.post<IRequestData<{token:string}>>({
      url: "/api/login/login",
      data,
    });
  }

  resetPassword(account:string,password:string,code:string) {
    const data = {
     account,
     code,
     password,
     password_confirm:password,
    
    };
    return http.post<IRequestData<{token:string}>>({
      url: "/api/user/resetPassword",
      data,
    });
  }
}

export const loginApi = new LoginApi();
