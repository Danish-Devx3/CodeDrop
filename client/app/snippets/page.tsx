"use client"
import { useSnippetContext } from '@/context/SnippetsContext'
import { useUserContext } from '@/context/userContext';
import { ISnippet, IUser } from '@/types/types';
import { users } from '@/utils/Icons';
import React, { useEffect, useId } from 'react'
import Snippet from '../Components/Snippet/Snippet';
import Categories from '../Components/Categories/Categories';

function page() {
    
    const {getUserSnippets, userSnippets} = useSnippetContext();
    const userId = useUserContext().user?._id;

    useEffect(()=>{
        if(userId){
            getUserSnippets(userId);
        }
    },[userId])
    console.log(userSnippets)

  return (
    <>
    {
        userId && <Categories/>
    }
    <div className='px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
        
      {
        userSnippets?.snippets?.map((snippet: ISnippet) => {
            return <Snippet snippet={snippet} />
        })
      }

      {userSnippets?.snippets?.length === 0 && (
        <div className='flex items-center justify-center h-[90vh]'>
            <h1 className='text-4xl text-red-500'>No snippet found</h1>
        </div>
      )}
    </div>
    </>
  )

}

export default page
