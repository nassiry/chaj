const Chaj = require('../chaj');

test('Convert Gregory to Shamsi', () => {
    expect(Chaj.format('2022-10-25')).toBe('1401/8/3');
});
test('Convert Shamsi to Gregory', () => {
    expect(Chaj.format('1401-8-25', {shamsi: true})).toBe('11/16/2022');
});

test('Convert Gregory to Shamsi with options', () => {
    expect(Chaj.format('2022-10-25', {dateStyle: 'full'})).toBe('1401 عقرب 3, سه‌شنبه');
});

test('Convert Shamsi to Gregory with options', () => {
    expect(Chaj.format('1401-10-02', {shamsi: true, dateStyle: 'full'})).toBe('Friday, December 23, 2022');
});