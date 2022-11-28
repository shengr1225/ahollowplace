import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  NumberField,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

import UserSelectionCell from 'src/components/User/UserSelectionCell/UserSelectionCell'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const JubenDriveForm = (props) => {
  const onSubmit = (data) => {
    if (!data.users || !data.users.length) {
      delete data.users
    } else {
      data.users = data.users?.map((id) => {
        return {
          id: parseInt(id),
        }
      })
    }
    if (!data.bookings || !data.bookings.length) {
      delete data.bookings
    } else {
      data.bookings = data.bookings?.map((id) => {
        return {
          id: parseInt(id),
        }
      })
    }
    props.onSave(data, props?.jubenDrive?.id)
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
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.jubenDrive?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="male"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Male
        </Label>

        <NumberField
          name="male"
          defaultValue={props.jubenDrive?.male}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="male" className="rw-field-error" />

        <Label
          name="female"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Female
        </Label>

        <NumberField
          name="female"
          defaultValue={props.jubenDrive?.female}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="female" className="rw-field-error" />

        <Label
          name="total"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Total
        </Label>

        <NumberField
          name="total"
          defaultValue={props.jubenDrive?.total}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="total" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.jubenDrive?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="jubenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Juben id
        </Label>

        <NumberField
          name="jubenId"
          defaultValue={props.jubenDrive?.jubenId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="jubenId" className="rw-field-error" />

        <Label
          name="timeSlotId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time slot id
        </Label>

        <NumberField
          name="timeSlotId"
          defaultValue={props.jubenDrive?.timeSlotId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="timeSlotId" className="rw-field-error" />

        <Label
          name="users"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        ></Label>

        <UserSelectionCell data={props.jubenDrive?.users} name="users" />

        <FieldError name="users" className="rw-field-error" />

        <Label
          name="bookings"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        ></Label>
        <SelectField
          name="bookings"
          aria-readonly
          multiple
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        >
          {props.jubenDrive?.bookings?.map((b) => (
            <option key={b.id} value={b.id}>
              {b.male}男 {b.female}女 {b.note}
            </option>
          ))}
        </SelectField>
        <FieldError name="bookings" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default JubenDriveForm
