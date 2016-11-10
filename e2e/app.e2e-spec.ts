import { Bs4Page } from './app.po';

describe('bs4 App', function() {
  let page: Bs4Page;

  beforeEach(() => {
    page = new Bs4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
