import { useState, useEffect, useRef } from 'react'

import {
  Form,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
  TextAreaField,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import JubenLabelCell from 'src/cells/juben/JubenLabelCell'
import useReviewDimensions from 'src/hooks/useReviewDimensions'
import reviewBGMin from 'src/images/reviewBG-min.png'
import reviewBG from 'src/images/reviewBG.png'

const PreLoadBGWrapper = ({ children }) => (
  <div
    className="h-full"
    style={{
      backgroundSize: '300%',
      backgroundImage: `url(${reviewBGMin})`,
    }}
  >
    {children}
  </div>
)

const LazyLoadBGWrapper = ({ children, url, size }) => (
  <div
    className="bg-no-repeat h-full mx-auto"
    style={{
      height: '100%',
      backgroundImage: `url(${url})`,
      backgroundPosition: 'center',
      backgroundSize: size,
    }}
  >
    {children}
  </div>
)

const NewReviewForm = ({ onSubmit, jubenId, dm, loading }) => {
  useEffect(() => {
    const img = new Image()
    img.src = reviewBG
    img.onload = () => {
      setBgUrl(reviewBG)
    }
  }, [])

  const { currentUser, isAuthenticated } = useAuth()
  const [bgUrl, setBgUrl] = useState(reviewBGMin)
  const container = useRef(null)
  const { originX, originY, containerWidth, containerHeight, bgSize } =
    useReviewDimensions(container)

  return (
    <PreLoadBGWrapper>
      <LazyLoadBGWrapper url={bgUrl} size={bgSize}>
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
          <div className="flex justify-center  md:mt-16 mt-12">
            <JubenLabelCell id={jubenId} />

            <NumberField
              type="hidden"
              name="jubenId"
              value={jubenId}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true, valueAsNumber: true }}
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
              className="w-8 bg-transparent mr-20 text-lg outline-none"
              errorClassName="w-8 bg-transparent mr-20 text-lg outline-none"
              defaultValue={5}
              validation={{ required: true, max: 5, min: 1 }}
            />
          </div>
          <div className="flex justify-end">
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
              errorClassName="w-8 bg-transparent mr-20 text-lg outline-none"
              step={1}
              defaultValue={5}
              validation={{ required: true, max: 5, min: 1 }}
            />
          </div>
          <div className="flex justify-end">
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
              errorClassName="w-8 bg-transparent mr-20  text-lg outline-none"
              defaultValue={5}
              validation={{ required: true, max: 5, min: 1 }}
            />
          </div>
          <div className="flex justify-end">
            <FieldError name="rateOfFood" className="rw-field-error" />
          </div>
          <div className="flex justify-start mt-6 md:mt-10 w-100 px-4">
            <TextAreaField
              name="reviewOfFood"
              className="bg-transparent  outline-none text-sm w-3/4"
              errorClassName="rw-input rw-input-error"
              defaultValue="..."
            />

            {isAuthenticated && (
              <NumberField
                name="userId"
                value={parseInt(currentUser.id)}
                type="hidden"
                validation={{ valueAsNumber: true }}
              />
            )}

            <FieldError name="reviewOfFood" className="rw-field-error" />
          </div>

          <div className="flex justify-center">
            {!isAuthenticated && (
              <Link
                className="rw-button inline-block w-[56.6px] bg-blue-600 text-white transition duration-300"
                to={routes.login({ redirectTo: `/review/${jubenId}/${dm}` })}
                key="4"
              >
                登录
              </Link>
            )}

            <Submit
              disabled={loading}
              className="rw-button inline-block bg-yellow-600 text-white ml-2"
            >
              提交
            </Submit>
          </div>
        </Form>
      </LazyLoadBGWrapper>
    </PreLoadBGWrapper>
  )
}

export default NewReviewForm
