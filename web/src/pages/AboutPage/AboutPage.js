import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/header/header'
import dongwu from 'src/images/dongwu.jpeg'
import emotion1 from 'src/images/emotion1.jpeg'
import food1 from 'src/images/food1.jpeg'
import food2 from 'src/images/food2.jpeg'
import me from 'src/images/me.jpeg'

const meBGStyle = {
  backgroundImage: 'url(' + me + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
}

const dongwuBGStyle = {
  backgroundImage: 'url(' + dongwu + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
}

const food1BGStyle = {
  backgroundImage: 'url(' + food1 + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
}

const food2BGStyle = {
  backgroundImage: 'url(' + food2 + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
}

const emotion1BGStyle = {
  backgroundImage: 'url(' + emotion1 + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
}

const AboutPage = () => {
  return (
    <>
      <MetaTags title="关于洞屋" description="洞屋剧本杀的前世今生" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={false} isHome={true} />
      </div>

      <div className="flex flex-row flex-wrap lg:flex-nowrap text-center text-gray-900">
        <div className="basis-full lg:basis-1/3">
          <p>关于我</p>
          <div
            className="rounded-full w-32 h-32 mx-auto mt-4"
            style={meBGStyle}
          />
          <div className="pt-4 leading-8 px-12">
            <span className="underline underline-offset-8">
              一切都是最好的安排
            </span>
            <div className="pt-8 text-left">
              2011年毕业于上海海事大学计算机专业, 毕业后从事网页游戏前段开发,
              参与开发了一款月流水千万级别的游戏,
              在页游市场井喷的第一时间上了车,
              分得一波红利的同时也见证了国内产品市场的竞争。
              3个月开发一款非换皮游戏, 开发出来不好玩, 然后策划连夜出版本,
              接着又是1个月的挑灯夜码, 游戏的成功少不了速度的功劳,
              背后是一个个早上7,8点的太阳, 是早上回家的时候能见到7,8点的太阳。
              毕业后第一份工作让我感受到了市场的红利, 也让我体验到了加班的阴影,
              也让我体会到资本市场的残酷。我选择了辞职来到了美国加州旧金山,
              我在硅谷孵化器做过IOS开发, 在Catering初创做过送餐,
              电商平台卖过汝窑茶杯, 最终在找SDE工作之前决定创业。
              <p className="pt-4 underline underline-offset-8">
                科技融于衣食住行
              </p>
              <p className="pt-4 text-left">
                第一个创业的项目是私房菜送餐平台,
                是一个连接私房菜厨师和用户的基于中央厨房的点餐送餐平台。有这个想法是因为在朋友圈有很多在微信上卖吃的的人,
                然后因为家庭厨房的环境条件,
                很多都不符合规定而且也很难形成规模效应。我当时一直在从事catering的送餐工作,
                每天都会从不同的商业厨房取餐送到公司,
                这个过程了解到商业厨房其实并不神秘而且成本对比起动辄上百人到五百人的餐量来说实在是太低了。
              </p>
              <p className="pt-4 text-left">
                一个想法油然而生, 那我为何不创建一个平台, 把私厨资源集合在一起,
                通过聚合私厨吸引用户订单,用preorder的形式提高私厨的厨房利用率。
                简单来说, 用户可以用更低的价钱吃到有特色的小吃。
                为了吸引第一批用户, 我去上海和成都学习了全国各地的小吃,
                成为了平台的第一批厨师, 小龙虾, 麻辣干锅, 千里香小馄饨,
                老鸭粉丝汤, 重庆酸辣粉也成为了平台的流量密码。
                疫情是我们的红利期, 但是产品逐渐成为了瓶颈,
                用户留存一直提不上去, 每天还要炒菜, 宣传和送餐,
                顾此失彼导致了产品一直没时间优化,
                团队管理经验的缺失导致了这次创业的失败。
                结束第一个创业平台的契机是我开了一家烧烤店。
              </p>
              <p className="pt-4 underline underline-offset-8">团队的力量</p>
              <p className="pt-4 text-left">
                烧烤店的经历第一次让我感受最深的是团队的力量,
                我和合伙人从2021年6月开始接手,
                从学如何调撒料开始到把月流水做到每月15-20%的增长的同时还能控制支出.
                短短的半年时间, 我学会了流程优化, 定制KPI,
                激励员工和如何异步高效合作。 每一步都是团队工作,
                少不了沟通交流和分工, 最终结果就是我们做到了三番第一,
                荣获吃货小分队2021度湾区最受欢迎烧烤店的称号。
                这一次的经历让我第一次真正在团队中成长,
                让我坚信我有能力自己带团队,而且在团队分工中可以做更好的自己。
              </p>
              <p className="pt-4 underline underline-offset-8">
                再一次原地出发, 只是离月光更近了
              </p>
              <p className="pt-4 pb-12">下面就是洞屋剧本杀的前世今生了...</p>
            </div>
          </div>
        </div>
        <div className="basis-full lg:basis-1/3">
          <p className="text-lg font-light pt-8 lg:pt-0">Short Story</p>
          <p className="pt-4 underline underline-offset-8">最长的电影</p>
          <div className="pt-4 px-8 leading-8 text-left">
            我们的开始, 是最长的电影。放映了三年, 我票都还留着。
            这句歌词用来形容选对本的体验再好不过了。
            <br />
            <br />
            洞屋剧本杀会了解你的打本偏好, 记录你这个世界的人设,
            了解你内心深处最脆弱的部分。 目的只有一个, 让你拿到一个本看完背景,
            有这样一种感觉: “哇, 这个人好像是专门为我而设的” 或者
            ”我们明明活在两个千差万别的世界, 可是感觉好熟悉啊“
            <div
              className="rounded w-64 h-48 mx-auto my-4"
              style={dongwuBGStyle}
            />
            <p className="pt-4 underline underline-offset-8 text-center">
              唯美食与爱不可辜负
            </p>
            <p className="pt-4">
              更多时候, 在我看来, 美食是一种回忆, 是一种期待,
              是一种羁绊也是一种画面。 洞屋剧本杀把美食融入进了剧本杀之中,
              给大家另一段人生增加一份开始前的期许, 就像病娇男孩对蛋糕的期待,
              一份人生中必不可少的调味剂, 正如神乐汤中上“神乐汤”时的五味杂陈,{' '}
              和一份让你津津乐道的回忆,
              就像作者不详中对“冷串串”恐怖又期待的记忆。
              <br />
              <br />
              欢迎你们, 和我一起体验鲜活的人生。
            </p>
            <div
              className="rounded-md w-72 h-48 mx-auto my-4"
              style={food1BGStyle}
            />
            <p className="pt-4">
              漓川怪谈薄之中, 小女孩作为一个边缘人物, 被我们做成了NPC,
              当她拿出妖灵冰粉时, 说一句欢迎来到“漓川”的时候,
              那种惟妙惟肖的神情在她端着冰粉那一刻得到了延续,光怪陆离的景象仿佛在冰粉上映射出来。
            </p>
            <div
              className="rounded-md w-80 h-56 mx-auto my-4"
              style={food2BGStyle}
            />
          </div>
        </div>
        <div className="basis-full lg:basis-1/3">
          <p className="text-lg font-light">Long Story</p>
          <p className="pt-4 px-8 leading-8 text-left">
            《那一束月光》的吴倩尹的玩家, 因为故事过于代入,
            几天之后还在emo。她也对情感本改观了, 我无法窥探她的心思,
            不过相信她会觉得这是一段自己人生的延续,
            不管结果如何是一段美好的体验, 难以忘怀。 突然想到一句话,
            选对本就像体验了一部最长的电影, 久久不想谢幕。
            选错本就像替别人蹲了个牢, 无期徒刑的那种。 <br />
            <br />
            剧本杀是个社交游戏, 需要代入剧本, 需要和玩家对话,
            好的剧本打完甚至几天都未能走出剧本,
            所以我创立洞屋剧本杀的初衷是除了了解你剧中人物的匹配度,
            还想仔细聆听你剧本前世的人生, 也就是你的个人偏好,
            一切都是最好的安排, 我想让你拿到这个本看完背景, 有这样一种感觉: “哇,
            这个人好像是专门为我而设的” 或者 ”我们明明活在两个千差万别的世界,
            可是感觉好熟悉啊“
            <span
              className="rounded w-48 h-64 mx-auto my-4"
              style={emotion1BGStyle}
            />
            要做到这点,能让我们提前在茫茫剧本中为玩家初选出适合他/她的剧本和角色,
            毕竟这是一场好几个小时的人生体验, 谁也不想做菠萝头和坐牢的吧,
            我也不希望这个锅只能是玩家自己背。要做到让玩家对我们敞开心扉,
            也不是容易的, 我记得一名打过 《那一束月光》的女嘉宾说:
            “我提议你打电话去问那个选角问题, 因为有些答案不是文字可以描述的,
            沉默, 停顿, 哽咽, 甚至说话的语气, 是悲愤, 是冷静, 还是义愤填膺”
            确实, 透过冰冷的文字无法完全感受回答人的心情,
            就像无法对一个完全的陌生人敞开心扉一样. 剧本杀出现之前,
            这像一个永远的矛盾题, 你不对我敞开心扉我就不能理解你,
            你不理解我我怎么敢给你看我内心最脆弱的部分。
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutPage
