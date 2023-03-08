import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import { useAuth } from 'src/auth'
import JubenSelectionCell from 'src/cells/juben/admin/SelectFieldCell/SelectFieldCell'

const ReviewForm = (props) => {
  const { currentUser, isAuthenticated } = useAuth()

  const onSubmit = (data) => {
    data.jubenId = parseInt(data.jubenId)
    props.onSave(data, props?.review?.id)
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
          name="jubenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Juben id
        </Label>

        <JubenSelectionCell id={props.review?.jubenId} name="jubenId" />

        <FieldError name="jubenId" className="rw-field-error" />

        <Label
          name="dm"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          DM
        </Label>

        <TextField
          name="dm"
          defaultValue={props.review?.dm}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dm" className="rw-field-error" />
        <Label
          name="rateOfJuben"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate of juben (1-5分)
        </Label>

        <NumberField
          name="rateOfJuben"
          defaultValue={props.review?.rateOfJuben}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rateOfJuben" className="rw-field-error" />

        <Label
          name="reviewOfJuben"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Review of juben(关于剧本的评价)
        </Label>

        <TextField
          name="reviewOfJuben"
          defaultValue={props.review?.reviewOfJuben}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="reviewOfJuben" className="rw-field-error" />

        <Label
          name="rateOfDM"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate of dm(1-5分)
        </Label>

        <NumberField
          name="rateOfDM"
          defaultValue={props.review?.rateOfDM}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rateOfDM" className="rw-field-error" />

        <Label
          name="reviewOfDM"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Review of dm(关于DM的评价)
        </Label>

        <TextField
          name="reviewOfDM"
          defaultValue={props.review?.reviewOfDM}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="reviewOfDM" className="rw-field-error" />

        <Label
          name="rateOfFood"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate of food(1-5)
        </Label>

        <NumberField
          name="rateOfFood"
          defaultValue={props.review?.rateOfFood}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="rateOfFood" className="rw-field-error" />

        <Label
          name="reviewOfFood"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Review of food(关于剧本搭配食物的评价)
        </Label>

        <TextField
          name="reviewOfFood"
          defaultValue={props.review?.reviewOfFood}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="reviewOfFood" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          UserId
        </Label>

        {isAuthenticated && (
          <NumberField
            name="userId"
            defaultValue={currentUser.id}
            className="rw-input"
            readOnly
            errorClassName="rw-input rw-input-error"
          />
        )}

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ReviewForm
