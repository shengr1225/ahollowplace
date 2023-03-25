import { useState } from 'react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  DateField,
  TextField,
  Submit,
  NumberField,
} from '@redwoodjs/forms'

import JubenSelectionCell from 'src/cells/juben/admin/SelectFieldCell/SelectFieldCell'
import TimeSlotSelectionCell from 'src/cells/timeslot/admin/SelectFieldCell/SelectFieldCell'
import UserSelectionCell from 'src/cells/user/admin/SelectField/SelectFieldCell'
import { getLocalTime } from 'src/utility/dateUtil'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/T\d{2}\:\d{2}\:\d{2}\.\d{3}\w/, '')
  }
}

const BookingForm = (props) => {
  const onSubmit = (data) => {
    data.date = getLocalTime(data.date)
    if (!data.users) {
      delete data.users
    } else {
      data.users = data.users?.map((id) => {
        return {
          id: parseInt(id),
        }
      })
    }
    props.onSave(data, props?.booking?.id)
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

        <DateField
          name="date"
          defaultValue={formatDatetime(props.booking?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="total"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Total
        </Label>

        <NumberField
          name="total"
          defaultValue={props.booking?.total}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="total" className="rw-field-error" />

        <Label
          name="male"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Male
        </Label>

        <NumberField
          name="male"
          defaultValue={props.booking?.male}
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
          defaultValue={props.booking?.female}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="female" className="rw-field-error" />

        <Label
          name="note"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Note
        </Label>

        <TextField
          name="note"
          defaultValue={props.booking?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="note" className="rw-field-error" />

        <Label
          name="jubenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Juben id
        </Label>

        <JubenSelectionCell selectJubenId={props.booking?.jubenId} />

        <FieldError name="jubenId" className="rw-field-error" />

        <Label
          name="timeSlotId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time slot id
        </Label>

        <TimeSlotSelectionCell
          name="timeSlotId"
          selectTimeSlotId={[{ id: props.booking?.timeSlotId }]}
        />

        <FieldError name="timeSlotId" className="rw-field-error" />

        <Label
          name="users"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        ></Label>

        <UserSelectionCell data={props?.booking?.users} name="users" />

        <FieldError name="users" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookingForm
