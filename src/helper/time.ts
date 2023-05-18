const pluralize = (time: number, label: string) => {
  return time + label + '前';
};

export const timeAgo = (time: Date) => {
  const between = (Date.now() / 1000) - ((new Date(time).getTime()) / 1000);
  const hourS = 3600;
  const dayS = hourS * 24;
  const weekS = dayS * 7;
  const monthS = dayS * 30;
  const yearS = monthS * 12;

  if (between < hourS ) {
    return Object.is(~~(between / 60 ), 0)
      ? '刚刚'
      : pluralize(~~(between / 60), '分钟');
  }

  if (between < dayS) return pluralize(~~(between / hourS), '小时');
  if (between < weekS) return pluralize(~~(between / dayS), '天');
  if (between < monthS) return pluralize(~~(between / weekS), '周');
  if (between < yearS) return pluralize(~~(between / monthS), '个月');

  return  pluralize(~~(between / yearS), '年');
};
