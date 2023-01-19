import SearchToBookJuben from './SearchToBookJuben'

export default {
  title: 'Components/SearchToBookJuben',
  component: SearchToBookJuben,
  argType: {
    available: {
      options: [true, false],
    },
  },
}

export const Basic = (args) => <SearchToBookJuben {...args} />

Basic.args = {
  juben: {
    available: true,
    id: 8,
    name: '再见萤火虫',
    desc: '日出之国海岸线一路向北到莹见择日暮烟火，天空渐渐被染上夜色。\\n月光如洒，萤火虫偷偷点亮了灯，像星星的长河。\\n\\n“萤火虫是飞不起来的星星，还是星星是飞得太高的萤火虫？”有人好像这样问过。\\n\\n雾紫色的天空下，我们嬉笑着穿过将要下雨的云层，穿过海边长长的堤坝，穿过在黄昏如约而至的微风，\\n穿过霞光里的街道。我们踩着单车一路高歌，斑驳碎金洒满脸颊，橘色雾霭缠绕耳后的发。\\n我们的少年时光，渐渐被欢声笑语酿成最清甜的味道。\\n那时的我们都以为，飞跃那落日的天际线，仿佛就会奔向更好的人生。',
    sections: '日式 情感 开放 进阶',
    image: 'https://cdn.filestackcontent.com/eyzDDfJVTiyqzpF4yjwq',
    score: 4.9,
    players: '4|3',
    price: 49,
    drives: [],
    timeSlots: [
      {
        id: 9,
        start: '6PM',
        end: '10PM',
        last: 4,
      },
      {
        id: 10,
        start: '12AM',
        end: '4PM',
        last: 4,
      },
    ],
  },
}
