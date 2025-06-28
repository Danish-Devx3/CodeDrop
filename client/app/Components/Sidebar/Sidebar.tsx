"use client"
import { useUserContext } from '@/context/userContext';


import { arrowLeft, bars, bookmarkIcon, box, fire, gear, help, home, users } from '@/utils/Icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

function Sidebar() {
    const {user} = useUserContext(); 

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const router = useRouter();

  const menu = [
    {
      id: 1,
      name: isSidebarOpen ? "Home" : "",
      url: "/",
      icon: home,
    },

    {
      id: 4,
      name: isSidebarOpen ? "Popular" : "",
      url: "/popular",
      icon: fire,
    },
    {
      id: 5,
      name: isSidebarOpen ? "Top Creators" : "",
      url: `${user ? "/leaderboard" : "/login"}`,
      icon: users,
    },
    {
      id: 2,
      name: isSidebarOpen ? "Favourites" : "",
      url: `${user ? "/favourites" : "/login"}`,
      icon: bookmarkIcon,
    },
    {
      id: 3,
      name: isSidebarOpen ? "My Snippets" : "",
      url: `${user ? "/snippets" : "/login"}`,
      icon: box,
    },
    {
      id: 1,
      name: isSidebarOpen ? "Settings" : "",
      url: `${user._id ? "/profile/update" : "/login"}`,
      icon: gear,
    },
    {
      id: 2,
      name: isSidebarOpen ? "Help" : "",
      url: "/help",
      icon: help,
    },
  ];

  return ( 
    <div className={`fixed z-20 bg-2 h-full ${isSidebarOpen ? 'w-[15rem]' : 'w-[5.2rem]'} border-r-[2px] border-rgba-3`}>
      <span className='u-shadow-2 bg-2 w-[45px] py-[0.8rem] absolute z-50 top-[21px] right-[-47px] cursor-pointer text-xl text-gray-400 flex items-center justify-center rounded-tr-lg rounded-br-lg  '>{isSidebarOpen ? arrowLeft : bars}</span>
      <nav className='h-full flex flex-col justify-between'>
        <div className='mt-4 flex flex-1 flex-col justify-between'>
            {
              menu.map((item)=>{
                return (
                  <li>
                    <Link className='grid grid-cols-[40px_1fr] items-center text-gray-200' href={item.url}>
                       <span className='text-lg'>{item.icon}</span>
                       <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })
            }
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
