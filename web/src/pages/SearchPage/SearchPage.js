
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import SearchJubensCell from 'src/components/SearchJubensCell/SearchJubensCell'
import { trigger } from 'src/utility/event'
import StyleHeader from 'src/components/StyleHeader/StyleHeader'
import { useLocation } from '@redwoodjs/router'

const SearchPage = () => {

  const getUrlParam = () => {
    const searchParam = useLocation().search
    const query = new URLSearchParams(searchParam)
    const date = new Date(query.get('date'))
    return {
      name: query.get('name'),
      date: date,
      people: query.get('people'),
    }
  }

  return (
    <>
      <MetaTags title="Search" description="Search page" />
      <Toaster />
      <div className='px-6'>
        <StyleHeader showSearching={true} query={getUrlParam()} dark={true}/>
      </div>
      <h1 className="pt-8 text-2xl text-center font-bold">搜索结果</h1>
      <SearchJubensCell input={getUrlParam()} />
    </>
  )
}

export default SearchPage
