import { motion, useScroll } from 'framer-motion'
import { MagnifyingGlass } from 'react-loader-spinner'

import { Link, routes } from '@redwoodjs/router'

// import { ReactComponent as SvgDotPatternIcon } from 'src/images/dot-pattern.svg'

import JubenSection from '../../../components/juben/ByThemeJubens/ByThemeJubens'

export const QUERY = gql`
  query FindJubenHighlights {
    jubens {
      id
      name
      score
      image
      desc
      section
      sections
      players
      photos
    }
  }
`

export const Loading = () => (
  <div>
    <MagnifyingGlass
      width="200"
      ariaLabel="loading"
      wrapperClass="mx-auto mt-5"
    />
  </div>
)

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No jubens yet. '}
      <Link to={routes.newJuben()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ jubens }) => {
  const sectionList = ['scary', 'fun', 'emotion', 'mechanism', 'mystery']
  const { scrollYProgress } = useScroll()

  return (
    <div className="relative">
      {sectionList.map((section, i) => (
        <JubenSection
          key={i}
          section={section}
          jubens={jubens.filter((juben) => juben.section == section)}
        ></JubenSection>
      ))}
      {/* <SvgDotPatternIcon className="absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24" />
      <SvgDotPatternIcon className="absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24" />
      <SvgDotPatternIcon className="absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24" />
      <SvgDotPatternIcon className="absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24" /> */}
    </div>
  )
}
