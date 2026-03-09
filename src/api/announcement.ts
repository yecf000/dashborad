import http from "@/utils/request";
import { IAnnouncementList, IRequestData } from "./typing";

class AnnouncementApi {
 list(){
  return http.get<IRequestData<{lists:IAnnouncementList[]}>>({
    url: "/api/announcement/lists",
  });
 }

 detail(id:string){
  return http.get<IRequestData<IAnnouncementList>>({
    url: "/api/announcement/detail",
    data:{id}
  });
 }
}

export const announcementApi = new AnnouncementApi();
