import Sidebar from "@/app/Components/Sidebar/Sidebar"
import React from "react"

interface props {
    children: React.ReactNode
}

export default function ContentProvider({children}:props) {
  return (
    <div className="relative">
      <Sidebar/>
      <div className="mt-[8vh] ml-[15rem]">
        {children}
      </div>
    </div>
  )
}
