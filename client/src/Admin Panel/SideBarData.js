import React from 'react'
import {FaListAlt} from "react-icons/fa"
import {RiVideoAddFill} from "react-icons/ri"
import {RiUserSettingsFill} from "react-icons/ri"
import {FaUsersGear} from "react-icons/fa6"
import { TiUserAdd } from "react-icons/ti";
import { PiUserListBold } from "react-icons/pi";
export const SideBarData = [
    {
       title:"Film Listesi",
       icon: <FaListAlt/>,
       link: "/movielist"
    },
    {
        title:"Dizi Listesi",
        icon: <FaListAlt/>,
        link: "/serieslist"
     },
     {
      title:"Aktör Listesi",
      icon: <PiUserListBold/>,
      link: "/actorlist"
     },
     {
        title: "Film/Dizi Ekle",
        icon: <RiVideoAddFill/>,
        link: "/addmovie"
     },
     {
      title: "Aktör Ekle",
      icon: <TiUserAdd />,
      link: "/addactors"
     },
     {
        title:"Profilleri Güncelle",
        icon: <RiUserSettingsFill/>,
        link: "/updateprofile"
     },
     {
        title:"Kullanıcı Listesi",
        icon: <FaUsersGear/>,
        link: "/userlist"
     }

]

