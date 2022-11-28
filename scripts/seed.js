import { db } from 'api/src/lib/db'

const JUBENS = ({ userId, timeSlotId }) => {
  return [
    {
      name: '漓川怪谈薄',
      score: 4.91,
      image: 'https://cdn.filestackcontent.com/81jNlMIYR8WIjlsltKmr',
      desc: '常世是这篇土地的名字，也是土地中心那片诡异湖泊的名字。\n传说，这里的水土，不仅滋养了生活在这的百姓，也孕育出了无数怪谈故事中的精怪们。\n他们非人非鬼，是受到常世湖湖水影响而妖异化的产物。\n他们不像话本里传的那样天生邪恶，大多只是生活的方式与对世界的认知与人类不同而已。\n但只要他们出现，就一定离不开各种“光怪陆离”。',
      section: 'mystery',
      sections: '日式 架空 推理 变格',
      players: '3|4',
      canSwitchSex: true,
      duration: 6,
      price: 45,
      timeSlots: {
        connect: { id: timeSlotId },
      },
      mvps: {
        connect: { id: userId },
      },
      photos:
        'https://cdn.filestackcontent.com/betCw4ghQyOXTYTGOTxI,https://cdn.filestackcontent.com/yCtTqYffRIOplZ1Okz4G,https://cdn.filestackcontent.com/WlbQL2wwQneZkOKJCjbC,https://cdn.filestackcontent.com/1oKLA6lJReAOcvv13NUg,https://cdn.filestackcontent.com/jI4tBMRgC4RMGQVteTLQ,https://cdn.filestackcontent.com/DcnGs4OgSkCM3PbETvP4,https://cdn.filestackcontent.com/HpGaUxTScWDtnStWLAhW,https://cdn.filestackcontent.com/HrpMDvBPTsiEvyK5RF1l,https://cdn.filestackcontent.com/IAZTF6C2QN6TmzFsSHvX',
      available: true,
    },
  ]
}

export default async () => {
  // create an admin user
  const user = await db.user.create({
    data: {
      name: 'Sheng Rong',
      email: 'admin@ahollowplace.com',
      hashedPassword:
        'f82e0d6a9acc3599ce89d61c5695393aa92497ebf6394ff69cf445b80df41e2a',
      salt: 'c2b8df0b3310e89412e2ee13aa222485',
      roles: 'admin',
    },
  })

  const timeSlot = await db.timeSlot.create({
    data: {
      start: '630PM',
      end: '12AM',
      last: 5,
    },
  })

  for (const juben of JUBENS({ userId: user.id, timeSlotId: timeSlot.id })) {
    await db.juben.create({
      data: { ...juben },
    })

    console.log(`  Seeded "${juben.name}"`)
  }

  console.info('')
  console.info('  Seeded admin user:')
  console.info('')
  console.info('    Email: admin@ahollowplace.com')
  console.info('    Password: 12345678')
  console.info('')
  console.info(`  (Please don't use this login in a production environment)`)
  console.info('')
}
