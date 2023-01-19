import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/cells/juben/admin/JubensCell'

const DELETE_JUBEN_MUTATION = gql`
  mutation DeleteJubenMutation($id: Int!) {
    deleteJuben(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const thumbnail = (url) => {
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:100')
  return parts.join('/')
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const JubensList = ({ jubens }) => {
  const [deleteJuben] = useMutation(DELETE_JUBEN_MUTATION, {
    onCompleted: () => {
      toast.success('Juben deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete juben ' + id + '?')) {
      deleteJuben({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Score</th>
            <th>Image</th>
            <th>Desc</th>
            <th>Section</th>
            <th>Sections</th>
            <th>Players</th>
            <th>Can switch sex</th>
            <th>Duration</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {jubens.map((juben) => (
            <tr key={juben.id}>
              <td>{truncate(juben.id)}</td>
              <td>{truncate(juben.name)}</td>
              <td>{truncate(juben.score)}</td>
              <td>
                <a href={juben.image} target="_blank" rel="noreferrer">
                  <img
                    alt={juben.name}
                    src={thumbnail(juben.image)}
                    style={{ maxWidth: '50px' }}
                  />
                </a>
              </td>
              <td>{truncate(juben.desc)}</td>
              <td>{truncate(juben.section)}</td>
              <td>{truncate(juben.sections)}</td>
              <td>{truncate(juben.players)}</td>
              <td>{checkboxInputTag(juben.canSwitchSex)}</td>
              <td>{truncate(juben.duration)}</td>
              <td>{truncate(juben.price)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.juben({ id: juben.id })}
                    title={'Show juben ' + juben.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJuben({ id: juben.id })}
                    title={'Edit juben ' + juben.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete juben ' + juben.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(juben.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JubensList
