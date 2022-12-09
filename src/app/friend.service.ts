import { map } from "rxjs";

export class FriendService{
    getfriendname():  String[]{
        return ["test1","test2","test3","test4","test5","test6","test7"]
    }
    getimg(): String[]{
        return["https://picsum.photos/id/15/100/100","https://picsum.photos/id/13/100/100","https://picsum.photos/id/14/100/100","https://picsum.photos/id/12/100/100","https://picsum.photos/id/11/100/100","https://picsum.photos/id/10/100/100","https://picsum.photos/id/16/100/100"]
    }
    getState(): String[]{
        return["online","online","offline","online","offline","online","offline"]
    }
}