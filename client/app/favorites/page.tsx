"use client"
import { useSnippetContext } from '@/context/SnippetsContext'
import { useUserContext } from '@/context/userContext'
import useRedirect from '@/hooks/useUserRedirect'
import React, { useEffect } from 'react'
import Categories from '../Components/Categories/Categories'
import { ISnippet } from '@/types/types'
import Snippet from '../Components/Snippet/Snippet'

function page() {
  const {getLikedSnippets, likedSnippets} = useSnippetContext()

  const userId = useUserContext().user._id;
  useRedirect("/login");
  
  useEffect(()=>{
    (
     async ()=>{
      await getLikedSnippets(userId)
      }
    )();
  }, [userId])

  console.log(likedSnippets)
  
  return (
    <main>
      {userId && <Categories/>}

         <div className='px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 '>
            {likedSnippets?.map((snippet:ISnippet)=>
              <Snippet key={snippet._id} snippet={snippet} />
            )}
         </div>
    </main>
  )
}

export default page
