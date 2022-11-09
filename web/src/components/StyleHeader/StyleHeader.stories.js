import StyleHeader from './StyleHeader'

export default {
  title: 'Components/StyleHeader',
  component: StyleHeader,
  argTypes: {
    darkMode: {
      options: [true, false],
    },
  },
}

export const Basic = (args) => <StyleHeader {...args} />

Basic.args = {
  dark: true,
  isHome: true,
}
