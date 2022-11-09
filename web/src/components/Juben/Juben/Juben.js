import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_JUBEN_MUTATION = gql`
  mutation DeleteJubenMutation($id: Int!) {
    deleteJuben(id: $id) {
      id
    }
  }
`

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Juben = ({ juben }) => {
  const [deleteJuben] = useMutation(DELETE_JUBEN_MUTATION, {
    onCompleted: () => {
      toast.success('Juben deleted')
      navigate(routes.jubens())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete juben ' + id + '?')) {
      deleteJuben({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Juben {juben.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{juben.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{juben.name}</td>
            </tr>
            <tr>
              <th>Score</th>
              <td>{juben.score}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>{juben.image}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{juben.desc}</td>
            </tr>
            <tr>
              <th>Section</th>
              <td>{juben.section}</td>
            </tr>
            <tr>
              <th>Sections</th>
              <td>{juben.sections}</td>
            </tr>
            <tr>
              <th>Players</th>
              <td>{juben.players}</td>
            </tr>
            <tr>
              <th>Can switch sex</th>
              <td>{checkboxInputTag(juben.canSwitchSex)}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{juben.duration}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{juben.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJuben({ id: juben.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(juben.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Juben
