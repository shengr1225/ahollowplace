import React from 'react'
import { ReactComponent as SvgDotPatternIcon } from '../../images/dot-pattern.svg'

//Heading Information
const HeadingInfo = (props) => {
  return (
    <div className="flex flex-col items-center">
      <HeadingTitle content={props.title} />
      <HeadingDescription content={props.desc} />
    </div>
  )
}

//Detail Listing Information
const Card = (props) => {
  return (
    <div
      className={
        'mt-24 md:flex justify-center items-center ' +
        (props.reversed ? 'flex-row-reverse' : 'flex-row')
      }
    >
      <Image imageSrc={props.card.imageSrc} />
      <div className="mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8">
        <Subtitle content={props.card.subtitle}></Subtitle>
        <Title content={props.card.title}></Title>
        <Description content={props.card.description}></Description>
        <Link href={props.card.url} content="See Event Details"></Link>
      </div>
    </div>
  )
}

//Heading & Detail Subs
const HeadingTitle = (props) => (
  <h2 className="text-4xl sm:text-5xl font-black tracking-wide text-center">
    {props.content}
  </h2>
)
const HeadingDescription = (props) => (
  <p className="mt-4 font-medium text-gray-600 text-center max-w-sm">
    {props.content}
  </p>
)
const Image = (props) => (
  <div
    className="rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8"
    style={{ backgroundImage: 'url(' + props.imageSrc + ')' }}
  ></div>
)
const Subtitle = (props) => (
  <div className="font-bold tracking-wide text-secondary-100">
    {props.content}
  </div>
)
const Title = (props) => (
  <h4 className="text-3xl font-bold text-gray-900">{props.content}</h4>
)
const Description = (props) => (
  <p className="mt-2 text-sm leading-loose">{props.content}</p>
)
const Link = (props) => (
  <a
    href={props.href}
    className="inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500"
  >
    {props.content}
  </a>
)

export default () => {
  const cards = [
    {
      imageSrc: 'src/images/cards/card1.jpg',
      subtitle: 'Paid',
      title: 'Loachella, NYC',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
    },

    {
      imageSrc:
        'https://images.unsplash.com/photo-1543423924-b9f161af87e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      subtitle: 'Free',
      title: 'Rock In Rio, Upstate',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
    },

    {
      imageSrc:
        'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80',
      subtitle: 'Exclusive',
      title: 'Lollapalooza, Manhattan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
    },
  ]

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
        <HeadingInfo
          title="Go Warrior"
          desc="Warrior with the 2022 NBA Final Champion!"
        />
        <div className="mt-16">
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1} card={card} />
          ))}
        </div>
      </div>
      <SvgDotPatternIcon className="absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24" />
      <SvgDotPatternIcon className="absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24" />
      <SvgDotPatternIcon className="absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24" />
      <SvgDotPatternIcon className="absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24" />
    </div>
  )
}
