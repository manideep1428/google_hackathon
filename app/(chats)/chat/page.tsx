import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';


function Chat(){
  let id = uuidv4();
    redirect(`chat/${id}`)
}
export default Chat