import { useState } from 'react'

import { PickerInline } from 'filestack-react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const thumbnailSize = (url) => {
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:100')
  return parts.join('/')
}

const UserForm = (props) => {
  const [thumbnail, setThumbnail] = useState(props.user?.thumbnail)
  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, { thumbnail })
    dataWithUrl.label = dataWithUrl.label.join(',')
    dataWithUrl.knot = dataWithUrl.knot.join(',')
    props.onSave(dataWithUrl, props?.user?.id)
  }

  const onFileUpload = (response) => {
    setThumbnail(response.filesUploaded[0].url)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="jubenDriveId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Juben drive id
        </Label>

        <NumberField
          name="jubenDriveId"
          defaultValue={props.user?.jubenDriveId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="jubenDriveId" className="rw-field-error" />

        <Label
          name="thumbnail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Thumbnail
        </Label>

        <PickerInline
          apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          onSuccess={onFileUpload}
        >
          <div
            style={{ display: thumbnail ? 'none' : 'block', height: '500px' }}
          ></div>
        </PickerInline>

        {thumbnail && (
          <img
            alt={props.user?.name}
            src={thumbnailSize(thumbnail)}
            style={{ marginTop: '2rem' }}
          />
        )}

        <FieldError name="thumbnail" className="rw-field-error" />

        <Label
          name="desc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Desc
        </Label>

        <TextField
          name="desc"
          defaultValue={props.user?.desc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="desc" className="rw-field-error" />

        <Label
          name="label"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Label
        </Label>

        <SelectField
          multiple={true}
          name="label"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
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
        </SelectField>

        <FieldError name="label" className="rw-field-error" />

        <Label
          name="tuili"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tuili
        </Label>

        <TextField
          name="tuili"
          defaultValue={props.user?.tuili}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="tuili" className="rw-field-error" />

        <Label
          name="yanji"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Yanji
        </Label>

        <TextField
          name="yanji"
          defaultValue={props.user?.yanji}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="yanji" className="rw-field-error" />

        <Label
          name="xiezuo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Xiezuo
        </Label>

        <TextField
          name="xiezuo"
          defaultValue={props.user?.xiezuo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="xiezuo" className="rw-field-error" />

        <Label
          name="gaoxiao"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gaoxiao
        </Label>

        <TextField
          name="gaoxiao"
          defaultValue={props.user?.gaoxiao}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="gaoxiao" className="rw-field-error" />

        <Label
          name="qinggan"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Qinggan
        </Label>

        <TextField
          name="qinggan"
          defaultValue={props.user?.qinggan}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="qinggan" className="rw-field-error" />

        <Label
          name="ability"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ability
        </Label>

        <TextField
          name="ability"
          defaultValue={props.user?.ability}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="ability" className="rw-field-error" />

        <Label
          name="currentExp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          CurrentExp
        </Label>

        <TextField
          name="currentExp"
          defaultValue={props.user?.currentExp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="currentExp" className="rw-field-error" />

        <Label
          name="knot"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Knot
        </Label>

        <SelectField
          multiple
          name="knot"
          defaultValue={props.user?.knot?.split(',')}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
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
        </SelectField>

        <FieldError name="knot" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
