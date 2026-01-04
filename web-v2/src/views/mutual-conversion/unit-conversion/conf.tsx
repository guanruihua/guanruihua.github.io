export const items = [
  {
    label: '长度',
    value: 'length',
    options: [
      {
        label: '国际长度单位(公制)',
        rel: '1852',
        value: 'metric',
        options: [
          { label: '公里(km)', value: 'km', rel: '1' },
          { label: '米(m)', value: 'm', rel: '1000' },
          { label: '分米(dm)', value: 'dm', rel: '10000' },
          { label: '厘米(cm)', value: 'cm', rel: '100000' },
          { label: '毫米(mm)', value: 'mm', rel: '1000000' },
          { label: '丝(dmm)', value: 'dmm', rel: '10000000' },
          { label: '微米(um)', value: 'um', rel: '1000000000' },
          { label: '纳米(nm)', value: 'nm', rel: '1000000000000' },
        ],
      },
      {
        label: '中国传统长度单位(市制)',
        rel: '3704',
        value: 'municipal',
        options: [
          { label: '里', value: 'Li', rel: '1' },
          { label: '丈', value: 'zhang', rel: '150' },
          { label: '尺', value: 'chi', rel: '1500' },
          { label: '寸', value: 'cun', rel: '15000' },
          { label: '分', value: 'fen', rel: '150000' },
          { label: '厘', value: 'li', rel: '1500000' },
          { label: '毫', value: 'hao', rel: '15000000' },
        ],
      },
      // {
      //   label: '英制长度单位',
      //   value: 'british',
      //   // 1852km = 1000nmi
      //   rel: '1000',
      //   // rel: '3704',
      //   options: [
      //     { label: '海里(nmi)', value: 'nmi', rel: '50292' },
      //     { label: '英寻(fm)', value: 'fm', rel: '50930000' },
      //     { label: '英里(mi)', value: 'mi', rel: '57875' },
      //     { label: '弗隆(fur)', value: 'fur', rel: '463000' },
      //     { label: '码(yd)', value: 'yd', rel: '101860000' },
      //     { label: '英尺(ft)', value: 'ft', rel: '305580000' },
      //     { label: '英寸(in)', value: 'in', rel: '3666960000' },
      //   ],
      // },
    ],
  },
  {
    label: '体积',
    value: 'volume',
    options: [
      {
        label: '国际单位制（公制）',
        value: '1',
        options: [
          { label: '立方毫米', value: 'mm³', rel: 1e9 },
          { label: '立方厘米', value: 'cm³', rel: 1e6 },
          { label: '立方分米', value: 'dm³', rel: 1e3 },
          { label: '立方米', value: 'm³', rel: 1 },
          { label: '立方千米', value: 'km³', rel: 1e-9 },
          { label: '升', value: 'L', rel: 1e3 },
          { label: '毫升', value: 'mL', rel: 1e6 },
          { label: '厘升', value: 'cL', rel: 1e5 },
          { label: '分升', value: 'dL', rel: 1e4 },
          { label: '百升/公石', value: 'hL', rel: 10 },
          { label: '千升', value: 'kL', rel: 1 },
        ],
      },
      // {
      //   label: '英制单位',
      //   options: [
      //     { label: '立方英寸', value: 'in³' },
      //     { label: '立方英尺', value: 'ft³' },
      //     { label: '立方码', value: 'yd³' },
      //     { label: '立方英里', value: 'mi³' },
      //     { label: '液盎司', value: 'fl oz' },
      //     { label: '及耳', value: 'gill' },
      //     { label: '品脱', value: 'pt' },
      //     { label: '夸脱', value: 'qt' },
      //     { label: '加仑', value: 'gal' },
      //   ],
      // },
      // {
      //   label: '美制单位',
      //   options: [
      //     { value: 'us fl oz', label: '美制液盎司' },
      //     { value: 'us gill', label: '美制及耳' },
      //     { value: 'us pt', label: '美制品脱' },
      //     { value: 'us qt', label: '美制夸脱' },
      //     { value: 'us gal', label: '美制加仑' },
      //     { value: 'bbl', label: '桶（石油）' },
      //     { value: 'acre-ft', label: '亩-英尺' },
      //   ],
      // },
      // {
      //   label: '烹饪单位',
      //   options: [
      //     { label: '茶匙', value: 'tsp' },
      //     { label: '汤匙', value: 'tbsp' },
      //     { label: '杯', value: 'cup' },
      //     { label: '滴', value: 'drop' },
      //   ],
      // },
      // {
      //   label: '特殊单位',
      //   options: [
      //     { value: 'cc', label: '立方厘米（医学用）' },
      //     { value: 'register ton', label: '登记吨' },
      //     { value: 'shipping ton', label: '货运吨' },
      //   ],
      // },
    ],
  },
  {
    label: '面积',
    value: 'area',
    options: [
      {
        label: '国际面积单位(公制)',
        value: '1',
        rel: '1',
        options: [
          { label: '平方千米(km2)', value: 'km2', rel: '1' },
          { label: '公顷(ha)', value: 'ha', rel: '100' },
          { label: '平方米(m2)', value: 'm2', rel: '1000000' },
          { label: '平方分米(dm2)', value: 'dm2', rel: '100000000' },
          { label: '平方厘米(cm2)', value: 'cm2', rel: '10000000000' },
          { label: '平方毫米(mm2)', value: 'mm2', rel: '1000000000000' },
        ],
      },
      {
        label: '中国传统面积单位(市制)',
        value: '2',
        rel: '1500',
        options: [
          { label: '亩', value: 'mu', rel: '1' },
          { label: '分', value: 'fen', rel: '10' },
          { label: '厘', value: 'li', rel: '100' },
          { label: '毫', value: 'hao', rel: '1000' },
        ],
      },
      // {
      //   label: '英制面积单位',
      //   value: '',
      //   rel: '',
      //   options: [
      //     { label: '平方海里(nmi2)', value: '', rel: '' },
      //     { label: '平方英里(mi2)', value: '', rel: '' },
      //     { label: '英亩(acre)', value: '', rel: '' },
      //     { label: '平方竿(rd2)', value: '', rel: '' },
      //     { label: '平方码(yd2)', value: '', rel: '' },
      //     { label: '平方英尺(ft2)', value: '', rel: '' },
      //     { label: '平方英寸(in2)', value: '', rel: '' },
      //   ],
      // },
    ],
  },
  {
    label: '重量',
    value: 'weight',
    options: [
      {
        label: '国际重量单位(公制)',
        value: '1',
        rel: '1',
        options: [
          { label: '吨(t)', value: 't', rel: '1' },
          { label: '千克/公斤(kg)', value: 'kg', rel: '1' },
          { label: '克(g)', value: 'g', rel: '1000000' },
          { label: '毫克(mg)', value: 'mg', rel: '1000000000' },
        ],
      },
      {
        label: '中国传统重量单位(市制)',
        value: '2',
        rel: '2',
        options: [
          { label: '斤', value: 'jin', rel: '1000' },
          { label: '两', value: 'liang', rel: '10000' },
          { label: '钱', value: 'qian', rel: '100000' },
          { label: '担', value: 'dan', rel: '10' },
        ],
      },
      // {
      //   label: '英制重量单位(常衡制)',
      //   value: '3',
      //   options: [
      //     { label: '磅(lb)', value: '' },
      //     { label: '盎司(oz)', value: '' },
      //     { label: '英石(st)', value: '' },
      //     { label: '英担(cwt)', value: '' },
      //     { label: '打兰(dr)', value: '' },
      //     { label: '格令(gr)', value: '' },
      //     { label: '长吨(lt)', value: '' },
      //   ],
      // },
      // {
      //   label: '英制重量单位(金衡制)',
      //   value: '4',
      //   options: [
      //     { label: '磅(lbt)', value: '' },
      //     { label: '盎司(ozt)', value: '' },
      //     { label: '格令', value: '' },
      //     { label: '英钱(dwt)', value: '' },
      //   ],
      // },
    ],
  },
  // {
  //   label: '面积',
  //   value: 'area2',
  //   options: [
  //     {
  //       label: '公制',
  //       value: '1',
  //       options: [
  //         { label: '平方千米(km²)', value: 'km²', rel: 1 },
  //         { label: '平方米(m²)', value: 'm²', rel: 1000000 },
  //         { label: '平方分米(dm²)', value: 'dm²', rel: '100000000' },
  //         { label: '平方厘米(cm²)', value: 'cm²', rel: '10000000000' },
  //         { label: '平方毫米(mm²)', value: 'mm²', rel: '1000000000000' },
  //         { label: '公顷(ha)', value: 'ha', rel: 100 },
  //         { label: '公亩(are)', value: 'are', rel: 10000 },
  //       ],
  //     },
  //     {
  //       label: '市制',
  //       value: '15',
  //       options: [
  //         { label: '顷', value: 'qing', rel: 1 },
  //         { label: '亩', value: 'mu', rel: 100 },
  //         { label: '分', value: 'fen', rel: 1000 },
  //         { label: '平方尺', value: 'zhi', rel: 600000 },
  //         { label: '平方寸', value: 'cun', rel: 60000000 },
  //       ],
  //     },
  // {
  //   label: '英制',
  //   value: '3',
  //   options: [
  //     { label: '平方英里(sq.mi)', value: '' },
  //     { label: '平方英尺(sq.ft)', value: '' },
  //     { label: '平方英寸(sq.in)', value: '' },
  //     { label: '英亩(acre)', value: '' },
  //     { label: '平方码(sq.yd)', value: '' },
  //     { label: '平方竿(sq.rd)', value: '' },
  //   ],
  // },
  // ],
  // },
  {
    label: '时间',
    value: 'time',
    options: [
      {
        label: '国际时间单位',
        value: '1',
        options: [
          { label: '年(year)', value: 'year', rel: '' },
          { label: '月(month)', value: 'month', rel: '' },
          { label: '周(week)', value: 'week', rel: '1' },
          { label: '日(d)', value: 'd', rel: '7' },
          { label: '时(h)', value: 'h', rel: '168' },
          { label: '分(min)', value: 'min', rel: '10080' },
          { label: '秒(s)', value: 's', rel: '604800' },
          { label: '毫秒(ms)', value: 'ms', rel: '604800000' },
        ],
      },
    ],
  },
  // { label: '角度', value: 'angle' },
  // { label: '速度', value: 'speed' },
  {
    label: '温度',
    value: 'temperature',
    options: [
      {
        label: '国际温度单位',
        value: '1',
        options: [
          { label: '摄氏度(℃)', value: '℃', rel: '' },
          { label: '华氏度(℉)', value: '℉', rel: '' },
          { label: '开氏度(K)', value: 'K', rel: '' },
          { label: '列氏度(°Re)', value: 'Re', rel: '' },
          { label: '兰氏度(°R)', value: '°R', rel: '' },
        ],
      },
    ],
  },
  {
    label: '压力',
    value: 'pressure',
    options: [
      {
        label: '压力单位',
        value: '1',
        options: [
          { label: '帕(Pa)', value: 'Pa', rel: '1000000' },
          { label: '百帕(hPa)', value: 'hPa', rel: '10000' },
          { label: '千帕(kPa)', value: 'kPa', rel: '1000' },
          { label: '兆帕(MPa)', value: 'MPa', rel: '1' },
          { label: '巴(bar)', value: 'bar', rel: '10' },
          { label: '托(torr)', value: 'torr', rel: '7500.616850729803' },
          {
            label: '磅力/平方英寸(psi)',
            value: 'psi',
            rel: '145.0376807894691',
          },
        ],
      },
    ],
  },
  {
    label: '热量',
    value: 'heat',
    options: [
      {
        label: '热量单位',
        value: 'j',
        options: [
          { label: '瓦(Wh)', value: 'Wh', rel: '1000000' },
          { label: '毫瓦时(mWh)', value: 'mWH', rel: '1000000000' },
          { label: '千瓦时(kWh)', value: 'kWH', rel: '1000' },
          { label: '兆瓦时(MWh)', value: 'MWH', rel: '1' },
          { label: '焦(J)', value: 'j', rel: '3600000000' },
          { label: '千焦(kJ)', value: 'kJ', rel: '3600000' },
        ],
      },
    ],
  },
  {
    label: '功率',
    value: 'power',
    options: [
      {
        label: '功率单位',
        value: 'w',
        options: [
          { label: '瓦(W)', value: 'W', rel: '1000000000' },
          { label: '毫瓦(mW)', value: 'mW', rel: '1000000000000' },
          { label: '千瓦(kW)', value: 'kW', rel: '1000000' },
          { label: '兆瓦(MW)', value: 'MW', rel: '1000' },
          { label: '亿瓦(GW)', value: 'GW', rel: '1' },
        ],
      },
    ],
  },
]
