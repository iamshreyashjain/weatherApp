import Auth from "./Auth";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie'
import Chat from "./Chat";


const cookie = new Cookies()

export default function App() {
  const [isAuth, setisAuth] = useState(cookie.get('auth-token'))
  const [room, setRoom] = useState(true)
    if(!isAuth){
      return(
        <div> <Auth setisAuth= {setisAuth} /></div>
      );
    }
        return(
        <Chat/>
      )
}
