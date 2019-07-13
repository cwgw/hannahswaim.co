import spacing from 'style/spacing';

const makeGridColumnTemplate = count => {
  const columns = [];
  const colWidth = `minmax(0, ${spacing('xl')})`;
  const gutterWidth = `minmax(0, 1fr)`;

  for (let i = 0; i <= count; i++) {
    let line = [];
    if (i < count) line.push(`col${i + 1}Start`);
    if (i > 0) line.push(`col${i}End`);
    if (i === 0) line.push('contentStart start');
    if (i === count) line.push('contentEnd end');
    columns.push(`[${line.join(' ')}]`);
  }

  return [
    '[bleedStart aStart]',
    gutterWidth,
    '[gutterStart bStart]',
    gutterWidth,
    columns.join(` ${colWidth} `),
    gutterWidth,
    '[gutterEnd bEnd]',
    gutterWidth,
    '[bleedEnd aEnd]',
  ].join(' ');
};

export { makeGridColumnTemplate };
