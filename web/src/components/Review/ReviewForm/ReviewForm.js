import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const ReviewForm = (props) => {
  const onSubmit = (data) => {
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

        <NumberField
          name="jubenId"
          defaultValue={props.review?.jubenId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="jubenId" className="rw-field-error" />

        <Label
          name="rateOfJuben"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate of juben
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
          Review of juben
        </Label>

        <TextField
          name="reviewOfJuben"
          defaultValue={props.review?.reviewOfJuben}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="reviewOfJuben" className="rw-field-error" />

        <Label
          name="rateOfDM"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate of dm
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
          Review of dm
        </Label>

        <TextField
          name="reviewOfDM"
          defaultValue={props.review?.reviewOfDM}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="reviewOfDM" className="rw-field-error" />

        <Label
          name="rateOfFood"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate of food
        </Label>

        <NumberField
          name="rateOfFood"
          defaultValue={props.review?.rateOfFood}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rateOfFood" className="rw-field-error" />

        <Label
          name="reviewOfFood"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Review of food
        </Label>

        <TextField
          name="reviewOfFood"
          defaultValue={props.review?.reviewOfFood}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="reviewOfFood" className="rw-field-error" />

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
