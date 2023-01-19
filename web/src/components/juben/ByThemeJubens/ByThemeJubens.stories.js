import ByThemeJubens from './ByThemeJubens'
import { standard } from './ByThemeJubens.mock'
const sectionList = ['scary', 'fun', 'emotion', 'mechanism']

export const generated = () => {
  return (
    <ByThemeJubens
      key={new Date().getTime()}
      section={sectionList[0]}
      jubens={standard().jubens?.filter(
        (juben) => juben.section == sectionList[0]
      )}
    />
  )
}

export default { title: 'Juben/ByThemeJubens' }
