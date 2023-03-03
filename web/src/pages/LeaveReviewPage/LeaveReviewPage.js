import { useEffect, useRef, useState } from 'react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
  TextAreaField,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import useReviewDimensions from 'src/hooks/useReviewDimensions'
import reviewBGMin from 'src/images/reviewBG-min.png'
import reviewBG from 'src/images/reviewBG.png'

const LeaveReviewPage = ({ juben, dm }) => {
  const [bgUrl, setBgUrl] = useState(reviewBGMin)

  useEffect(() => {
    const img = new Image()
    img.src = reviewBG
    img.onload = () => {
      setBgUrl(reviewBG)
    }
  }, [])

  const onSubmit = (data) => {
    console.log(data)
  }

  const container = useRef(null)
  const { originX, originY, containerWidth, containerHeight, bgSize } =
    useReviewDimensions(container)

  return (
    <>
      <MetaTags title="Leave a review" description="LeaveReview page" />
      <div
        className="h-full"
        style={{
          backgroundSize: '300%',
          backgroundImage: `url(${reviewBGMin})`,
        }}
      >
        <div
          className="bg-no-repeat h-full mx-auto"
          style={{
            height: '100%',
            backgroundImage: `url(${bgUrl})`,
            backgroundPosition: 'center',
            backgroundSize: bgSize,
          }}
        >
          <Form
            onSubmit={onSubmit}
            ref={container}
            className="absolute top-1/2 left-1/2 font-serif"
            style={{
              marginLeft: `-${originX}`,
              marginTop: `-${originY}`,
              width: `${containerWidth}`,
              height: `${containerHeight}`,
            }}
          >
            <FormError
              wrapperClassName="rw-form-error-wrapper"
              titleClassName="rw-form-error-title"
              listClassName="rw-form-error-list"
            />

            <div className="flex justify-center  md:mt-16 mt-12">
              <Label
                name="jubenId"
                className="text-xl font-extrabold mr-1"
                errorClassName="rw-label rw-label-error"
              >
                {decodeURIComponent(juben)}
              </Label>

              <NumberField
                type="hidden"
                name="jubenId"
                value={12}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{ required: true }}
              />
              <FieldError name="jubenId" className="rw-field-error" />

              <Label
                name="dm"
                className="text-xl font-extrabold"
                errorClassName="rw-label rw-label-error"
              >
                {decodeURIComponent(dm)}
              </Label>

              <TextField
                type="hidden"
                name="dm"
                value="小满"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{ required: true }}
              />
              <FieldError name="jubenId" className="rw-field-error" />
            </div>
            <div className="flex justify-end lg:mt-16 md:mt-10 mt-10">
              <NumberField
                name="rateOfJuben"
                className=" w-8 bg-transparent mr-20 text-lg outline-none"
                errorClassName="rw-input rw-input-error"
                defaultValue={5}
                validation={{ required: true, max: 5, min: 1 }}
              />

              <FieldError name="rateOfJuben" className="rw-field-error" />
            </div>
            <div className="flex justify-start mt-6 md:mt-8 w-100 px-4">
              <TextAreaField
                name="reviewOfJuben"
                className="bg-transparent outline-none text-sm w-full"
                defaultValue="..."
                errorClassName="rw-input rw-input-error"
              />

              <FieldError name="reviewOfJuben" className="rw-field-error" />
            </div>

            <div className="flex justify-end lg:mt-8 md:mt-6 mt-3">
              <NumberField
                name="rateOfDM"
                className=" w-8 bg-transparent mr-20 text-lg outline-none"
                errorClassName="rw-input rw-input-error"
                step={1}
                defaultValue={5}
                validation={{ required: true, max: 5, min: 1 }}
              />

              <FieldError name="rateOfDM" className="rw-field-error" />
            </div>
            <div className="flex justify-start mt-6 lg:mt-10 md:mt-8 w-100 px-4">
              <TextAreaField
                name="reviewOfDM"
                className="bg-transparent outline-none text-sm w-full"
                defaultValue="..."
                errorClassName="rw-input rw-input-error"
              />

              <FieldError name="reviewOfDM" className="rw-field-error" />
            </div>

            <div className="flex justify-end lg:mt-8 md:mt-5 mt-2">
              <NumberField
                name="rateOfFood"
                className=" w-8 bg-transparent mr-20  text-lg outline-none"
                errorClassName="rw-input rw-input-error"
                defaultValue={5}
                validation={{ required: true, max: 5, min: 1 }}
              />

              <FieldError name="rateOfFood" className="rw-field-error" />
            </div>
            <div className="flex justify-start mt-6 md:mt-10 w-100 px-4">
              <TextAreaField
                name="reviewOfFood"
                className="bg-transparent  outline-none text-sm w-3/4"
                errorClassName="rw-input rw-input-error"
                defaultValue="..."
              />

              <FieldError name="reviewOfFood" className="rw-field-error" />
            </div>
            <Submit className="rw-button bg-yellow-600 text-white mx-auto">
              提交
            </Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LeaveReviewPage
