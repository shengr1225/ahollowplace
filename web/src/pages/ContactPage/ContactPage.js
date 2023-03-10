import { useState } from 'react'

import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
  SelectField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import StyleHeader from 'src/components/header/header'
import qrcode from 'src/images/qrcode.png'

const qrcodeBGStyle = {
  backgroundImage: 'url(' + qrcode + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
}

const backgroundImage = {
  backgroundImage:
    'url(' +
    'https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80' +
    ')',
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()
  const [questionIndex, setQuestionIndex] = useState(0)

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }

  const onQuestionChange = (value) => {
    console.log(value.target.value)
    setQuestionIndex(value.target.value)
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />

      <div className="p-8">
        <div
          className="relative -mx-8 -mt-8 bg-center bg-cover"
          style={backgroundImage}
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="relative px-6 sm:px-8 mx-auto h-full flex flex-col">
            <StyleHeader isHome={true} dark={true}></StyleHeader>
            <div className="px-4 flex flex-1 pb-32">
              <h1 className="text-3xl text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug sm:mt-0 pt-8">
                <span className="inline-block mt-2">
                  ?????????, ?????????!
                  <br />
                  <p className="text-sm mt-8">
                    ?????????????????????????????????????????????,
                    ??????????????????????????????????????????????????????,
                    ???????????????????????????????????????????????????
                    <br />
                  </p>
                  <p className="text-sm mt-8 underline cursor-pointer">
                    ???????????????????????????????
                  </p>
                </span>
              </h1>
            </div>
          </div>
        </div>

        <Form
          onSubmit={onSubmit}
          config={{ mode: 'onBlur' }}
          className="-mt-8 text-center"
          error={error}
          formMethods={formMethods}
        >
          <FormError
            error={error}
            wrapperClassName="py-4 px-6 rounded-lg bg-red-100 text-red-700"
            listClassName="list-disc ml-4"
            listItemClassName=""
          />

          <SelectField
            name="question"
            className="border rounded-lg py-4 px-4 md:w-96 w-full drop-shadow-lg"
            onChange={onQuestionChange}
          >
            <option className=" text-gray-200">Choose Category</option>
            <option value="1">??????????????????</option>
            <option value="2">?????????????????????</option>
            <option value="3">??????????????????</option>
            <option value="4">????????????????????????</option>
            <option value="5">????????????</option>
          </SelectField>
        </Form>
      </div>

      <div className="px-16 py-8">
        {questionIndex == 1 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">
                Q: ????????????????????????, ???????????????????????????????????????????
              </p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                ????????????, ?????????????????????????????????????????????,
                ??????????????????????????????????????????,
                ????????????????????????????????????????????????????????????????????????????????????????????????????????????,
                ??????: ??????(??????), ??????(???????????????), ??????(?????????)
                ????????????????????????????????????????????????, ??????????????????????????????!
              </p>

              <p className="font-bold pt-12">
                Q: ???????????????????????????, ????????????????????????????
              </p>
              <p className=" font-light text-gray-600 pt-4">
                ???????????????????????????????????????????????????,
                ??????????????????????????????????????????(DM), DM?????????????????????????????????
                ????????????????????????????????????????????????????????????,
                ?????????????????????????????????, ????????????????????? ??????, ???????????????????????????,
                ????????????????????????? ??????????????????????????????????????????
              </p>

              <p className="font-bold pt-12">
                Q: ?????????????????????, ???????????????? ??????????????????????????????????
              </p>
              <p className=" font-light text-gray-600 pt-4">
                ????????????????????????/?????????, ?????????????????????????????????,
                ??????????????????????????? ????????????????????????????????????????????????, ????????????,
                ??????????????????????????? ??????????????????????????????,
                ?????????????????????????????????????????????????????????! ????????????,
                ??????????????????????????????:
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 2 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">
                Q: ????????????????????????????????????????????????????
              </p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                ??????????????????????????????????????????, ?????????12???????????????????????????,
                ????????????????????????, ??????????????????????????????????????????,
                ??????????????????????????????????????????????????????
                ????????????????????????MVP?????????????????????MVP??????, ???????????????????????????,
                ???????????????????????????, ????????????????????????????????????, ???????????????????????????
              </p>

              <p className="font-bold pt-12">Q: ?????????????????????????????????????</p>
              <p className=" font-light text-gray-600 pt-4">
                ?????????????????????DM??????????????????????????????????????????, ????????????????????????,
                ?????????$6???$15?????????(??????????????????????????????, ??????????????????)
              </p>

              <p className="font-bold pt-12">Q: ????????????????????????????</p>
              <p className=" font-light text-gray-600 pt-4">
                ????????????????????????, ??????????????????????????????????????????????????????,
                ?????????????????????????????????????????????????????????
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 3 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">Q: ?????????????????????????????????????????????????</p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                ??????!?????????????????????????????????????????????????????????????????????,
                ????????????????????????????????????????????????????????????, ????????????!
                ??????????????????????????????????????????(??????????????????, ?????????????????????)
              </p>

              <p className="font-bold pt-12">Q: ?????????????????????????</p>
              <p className=" font-light text-gray-600 pt-4">
                ???????????????????????????, ???????????????, ????????????????????????,
                ???????????????????????????????????????, ????????????????????????,
                ???????????????????????????! ??????????????????????????????
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 4 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">Q: ?????????????????????????</p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                ????????????????????????????????????????????????????????????,
                ?????????????????????+????????????????????????,
                ?????????????????????????????????????????????????????????????????????,
                ????????????????????????, ???????????????????????????,
                ?????????NPC?????????????????????????????????, ???????????????
                ????????????????????????????????????????????????, ??????: ???????????????, ????????????,
                ???????????????, ?????????????????????, ???????????????????????????
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 5 && (
          <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
        )}
      </div>
    </>
  )
}

export default ContactPage
