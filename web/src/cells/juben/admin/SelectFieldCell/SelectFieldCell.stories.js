import { Form } from '@redwoodjs/forms'

import { Loading, Empty, Failure, Success } from './SelectFieldCell'
import { standard } from './SelectFieldCell.mock'

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
  return <Form>{Success ? <Success {...standard()} {...args} /> : <></>}</Form>
}

export default { title: 'Cells/JubenSelectFieldCell' }
