import { GetNumberWithOrdinal, IsNullOrUndefined, generateSemanticUICountryId, FormatNumberToCurrency, FormatDecimals, DateToServerFormat, getDatesArray } from './common';

describe('Common methods', () => {
it('generates semantic ui country identifier', () => {
  let mockGenerateSemanticUICountryId = jest.fn().mockImplementation(generateSemanticUICountryId);
  mockGenerateSemanticUICountryId('CAN');
  expect(mockGenerateSemanticUICountryId).toHaveBeenCalled();
  mockGenerateSemanticUICountryId('SVN');
  expect(mockGenerateSemanticUICountryId).toHaveBeenCalled();
  mockGenerateSemanticUICountryId('dnk');
  expect(mockGenerateSemanticUICountryId).toHaveBeenCalled();

  const result = mockGenerateSemanticUICountryId.mock.results.map(r => r.value);
  expect(result).toEqual(['ca', 'si', 'dk']);
});

it('checks if param is null or undefined', () => {
  let mockIsNullOrUndefined = jest.fn().mockImplementation(IsNullOrUndefined);
  mockIsNullOrUndefined(null);
  expect(mockIsNullOrUndefined).toHaveBeenCalled();

  mockIsNullOrUndefined(undefined);
  expect(mockIsNullOrUndefined).toHaveBeenCalled();


  mockIsNullOrUndefined({});
  expect(mockIsNullOrUndefined).toHaveBeenCalled();
  const result = mockIsNullOrUndefined.mock.results.map(r => r.value);
  expect(result).toEqual([true, true, false]);
});

it('returns number with ordinal', () => {
  let mockGetNumberWithOrdinal = jest.fn().mockImplementation(GetNumberWithOrdinal);
  mockGetNumberWithOrdinal(5);
  expect(mockGetNumberWithOrdinal).toHaveBeenCalled();

  mockGetNumberWithOrdinal(1);
  expect(mockGetNumberWithOrdinal).toHaveBeenCalled();

  const result = mockGetNumberWithOrdinal.mock.results.map(r => r.value);
  expect(result).toEqual(['5th', '1st']);
});

it('formats the number with currency', () => {
  let mockFormatting = jest.fn().mockImplementation(FormatNumberToCurrency);
  mockFormatting(1000);
  mockFormatting(10000000);
  expect(mockFormatting).toHaveBeenCalled();

  const result = mockFormatting.mock.results.map(r => r.value);
  expect(result).toEqual(['$1,000', '$10,000,000']);
});

it('formats the number with decimals', () => {
  let mockDecimalsFormatting = jest.fn().mockImplementation(FormatDecimals);
  mockDecimalsFormatting(10.256, 3);
  mockDecimalsFormatting(10.256, 2);
  expect(mockDecimalsFormatting).toHaveBeenCalled();

  const result = mockDecimalsFormatting.mock.results.map(r => r.value);
  expect(result).toEqual(['10.256', '10.26']);
});

it('converts dates to server format', () => {
  let mockDateServerFormatter = jest.fn().mockImplementation(DateToServerFormat);
  var date = new Date(2020, 9, 10, 0, 0, 0, 0);
  mockDateServerFormatter(date);

  const result = mockDateServerFormatter.mock.results.map(r => r.value);
  expect(result).toEqual(['2020-10-10']);
});

it('generates the array of dates between dates', () => {
  let mockDatesArrayGenerator = jest.fn().mockImplementation(getDatesArray);
  var start = new Date(2020, 9, 30, 0, 0, 0, 0);
  var end = new Date(2020, 10, 1, 0, 0, 0, 0);
  var expectedOutput = [
    new Date(2020, 9, 30, 0, 0, 0, 0), 
    new Date(2020, 9, 31, 0, 0, 0, 0), 
    new Date(2020, 10, 1, 0, 0, 0, 0)];
  mockDatesArrayGenerator(start, end);

  const result = mockDatesArrayGenerator.mock.results.map(r => r.value);
  expect(result).toEqual([expectedOutput]);
});
});