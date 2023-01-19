import { motion } from 'framer-motion'

import { JubenSectionAnimation } from 'src/components/lib/helpers/Animation'

import JubenHighlight from '../JubenHighlight'

const sectionInfo = {
  scary: {
    title: '恐怖旅程',
    desc: '让你在一场刺激感官的惊悚之旅中找到真相',
  },
  fun: {
    title: '大笑一场',
    desc: '笑看人情世故，笑看世间风云',
  },
  emotion: {
    title: '放声大哭',
    desc: '让你在一场刺激感官的惊悚之旅中找到真相',
  },
  mechanism: {
    title: '机制阵营本',
    desc: '偷拐抢骗，游刃有余中成为人生赢家',
  },
  mystery: {
    title: '变格世界',
    desc: '天马行空，畅游在幻想世界中',
  },
}

const JubenSection = ({ section, jubens }) => {
  const HeadingTitle = () => (
    <motion.h2
      variants={JubenSectionAnimation[section]}
      className="text-4xl sm:text-5xl font-black tracking-wide text-center"
    >
      {sectionInfo[section].title}
    </motion.h2>
  )
  const HeadingDescription = () => (
    <motion.p
      variants={JubenSectionAnimation[section]}
      className="mt-4 font-medium text-gray-600 text-center max-w-sm"
    >
      {sectionInfo[section].desc}
    </motion.p>
  )
  return (
    <div className="flex flex-col items-center mt-16">
      <motion.div
        viewport={JubenSectionAnimation.viewport}
        transition={{ staggerChildren: 1 }}
        initial={'start'}
        whileInView={'end'}
      >
        <HeadingTitle />
        <HeadingDescription />
      </motion.div>

      <motion.div>
        {jubens.map((juben, i) => (
          <JubenHighlight juben={juben} reversed={i % 2 === 1} key={i} />
        ))}
      </motion.div>
    </div>
  )
}
export default JubenSection
