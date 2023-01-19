import { useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import SearchJubensCell from 'src/cells/juben/SearchJubensCell/SearchJubensCell'
import StyleHeader from 'src/components/header/header'

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
      <MetaTags title="搜索" description="搜索想玩的剧本" />
      <Toaster />
      <div className="px-6">
        <StyleHeader showSearching={true} query={getUrlParam()} dark={true} />
      </div>
      <h1 className="pt-8 text-2xl text-center font-bold">搜索结果</h1>
      <SearchJubensCell input={getUrlParam()} />
    </>
  )
}

export default SearchPage
