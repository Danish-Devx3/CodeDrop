"use client"
import { useSnippetContext } from '@/context/SnippetsContext';
import React from 'react'
import Categories from '../Components/Categories/Categories';
import Snippet from '../Components/Snippet/Snippet';
import { ISnippet } from '@/types/types';


function page() {
    const {popularSnippets} = useSnippetContext();
  return (
    <main>
        <Categories />

        <div className='px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {popularSnippets.snippets?.map((snippet: ISnippet) =>{
                return <Snippet key={snippet._id} snippet={snippet} />
            } )}
        </div>
    </main>
  )
}

export default page
