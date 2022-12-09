import { getDatabase, ref, set,get , child} from "firebase/database";

function writeMessageData(chatroomId:number,username:String,message:String, time:Date) {
  const db = getDatabase();
  set(ref(db, 'chatroom/' + chatroomId), {
    username: username,
    message:message,
    time:time
  });
}
function readMessageData(chatroomId:number){
  const dbRef = ref(getDatabase());
  get(child(dbRef, `chatroom/${chatroomId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

