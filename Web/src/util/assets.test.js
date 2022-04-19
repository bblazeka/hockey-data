import { getLogo } from './assets';

describe('Assets methods', () => {
  it('gets the logo', () => {
    let mockGetLogo = jest.fn().mockImplementation(getLogo);
    mockGetLogo(1);
    mockGetLogo(10);
    mockGetLogo(55);
    mockGetLogo(58);

    const result = mockGetLogo.mock.results.map(r => r.value);
    expect(result).toEqual(['/assets/logos/njd.webp', '/assets/logos/tor.webp', '/assets/logos/sea.webp', "/logo512.png"]);
  });
});