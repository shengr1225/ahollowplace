import { Loading, Empty, Failure, Success } from './SearchJubensCell'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = (args) => {
  return Success ? <Success {...args} /> : null
}

export default {
  component: Success,
  argTyps: {
    available: {
      options: [true, false],
    },
  },
}

success.args = {
  searchJubens: [
    {
      id: 1,
      name: '作者不详',
      desc: '在一座偏僻的小村庄里，最近发生了一件怪事。\\n那是一个晴朗无风的夜晚，村中女校的那座废弃旧校舍，莫名的燃气了大火。\\n这场火，没有惊动村中的任何一人，就这么静静地烧了一夜。当黎明来临，才被早起的村名所发现。\\n\\n在一片焦黑的旧校舍废墟，人们发现了六个死者，本是学校的学生。\\n有传言说，她们的死，还有旧校舍的大火，都是因为诅咒。\\n而这诅咒的来源，是一本小说。但凡看过这本小说的人，就会在七天之内死于非命。\\n离奇的大火，可怕的诅咒，一时间，村民们人心惶惶。\\n笼罩在真相之上的迷雾，像一朵厚重的乌云，覆盖在原本明媚祥和的乡野。',
      sections: '日式 惊悚 推理 变革 还原',
      image: 'https://cdn.filestackcontent.com/Wr5vCCfuQ1eOd1pK95FF',
      score: 4.9,
      players: '0|6',
      price: 49,
      drives: [],
      timeSlots: [
        {
          id: 5,
          start: '4PM',
          end: '11PM',
          last: 7,
        },
        {
          id: 6,
          start: '2PM',
          end: '9PM',
          last: 7,
        },
      ],
    },
    {
      id: 2,
      name: '死者在幻夜中醒来',
      desc: '河流上，漂浮着许多载着烛光的纸船，在一片波浪中，摇曳成一片星星点点。\\n这条看不到尽头的河流，将会流向彼岸。\\n人们相信，如果烛光与船只一起到达了河流的尽头，两个世界的人就可能在幻夜之中再次相见。\\n\\n可是，扁舟一叶在浪花浮尘，许多纸船都随着波涛淹没在了河流之中。\\n烛光熄灭，而折纸船的人，还等待着企盼之人的归来。\\n\\n我们曾无数次想要从河流溯洄，只乞求到达那一个虚无缥缈的彼岸。——— 《未见村名间故事》',
      sections: '日式 惊悚 推理 变革 硬核',
      image: 'https://cdn.filestackcontent.com/uNBHpifLR3OpSjnp7Kln',
      score: 4.9,
      players: '4|3',
      price: 49,
      drives: [
        {
          id: 8,
          date: '2022-09-23T07:00:00.000Z',
          status: 'Complete',
          male: 7,
          female: 0,
          total: 7,
          timeSlot: {
            id: 1,
            start: '5PM',
            end: '10PM',
          },
        },
        {
          id: 9,
          date: '2022-09-29T07:00:00.000Z',
          status: 'Cancel',
          male: 7,
          female: 0,
          total: 7,
          timeSlot: {
            id: 7,
            start: '2PM',
            end: '8PM',
          },
        },
        {
          id: 10,
          date: '2022-09-30T07:00:00.000Z',
          status: 'Locked',
          male: 7,
          female: 0,
          total: 7,
          timeSlot: {
            id: 3,
            start: '11AM',
            end: '5PM',
          },
        },
        {
          id: 11,
          date: '2022-09-30T07:00:00.000Z',
          status: 'Locked',
          male: 7,
          female: 0,
          total: 7,
          timeSlot: {
            id: 2,
            start: '5PM',
            end: '11PM',
          },
        },
      ],
      timeSlots: [
        {
          id: 2,
          start: '5PM',
          end: '11PM',
          last: 6,
        },
        {
          id: 3,
          start: '11AM',
          end: '5PM',
          last: 6,
        },
        {
          id: 7,
          start: '2PM',
          end: '8PM',
          last: 6,
        },
      ],
    },
    {
      id: 3,
      name: '漓川怪谈薄',
      desc: '常世是这篇土地的名字，也是土地中心那片诡异湖泊的名字。\\n传说，这里的水土，不仅滋养了生活在这的百姓，也孕育出了无数怪谈故事中的精怪们。\\n他们非人非鬼，是受到常世湖湖水影响而妖异化的产物。\\n他们不像话本里传的那样天生邪恶，大多只是生活的方式与对世界的认知与人类不同而已。\\n但只要他们出现，就一定离不开各种“光怪陆离”。\\n\\n在这片湖泊的中心还有着一个叫做蜃气楼的建筑，像一艘大船，彻彻底底地悬于湖上。\\n渔夫们曾潜入水中查看，却找不到任何一根用以支撑的柱子。\\n不管水位因为天气如何变化，它都始终都会和水面保持着固定的距离。\\n大家都对它感到好奇，却没人能够真的进去。\\n所有人都知道蜃气楼是平将门大人的居所，早就下令，禁止任何人的通行。\\n但今天，睁开双眼后，你们发现自己居然正身处在这栋神秘的建筑里。平将门大人则惨死在了他紧锁的......',
      sections: '日式 推理 进阶',
      image: 'https://cdn.filestackcontent.com/R0rPfWX6SKuXO4nEQ2oy',
      score: 4.9,
      players: '3|4',
      price: 49,
      drives: [],
      timeSlots: [
        {
          id: 1,
          start: '5PM',
          end: '10PM',
          last: 5,
        },
        {
          id: 8,
          start: '2PM',
          end: '7PM',
          last: 5,
        },
      ],
    },
    {
      id: 4,
      name: '神乐汤',
      desc: '神乐汤温泉，坐落在繁华的星町市，相传早在日本江户时期就已然存在。\\n时过境迁，今天店长“蛤蟆先生”将会邀请各位贵宾前来洗浴消遣，\\n蓄谋已久的狂欢盛宴，不为人知的暗流，离奇失踪的神秘女子，惨死于窗前的肥胖男子。\\n层层谎言编织下的真相，你能找到吗？\\n黑夜降临之时，星町市依旧沉醉在灯红酒绿之中。\\n一个巨大的阴谋正在这里最肮脏的角落里悄然酝酿着。而现在他们已经蠢蠢欲动了......\\n\\n精妙绝伦的诡计层层递进的剧情\\n你从未见过的高能反转\\n这是一封从黑暗中递出的邀请函，一个低沉的声音传来“嘿嘿，欢迎光临神乐汤。”',
      sections: '日式 机制 本格 进阶',
      image: 'https://cdn.filestackcontent.com/RKaxGI3TG1niRirP9rJQ',
      score: 4.8,
      players: '3|2',
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
    {
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
  ],
}
