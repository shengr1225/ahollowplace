import JubenSection from './JubenSection'
import { standard } from './JubenSection.mock'
const sectionList = ['scary', 'fun', 'emotion', 'mechanism']

export const generated = () => {
  return (
    <JubenSection
      key={new Date().getTime()}
      section={sectionList[0]}
      jubens={standard().jubens?.filter(
        (juben) => juben.section == sectionList[0]
      )}
    />
  )
}

export default { title: 'Juben/JubenSection' }
