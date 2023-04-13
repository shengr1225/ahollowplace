import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
} from '@chakra-ui/react'

import {
  Form,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
  TextAreaField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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
      knot
    }
  }
`

const UserProfileUpdateWindow = (props) => {
  const onSubmit = (data) => {
    data.knot = data.knot?.join(',')
    data.label = data.label?.join(',')
    updateUser({
      variables: {
        id: props.user?.id,
        input: data,
      },
    })
  }

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated!')
      props.onClose()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} width="80">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>更新资料</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form onSubmit={onSubmit} className="py-4">
            <div className="flex justify-start">
              <Label
                name="name"
                className="mr-4 min-w-[4rem]"
                errorClassName=""
              >
                昵称:
              </Label>

              <Input
                as={TextField}
                name="name"
                defaultValue={props.user?.name}
                className="border rounded-lg p-2 w-full"
                errorClassName=""
              />

              <FieldError name="name" className="rw-field-error" />
            </div>

            <div className="flex justify-start my-4">
              <Label
                name="desc"
                className="mr-4 min-w-[4rem]"
                errorClassName="rw-label rw-label-error"
              >
                简介
              </Label>

              <Input
                as={TextAreaField}
                name="desc"
                defaultValue={props.user?.desc}
                className="border rounded-lg p-2 w-full"
                errorClassName="rw-input-error"
              />

              <FieldError name="desc" className="rw-field-error" />
            </div>

            <div className="flex justify-start">
              <Label name="label" className="mr-4 min-w-[4rem]">
                人设
              </Label>

              <Select
                height="48"
                as={SelectField}
                multiple={true}
                name="label"
                defaultValue={props.user?.label?.split(',')}
                validation={{
                  required: true,
                  validate: {
                    matchesInitialValues: (value) => {
                      let returnValues = [true]
                      if (value?.length > 3) {
                        return '最多选择3个选项'
                      }
                      returnValues = value.map((element) => {
                        if (element == '请选择1-3个选项') {
                          return '请选择1-3个选项'
                        }
                        return returnValues[0]
                      })
                      return returnValues[0]
                    },
                  },
                }}
              >
                <option>请选择1-3个选项</option>
                <option value="有秘密的角色，同时能安静地推理故事中更多真相">
                  有秘密的角色，同时能安静地推理故事中更多真相
                </option>
                <option value="接近风暴中心的角色，用话术引领全场的节奏并带动他人情绪">
                  接近风暴中心的角色，用话术引领全场的节奏并带动他人情绪
                </option>
                <option value="悬疑小说视角，带着求知欲跟随角色情绪探索故事真相">
                  悬疑小说视角，带着求知欲跟随角色情绪探索故事真相
                </option>
                <option value="我是戏精">我是戏精</option>
                <option value="因为爱">因为爱</option>
                <option value="温柔">温柔</option>
                <option value="释然">释然</option>
                <option value="坚定">坚定</option>
                <option value="跑起来怼起来">跑起来怼起来</option>
                <option value="谢君红尘一瞥">谢君红尘一瞥</option>
                <option value="櫻花紛飛時">櫻花紛飛時</option>
                <option value="北京爱上西雅图">北京爱上西雅图</option>
                <option value="浮生一梦">浮生一梦</option>
                <option value="时间匆匆，你就是我的夜空">
                  时间匆匆，你就是我的夜空
                </option>
                <option value="月下沙利叶">月下沙利叶</option>
                <option value="永远最爱的宁浩">永远最爱的宁浩</option>
              </Select>
            </div>
            <FieldError name="label" className="rw-field-error" />

            <div className="flex justify-start my-4">
              <Label name="knot" className="mr-4 min-w-[4rem]">
                情感羁绊
              </Label>

              <Select
                as={SelectField}
                h="48"
                multiple
                name="knot"
                defaultValue={props.user?.knot?.split(',')}
                validation={{
                  required: true,
                  validate: {
                    matchesInitialValues: (value) => {
                      let returnValues = [true]
                      if (value?.length > 3) {
                        return '最多选择3个选项'
                      }
                      returnValues = value.map((element) => {
                        if (element == '请选择1-3个选项') {
                          return '请选择1-3个选项'
                        }
                        return returnValues[0]
                      })
                      return returnValues[0]
                    },
                  },
                }}
              >
                <option>请选择1-3个选项</option>
                <option>亲情</option>
                <option>隔代情</option>
                <option>暗恋</option>
                <option>干净澄澈的初恋</option>
                <option>怀念</option>
                <option>宠物</option>
                <option>爱情</option>
                <option>兄妹情</option>
                <option>义薄云天</option>
                <option>守护者</option>
                <option>孤独</option>
                <option>细腻弱势被动</option>
                <option>被保护</option>
                <option>被救赎</option>
                <option>不离不弃</option>
                <option>拯救</option>
                <option>被牵挂</option>
              </Select>
            </div>
            <FieldError name="knot" className="rw-field-error" />
            <Submit className="mx-auto rw-button rw-button-blue mt-8">
              保存
            </Submit>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserProfileUpdateWindow
