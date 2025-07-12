"use client"
import { useUserContext } from '@/context/userContext';


import { arrowLeft, bars, bookmarkIcon, box, fire, gear, help, home, users } from '@/utils/Icons';
import { getFontOverrideCss } from 'next/dist/server/font-utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'

function Sidebar() {
    const {user} = useUserContext(); 

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const router = useRouter();

  const pathname = usePathname();

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
      name: isSidebarOpen ? "Favorites" : "",
      url: `${user ? "/favorites" : "/login"}`,
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


  const getIconColor = (url: string) => {
    return pathname === url ? "#aaa" : "#71717a";
  }

  return ( 
    <div className={`fixed z-20 bg-2 h-full ${isSidebarOpen ? 'w-[15rem]' : 'w-[5.2rem]'} border-r-[2px] border-rgba-3`}>
      <span className='u-shadow-2 bg-2 w-[45px] py-[0.8rem] absolute z-50 top-[21px] right-[-47px] cursor-pointer text-xl text-gray-400 flex items-center justify-center rounded-tr-lg rounded-br-lg  '>{isSidebarOpen ? arrowLeft : bars}</span>
      <nav className='h-full flex flex-col justify-between'>
        <div className='mt-4 flex flex-1 flex-col justify-between'>
          <ul>
            {
              menu.slice(0,-2).map((item)=>{
                return (
                  <li className={`sidebar-nav-item my-[.3rem] px-8 py-[.6rem] cursor-pointer ${pathname === item.url ? "active-nav-item" : "" }`} key={item.id}
                   onClick={()=> router.push(item.url)}
                  >
                    <Link className='grid grid-cols-[40px_1fr] items-center text-gray-200' href={item.url}>
                       <span style={{color: getIconColor(item.url)}} className='text-lg'>{item.icon}</span>
                       <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })
            }
            </ul>

            <ul className={` ${isSidebarOpen ? "mb-2" : "mb-[5.2rem]"} `}>
            {
              menu.slice(-2).map((item)=>{
                return (
                  <li className={`sidebar-nav-item my-[.3rem] px-8 py-[.6rem] cursor-pointer ${pathname === item.url ? "active-nav-item" : "" }`} key={item.id}
                   onClick={()=> router.push(item.url)}
                  >
                    <Link className='grid grid-cols-[40px_1fr] items-center text-gray-200' href={item.url}>
                       <span style={{color: getIconColor(item.url)}} className='text-lg'>{item.icon}</span>
                       <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })
            }
            </ul>
        </div>

        {isSidebarOpen && <footer className='mb-[5rem] p-4 border-t-[2px] border-rgba-3 text-gray-300 '>
          <ul className='flex items-center justify-center gap-4'>
            <li>
              <Link className='underline text-sm hover:text-green-400' href={"/terms"}>Terms</Link>
            </li>
            <li>
              <Link className='underline text-sm hover:text-green-400' href={"/privacy"}>Privacy</Link>
            </li>
            <li>
              <Link className='underline text-sm hover:text-green-400' href={"/help"}>Help</Link>
            </li>
          </ul>
          <p className='text-center text-sm mt-4'>&copy; {new Date().getFullYear()} <Link href={"/"}>Danish Dev</Link> All&nbsp;rights</p>
          </footer>}
      </nav>


    </div>
  )
}

export default Sidebar
