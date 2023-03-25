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
      <MetaTags
        title="联系我们"
        description="洞屋剧本杀联系方式, 新手入门和常见问题"
      />

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
                  欢迎你, 剧本人!
                  <br />
                  <p className="text-sm mt-8">
                    无论你是对推理感兴趣的新手玩家,
                    还是对剧本杀入迷想寻找固定车队的玩家,
                    还是百本玩家想寻找不同的打本体验的
                    <br />
                  </p>
                  <p className="text-sm mt-8 underline cursor-pointer">
                    有任何问题想问我们的?
                  </p>
                  <p className="mt-8 font-thin text-sm">
                    洞屋剧本杀<br></br>
                    <br></br>
                    221 Woodrow St, Daly City, CA 94014
                  </p>
                  <p className="text-sm font-thin mt-2">
                    营业时间: 周日-周日 <br></br> 预约电话: 4158023853 <br></br>
                    微信: thehollowplace
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
            <option value="1">新人入坑指南</option>
            <option value="2">洞屋剧本杀特色</option>
            <option value="3">寻找固定车队</option>
            <option value="4">美食剧本杀是什么</option>
            <option value="5">联系客服</option>
          </SelectField>
        </Form>
      </div>

      <div className="px-16 py-8">
        {questionIndex == 1 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">
                Q: 没怎么玩过剧本杀, 怕动辄五六个小时的游戏会坐牢?
              </p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                不要担心, 我们有新人友好的剧本。在此之前,
                我们相信你对推理有一定的兴趣,
                也有接触过剧本杀的一些规则。所以我们会根据你喜欢的类型给你推荐新人友好本,
                比如: 秒杀(欢乐), 情感(再见萤火虫), 惊悚(古木吟)
                希望让你打一次就迷上剧本这个世界, 我们比别人多一个世界!
              </p>

              <p className="font-bold pt-12">
                Q: 我一拿到凶手就紧张, 话都不会说了怎么办?
              </p>
              <p className=" font-light text-gray-600 pt-4">
                如果你担心拿到凶手会被盘状态盘出来,
                可以提前私下告诉我们的主持人(DM), DM会尽量不给你凶手本的。
                现在大部分的本子凶手都不知道自己是凶手的,
                所以没有什么可以隐瞒的, 大可不必紧张。 最后, 万一知道自己是凶手,
                但又顺利逃脱了呢? 那你的体验感就是成倍上升了。
              </p>

              <p className="font-bold pt-12">
                Q: 我没玩过剧本杀, 怎么预约呢? 是不是需要找很多人一起?
              </p>
              <p className=" font-light text-gray-600 pt-4">
                一个人也可以发车/上车的, 只需要加入我们的拼车群,
                可以查看拼车信息。 或者联系客服发一车你感兴趣的剧本, 告诉时间,
                剧本就可以开车了。 如果你有朋友也感兴趣,
                一起开车或者整车来组队可以更容易发车哦! 约车拼车,
                更多问题欢迎骚扰客服:
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 2 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">
                Q: 洞屋剧本杀和别的剧本杀店有什么不同?
              </p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                我们把美食和剧本结合在了一起, 目前有12个特别设计的美食本,
                我们希望通过美食, 给大家的剧本人生增加一份期待,
                一种调味剂和一份让你津津乐道的回忆。
                每局我们为本场的MVP玩家设计了专属MVP卡片, 记录了你的打本偏向,
                情感羁绊和个人人设, 这样我们就能更好地了解你, 为你选适合你的本。
              </p>

              <p className="font-bold pt-12">Q: 订剧本的时候怎么预定吃的?</p>
              <p className=" font-light text-gray-600 pt-4">
                预定剧本的时候DM会询问你们是否要预定配套美食, 美食按位计算价格,
                价格从$6至$15不等。(配套美食只能提前预定, 不能临时点餐)
              </p>

              <p className="font-bold pt-12">Q: 可以不点配套餐饮吗?</p>
              <p className=" font-light text-gray-600 pt-4">
                配套餐饮是可选的, 为了你的完整打本体验我们建议尝试一下,
                但如果你吃饱了或者想点外卖都是欢迎的。
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 3 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">Q: 洞屋剧本杀还能帮我们寻找固定车队?</p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                是的!我们会根据会员信息匹配出与你打本偏向一致的玩家,
                还会根据玩家人设匹配出与你人设互补的玩家, 推荐给你!
                只需要在会员页面填写个人资料(包括打本偏好, 人设和情感羁绊)
              </p>

              <p className="font-bold pt-12">Q: 如何寻找固定车队?</p>
              <p className=" font-light text-gray-600 pt-4">
                填好个人打本偏好后, 加客服微信, 发个人页面给客服,
                客服通过后台会拉一个意向群, 里面都是偏好一致,
                人设互补的小伙伴哦! 可以在群里自行组队。
              </p>

              <div className=" w-56 h-64 mx-auto mt-4" style={qrcodeBGStyle} />
            </div>
          </div>
        )}
        {questionIndex == 4 && (
          <div className="flex-1">
            <div>
              <p className="font-bold">Q: 什么是美食剧本杀?</p>
              <p className=" font-light text-gray-600 pt-4 text-md">
                美食剧本杀是把美食融入到剧本杀的流程之中,
                与传统的剧本杀+外卖是分开的不同,
                剧本杀过程中的美食不仅是一种补充体力脑力的东西,
                还是剧本杀的道具, 可以为剧本增香添彩,
                上菜的NPC也会有相应的性格和角色, 不会跳戏。
                其中的美食也是天南地北的特色小吃, 比如: 乐山冷串串, 麻辣干锅,
                老鸭粉丝汤, 重庆伤心酸辣粉, 千里香小馄饨等等。
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
