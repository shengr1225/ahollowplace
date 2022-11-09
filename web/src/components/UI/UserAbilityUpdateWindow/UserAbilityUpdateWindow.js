import { useState } from 'react'

import { Form, FieldError, Label, Submit, NumberField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Modal from 'src/components/UI/Modal'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      thumbnail
      desc
      label
      tuili
      yanji
      xiezuo
      gaoxiao
      qinggan
      ability
      knot
    }
  }
`

const AbilityCell = (props) => (
  <div className="flex justify-around my-4">
    <div className="flex self-center">
      <Label name={props.name} className="mr-2 min-w-[4rem] py-2">
        {props.title}
      </Label>
      <NumberField
        readOnly
        min={0}
        name={props.name}
        value={props.value}
        className="border rounded-full px-4 w-20 py-2"
      ></NumberField>
    </div>
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        onClick={props.minus}
        type="button"
        className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-600 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 border-r-0"
      >
        -
      </button>
      <button
        onClick={props.add}
        type="button"
        className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-600 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        +
      </button>
    </div>
    <FieldError name={props.name} className="rw-field-error" />
  </div>
)

const UserAbilityUpdateWindow = (props) => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated!')
      props.onClose()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [tuili, setTuili] = useState(props.user?.tuili)
  const [yanji, setYanji] = useState(props.user?.yanji)
  const [xiezuo, setXiezuo] = useState(props.user?.xiezuo)
  const [gaoxiao, setGaoxiao] = useState(props.user?.gaoxiao)
  const [qinggan, setQinggan] = useState(props.user?.qinggan)
  const [ability, setAbility] = useState(props.user?.ability)
  const onSubmit = () => {
    const input = {
      tuili: tuili,
      yanji: yanji,
      xiezuo: xiezuo,
      gaoxiao: gaoxiao,
      qinggan: qinggan,
      ability: ability,
    }
    updateUser({
      variables: {
        id: props.user?.id,
        input: input,
      },
    })
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="调整能力">
      <Form onSubmit={onSubmit} className="py-4">
        <AbilityCell
          name="tuili"
          title="推理"
          value={tuili}
          add={() => {
            if (ability >= 1) {
              setAbility(ability - 1)
              setTuili(tuili + 1)
            }
          }}
          minus={() => {
            if (tuili >= 1) {
              setAbility(ability + 1)
              setTuili(tuili - 1)
            }
          }}
        />

        <AbilityCell
          name="yanji"
          title="演技"
          value={yanji}
          add={() => {
            if (ability >= 1) {
              setAbility(ability - 1)
              setYanji(yanji + 1)
            }
          }}
          minus={() => {
            if (yanji >= 1) {
              setAbility(ability + 1)
              setYanji(yanji - 1)
            }
          }}
        />

        <AbilityCell
          name="xiezuo"
          title="协作"
          value={xiezuo}
          add={() => {
            if (ability >= 1) {
              setAbility(ability - 1)
              setXiezuo(xiezuo + 1)
            }
          }}
          minus={() => {
            if (xiezuo >= 1) {
              setAbility(ability + 1)
              setXiezuo(xiezuo - 1)
            }
          }}
        />

        <AbilityCell
          name="gaoxiao"
          title="搞笑"
          value={gaoxiao}
          add={() => {
            if (ability >= 1) {
              setAbility(ability - 1)
              setGaoxiao(gaoxiao + 1)
            }
          }}
          minus={() => {
            if (gaoxiao >= 1) {
              setAbility(ability + 1)
              setGaoxiao(gaoxiao - 1)
            }
          }}
        />

        <AbilityCell
          name="qinggan"
          title="情感"
          value={qinggan}
          add={() => {
            if (ability >= 1) {
              setAbility(ability - 1)
              setQinggan(qinggan + 1)
            }
          }}
          minus={() => {
            if (qinggan >= 1) {
              setAbility(ability + 1)
              setQinggan(qinggan - 1)
            }
          }}
        />

        <div className="flex justify-around border-t pt-6">
          <div>
            <span className="text-lg mr-2 font-bold">剩余点数:</span>
            <span>{ability}</span>
          </div>
          <Submit
            className="bg-primary-500 px-4 py-2 text-white rounded-lg"
            onSubmit={onSubmit}
          >
            保存
          </Submit>
        </div>
      </Form>
    </Modal>
  )
}

export default UserAbilityUpdateWindow
