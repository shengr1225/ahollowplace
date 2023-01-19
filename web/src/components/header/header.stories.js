import Header from './header'

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    dark: {
      description: 'Indicate if the header is in dark mode',
      defaultValue: false,
      options: [true, false],
    },
    isHome: {
      description: 'If it is in home page',
      defaultValue: true,
      options: [true, false],
    },
  },
}

const Template = (args) => <Header {...args} />

export const Basic = Template.bind({})

Basic.args = {
  dark: false,
  isHome: true,
}
