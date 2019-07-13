import spacing from 'style/spacing';

const makeGridColumnTemplate = (count = 6) => {
  const templateColumns = [];
  const colWidth = `minmax(0, ${spacing('xxl')})`;
  const gutterWidth = `minmax(0, 1fr)`;

  for (let i = 0; i <= count; i++) {
    let line = [];
    if (i < count) line.push(`col${i + 1}Start`);
    if (i > 0) line.push(`col${i}End`);
    if (i === 0) line.push('contentStart');
    if (i === count) line.push('contentEnd');
    templateColumns.push(`[${line.join(' ')}]`);
  }

  return [
    '[bleedStart]',
    gutterWidth,
    templateColumns.join(` ${colWidth} `),
    gutterWidth,
    '[bleedEnd]',
  ].join(' ');
};

export default makeGridColumnTemplate;
