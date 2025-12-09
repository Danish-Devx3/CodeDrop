"use client"
import { useGlobalContext } from '@/context/globalContext';
import { useUserContext } from '@/context/userContext';


import { arrowLeft, bars, bookmarkIcon, box, fire, gear, help, home, users } from '@/utils/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'

function Sidebar() {
  const { user } = useUserContext();

  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();

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
    <div className={`fixed z-20 bg-sidebar h-full ${isSidebarOpen ? 'w-[12rem]' : 'w-[3.2rem]'} border-r border-sidebar-border`}>
      <span className='shadow-md bg-sidebar w-[45px] py-[0.8rem] absolute z-50 top-[21px] right-[-47px] cursor-pointer text-xl text-sidebar-foreground/60 flex items-center justify-center rounded-tr-lg rounded-br-lg'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >{isSidebarOpen ? arrowLeft : bars}</span>
      <nav className='h-full flex flex-col justify-between'>
        <div className='mt-4 flex flex-1 flex-col justify-between'>
          <ul>
            {
              menu.slice(0, -2).map((item) => {
                return (
                  <li className={`sidebar-nav-item group my-[.3rem] px-4 py-[.6rem] cursor-pointer ${pathname === item.url ? "active-nav-item text-sidebar-foreground" : "text-muted-foreground/60 hover:text-sidebar-foreground"}`} key={item.id}
                    onClick={() => router.push(item.url)}
                  >
                    <Link className='grid grid-cols-[40px_1fr] items-center text-inherit relative z-10' href={item.url}>
                      <span className={pathname === item.url ? "text-sidebar-foreground" : "text-muted-foreground group-hover:text-sidebar-foreground"}>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ul>

          <ul className={` ${isSidebarOpen ? "mb-2" : "mb-[5.2rem]"} `}>
            {
              menu.slice(-2).map((item) => {
                return (
                  <li className={`sidebar-nav-item group my-[.3rem] px-4 py-[.6rem] cursor-pointer ${pathname === item.url ? "active-nav-item text-sidebar-foreground" : "text-muted-foreground/60 hover:text-sidebar-foreground"}`} key={item.id}
                    onClick={() => router.push(item.url)}
                  >
                    <Link className='grid grid-cols-[40px_1fr] items-center text-inherit relative z-10' href={item.url}>
                      <span className={pathname === item.url ? "text-sidebar-foreground" : "text-muted-foreground group-hover:text-sidebar-foreground"}>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        {isSidebarOpen && <footer className='mb-[5rem] p-4 border-t border-sidebar-border text-muted-foreground '>
          <ul className='flex items-center justify-center gap-4'>
            <li>
              <Link className='underline text-sm hover:text-primary' href={"/terms"}>Terms</Link>
            </li>
            <li>
              <Link className='underline text-sm hover:text-primary' href={"/privacy"}>Privacy</Link>
            </li>
            <li>
              <Link className='underline text-sm hover:text-primary' href={"/help"}>Help</Link>
            </li>
          </ul>
          <p className='text-center text-sm mt-4'>&copy; {new Date().getFullYear()} <Link href={"https://danish-portfolio-be.netlify.app/"} target='_blank' >Danish Dev</Link> All&nbsp;rights</p>
        </footer>}
      </nav>


    </div>
  )
}

export default Sidebar
