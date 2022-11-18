import { Loading, Empty, Failure, Success } from './JubenSelectionCell'
import { standard } from './JubenSelectionCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : <></>
}

export const empty = () => {
  return Empty ? <Empty /> : <></>
}

export const failure = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
}

export const success = (args) => {
  return Success ? <Success {...standard()} {...args} /> : <></>
}

export default { title: 'Cells/JubenSelectionCell' }
