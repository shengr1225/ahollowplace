import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { PickerInline } from 'filestack-react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'

import UserSelectionCell from 'src/components/User/UserSelectionCell'
import { normalSize, listSize } from 'src/utility/helper'

const DELETE_PHOTO_OF_JUBEN = gql`
  mutation deletePhoto($id: Int!, $index: Int!) {
    deletePhotoOfJuben(id: $id, index: $index) {
      id
      photos
    }
  }
`

const JubenForm = (props) => {
  const [deletePhoto] = useMutation(DELETE_PHOTO_OF_JUBEN, {
    onCompleted: (result) => {
      toast.success('photo deleted')
      setPhotos(result.deletePhotoOfJuben.photos)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [image, setImage] = useState(props?.juben?.image)
  const [photos, setPhotos] = useState(props?.juben?.photos)
  const [addPhotos, setAddPhotos] = useState(false)

  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, { image, photos })
    if (!dataWithUrl.mvps) {
      delete dataWithUrl.mvps
    } else {
      dataWithUrl.mvps = dataWithUrl.mvps?.map((id) => {
        return {
          id: parseInt(id),
        }
      })
    }
    props.onSave(dataWithUrl, props?.juben?.id)
  }

  const onImageUpload = (response) => {
    setImage(response.filesUploaded[0].url)
  }

  const onPhotoUpload = (response) => {
    let urls = photos || ''
    response.filesUploaded.forEach((file) => {
      if (urls) {
        urls += ','
      }
      urls += file.url
    })
    setPhotos(urls)
    setAddPhotos(false)
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
          defaultValue={props.juben?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="score"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Score
        </Label>

        <TextField
          name="score"
          defaultValue={props.juben?.score}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="score" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        <PickerInline
          apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          onSuccess={onImageUpload}
        >
          <div
            style={{ display: image ? 'none' : 'block', height: '500px' }}
          ></div>
        </PickerInline>

        {image && (
          <img
            alt={props.juben?.name}
            src={normalSize(image)}
            style={{ marginTop: '2rem' }}
          />
        )}

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Photos
        </Label>

        <PickerInline
          apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          onSuccess={onPhotoUpload}
          pickerOptions={{ maxFiles: 10 }}
        >
          <div
            style={{
              display: photos && !addPhotos ? 'none' : 'block',
              height: '100px',
            }}
          ></div>
        </PickerInline>

        <div className="flex">
          {photos &&
            photos.split(',').map((p, index) => {
              return (
                <div className="mr-1" key={p}>
                  <img
                    alt={p}
                    src={listSize(p)}
                    style={{ marginTop: '2rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      deletePhoto({
                        variables: { id: props.juben.id, index: index },
                      })
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )
            })}
          <button
            type="button"
            onClick={() => {
              setAddPhotos(true)
            }}
          >
            Add Photos
          </button>
        </div>

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="desc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Desc
        </Label>

        <TextField
          name="desc"
          defaultValue={props.juben?.desc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="desc" className="rw-field-error" />

        <Label
          name="section"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Section
        </Label>

        <TextField
          name="section"
          defaultValue={props.juben?.section}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="section" className="rw-field-error" />

        <Label
          name="sections"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sections
        </Label>

        <TextField
          name="sections"
          defaultValue={props.juben?.sections}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="sections" className="rw-field-error" />

        <Label
          name="players"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Players
        </Label>

        <TextField
          name="players"
          defaultValue={props.juben?.players}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="players" className="rw-field-error" />

        <Label
          name="canSwitchSex"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Can switch sex
        </Label>

        <CheckboxField
          name="canSwitchSex"
          defaultChecked={props.juben?.canSwitchSex}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="canSwitchSex" className="rw-field-error" />

        <Label
          name="duration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Duration
        </Label>

        <NumberField
          name="duration"
          defaultValue={props.juben?.duration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="duration" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>

        <NumberField
          name="price"
          defaultValue={props.juben?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        <Label
          name="available"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        ></Label>

        <CheckboxField
          name="available"
          defaultChecked={props.juben?.available}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        ></CheckboxField>

        <FieldError name="available" className="rw-field-error" />

        <Label
          name="mvps"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        ></Label>

        <UserSelectionCell data={props.juben?.mvps} name="mvps" />

        <FieldError name="mvps" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default JubenForm
