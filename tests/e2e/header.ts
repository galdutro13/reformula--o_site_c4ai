import { test, expect, type Page, type Locator } from '@playwright/test';
import { globalHeader } from './requirements';

export async function openMobileHeader(page: Page) {
  const menu = page.locator('.mobile-navigation');
  const summary = menu.locator(':scope > summary');
  const mobile = await summary.isVisible();
  if (mobile && (await menu.getAttribute('open')) === null) {
    await summary.focus();
    await summary.press('Enter');
    await expect(menu).toHaveAttribute('open', '');
  }
  return mobile;
}

async function visibleMainNavigation(page: Page, locale: 'pt' | 'en') {
  const mobile = await openMobileHeader(page);
  const required = globalHeader[locale];
  return page.getByRole('navigation', {
    name: mobile ? required.mobileMainName : required.mainName,
    exact: true,
  });
}

async function assertTouchTargets(header: Locator) {
  for (const control of await header
    .locator('a:visible, summary:visible')
    .all()) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    const desktopArrow = await control.evaluate(
      (el) =>
        el.matches('.desktop-navigation .submenu > summary') &&
        window.matchMedia('(min-width: 1241px)').matches,
    );
    // Autorização posterior: setas desktop de 24 px; o menu móvel continua
    // com alvos de 44 px, sem controles invadindo o espaço entre itens.
    expect(box!.width).toBeGreaterThanOrEqual(desktopArrow ? 24 : 44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
}

async function assertHeaderDimensions(header: Locator, desktop: boolean) {
  const geometry = await header.evaluate((el) => {
    const box = (element: Element) => {
      const { x, y, width, height, right, bottom } =
        element.getBoundingClientRect();
      return { x, y, width, height, right, bottom };
    };
    const logo = el.querySelector('.wordmark img')!;
    const menu = el.querySelector('.mobile-navigation > summary')!;
    const language = el.querySelector('.desktop-language')!;
    return {
      header: box(el),
      logo: box(logo),
      menu: box(menu),
      language: box(language),
      mainGap: Number.parseFloat(
        getComputedStyle(el.querySelector('.desktop-navigation .main-menu')!)
          .columnGap,
      ),
      languagePadding: Number.parseFloat(
        getComputedStyle(language).paddingLeft,
      ),
    };
  });
  if (desktop) {
    expect(geometry.header.height).toBeGreaterThanOrEqual(96);
    expect(geometry.header.height).toBeLessThanOrEqual(104);
    expect(geometry.logo.width).toBe(181);
    expect(geometry.logo.height).toBe(72);
    expect(geometry.mainGap).toBeGreaterThanOrEqual(20);
    expect(geometry.mainGap).toBeLessThanOrEqual(24);
    expect(geometry.languagePadding).toBeGreaterThanOrEqual(24);
    expect(geometry.languagePadding).toBeLessThanOrEqual(32);
  } else {
    expect(geometry.header.height).toBeGreaterThanOrEqual(72);
    expect(geometry.header.height).toBeLessThanOrEqual(80);
    expect(geometry.logo.width).toBe(160);
    expect(geometry.menu.x).toBeGreaterThan(geometry.logo.right);
    expect(
      Math.abs(
        geometry.menu.y +
          geometry.menu.height / 2 -
          geometry.logo.y -
          geometry.logo.height / 2,
      ),
    ).toBeLessThan(2);
  }
  expect(
    Math.abs(geometry.logo.width / geometry.logo.height - 181 / 72),
  ).toBeLessThan(0.01);
}

async function assertDesktopArrowSpacing(navigation: Locator) {
  const distances = await navigation.evaluate((element) => {
    const labels = [
      ...element.querySelectorAll('.nav-expandable > a'),
      element.querySelector('.resource-label')!,
    ];
    return labels.map((label) => {
      const text = Array.from(label.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent!.trim(),
      )!;
      const value = text.textContent!;
      const range = document.createRange();
      range.setStart(text, value.search(/\S/));
      range.setEnd(text, value.trimEnd().length);
      const arrow = label.closest('li')!.querySelector('.nav-chevron')!;
      return (
        arrow.getBoundingClientRect().left - range.getBoundingClientRect().right
      );
    });
  });
  expect(distances).toHaveLength(3);
  for (const distance of distances) {
    expect(distance).toBeGreaterThanOrEqual(7);
    expect(distance).toBeLessThanOrEqual(9);
  }
  expect(Math.max(...distances) - Math.min(...distances)).toBeLessThan(1);
}

async function assertDesktopMenuSpacing(navigation: Locator) {
  const geometry = await navigation.evaluate((element) => {
    const rows = Array.from(element.querySelectorAll(':scope > ul > li'));
    const content = rows.map((row) => {
      const label = row.querySelector(':scope > a, .resource-label')!;
      const text = Array.from(label.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent!.trim(),
      )!;
      const value = text.textContent!;
      const range = document.createRange();
      range.setStart(text, value.search(/\S/));
      range.setEnd(text, value.trimEnd().length);
      const textBox = range.getBoundingClientRect();
      const arrow = row.querySelector('.nav-chevron');
      return {
        start: textBox.left,
        end: arrow?.getBoundingClientRect().right ?? textBox.right,
      };
    });
    const controls = Array.from(
      element.querySelectorAll(
        ':scope > ul > li > a, :scope > ul > li > details > summary',
      ),
    ).map((control) => {
      const { left, right, width, height } = control.getBoundingClientRect();
      return {
        left,
        right,
        width,
        height,
        desktopArrow: control.matches('.submenu > summary'),
      };
    });
    return {
      gaps: content
        .slice(1)
        .map((item, index) => item.start - content[index].end),
      controls,
      arrowTargets: Array.from(
        element.querySelectorAll('.submenu > summary, .nav-arrow-slot'),
      ).map((control) => {
        const { right, width, height } = control.getBoundingClientRect();
        const arrow = control.querySelector('.nav-chevron')!;
        const icon = arrow.getBoundingClientRect();
        const hit = document.elementFromPoint(
          icon.right + 16,
          icon.top + icon.height / 2,
        );
        return {
          right,
          width,
          height,
          interactiveGap: Boolean(hit?.closest('a, summary, button')),
        };
      }),
    };
  });
  expect(geometry.gaps).toHaveLength(5);
  for (const gap of geometry.gaps) {
    expect(gap).toBeGreaterThanOrEqual(39);
    expect(gap).toBeLessThanOrEqual(41);
  }
  expect(Math.max(...geometry.gaps) - Math.min(...geometry.gaps)).toBeLessThan(
    1,
  );
  expect(geometry.controls).toHaveLength(8);
  for (const [index, control] of geometry.controls.entries()) {
    expect(control.width).toBeGreaterThanOrEqual(
      control.desktopArrow ? 24 : 44,
    );
    expect(control.height).toBeGreaterThanOrEqual(44);
    if (index > 0)
      expect(control.left + 0.5).toBeGreaterThanOrEqual(
        geometry.controls[index - 1].right,
      );
  }
  expect(geometry.arrowTargets).toHaveLength(3);
  for (const [index, target] of geometry.arrowTargets.entries()) {
    expect(Math.abs(target.width - 24)).toBeLessThanOrEqual(1);
    expect(target.height).toBeGreaterThanOrEqual(44);
    expect(target.interactiveGap).toBe(false);
    expect(target.right).toBeLessThanOrEqual(
      geometry.controls[[3, 6, 7][index]].left + 0.5,
    );
  }
}

async function assertMobileNavigationAlignment(navigation: Locator) {
  const geometry = await navigation.evaluate((element) => {
    const right = element.getBoundingClientRect().right;
    const centers = Array.from(
      element.querySelectorAll('.nav-chevron, .nav-external'),
    ).map((icon) => {
      const box = icon.getBoundingClientRect();
      return box.left + box.width / 2;
    });
    const labels = Array.from(element.querySelectorAll(':scope > ul > li')).map(
      (row) => {
        const label = row.querySelector(':scope > a, .resource-label')!;
        const text = Array.from(label.childNodes).find(
          (node) =>
            node.nodeType === Node.TEXT_NODE && node.textContent!.trim(),
        )!;
        const value = text.textContent!;
        const range = document.createRange();
        range.setStart(text, value.search(/\S/));
        range.setEnd(text, value.trimEnd().length);
        return range.getBoundingClientRect().left;
      },
    );
    return { right, centers, labels };
  });
  expect(geometry.centers).toHaveLength(4);
  for (const center of geometry.centers)
    expect(Math.abs(center - geometry.right + 22)).toBeLessThanOrEqual(1);
  expect(
    Math.max(...geometry.centers) - Math.min(...geometry.centers),
  ).toBeLessThan(1);
  expect(geometry.labels).toHaveLength(6);
  expect(
    Math.max(...geometry.labels) - Math.min(...geometry.labels),
  ).toBeLessThan(1);
}

for (const locale of ['pt', 'en'] as const) {
  const required = globalHeader[locale];

  test(`${locale}: cabeçalho tem composição compacta e menu responsivo com idiomas integrados`, async ({
    page,
  }) => {
    for (const width of [1440, 1280, 1241, 1240, 1239, 1024, 800, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(required.path);
      const desktop = width > 1240;
      const header = page.getByRole('banner');
      await expect(
        header.getByRole('link', { name: required.brand, exact: true }),
      ).toHaveAttribute('href', required.path);
      await expect(header.locator('.wordmark img')).toHaveAttribute(
        'src',
        '/media/c4ai-logo-figma.svg',
      );
      await assertHeaderDimensions(header, desktop);
      await assertTouchTargets(header);
      const desktopNav = header.getByRole('navigation', {
        name: required.mainName,
        exact: true,
        includeHidden: true,
      });
      const desktopLanguage = header.locator('.desktop-language');
      const mobileMenu = header.locator('.mobile-navigation');
      if (desktop) {
        await expect(desktopNav).toBeVisible();
        await expect(desktopLanguage).toBeVisible();
        await expect(mobileMenu).toBeHidden();
      } else {
        await expect(desktopNav).toBeHidden();
        await expect(desktopLanguage).toBeHidden();
        await expect(mobileMenu).not.toHaveAttribute('open');
        await expect(
          mobileMenu.locator(':scope > summary'),
        ).toHaveAccessibleName(required.menu);
        await expect(
          header.getByRole('navigation', {
            name: required.languageName,
            exact: true,
          }),
        ).toHaveCount(0);
      }
      const navigation = await visibleMainNavigation(page, locale);
      await expect(navigation).toBeVisible();
      if (width === 1440 || width === 1241)
        await assertDesktopMenuSpacing(navigation);
      await expect(navigation.locator(':scope > ul > li')).toHaveCount(6);
      await expect(navigation.locator(':scope > ul > li > a')).toHaveCount(5);
      await expect(
        navigation.locator(':scope > ul > li > details'),
      ).toHaveCount(3);
      for (const item of required.items)
        await expect(
          navigation.getByRole('link', { name: item.label, exact: true }),
        ).toHaveAttribute('href', item.href);
      await expect(
        navigation.locator('.resource-menu > summary'),
      ).toHaveAccessibleName(required.resources);
      await expect(
        navigation.locator(`a[href="${required.opportunities.href}"]`),
      ).toContainText(required.opportunities.label);
      const languages = header.getByRole('navigation', {
        name: required.languageName,
        exact: true,
      });
      await expect(languages).toHaveCount(1);
      await expect(languages).toBeVisible();
      await expect(languages.getByRole('link')).toHaveCount(2);
      await expect(
        languages.getByRole('link', {
          name: required.currentLanguage,
          exact: true,
        }),
      ).toHaveAttribute('aria-current', 'page');
      await assertTouchTargets(header);
      if (!desktop) {
        await expect(
          mobileMenu.locator(':scope > summary'),
        ).toHaveAccessibleName(required.close);
        const before = await navigation.boundingBox();
        const after = await languages.boundingBox();
        expect(before).not.toBeNull();
        expect(after).not.toBeNull();
        expect(after!.y).toBeGreaterThanOrEqual(before!.y + before!.height);
      }
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
    }
  });

  test(`${locale}: menus Sobre, Notícias e Recursos funcionam por Enter e Espaço e preservam destinos`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const navigation = await visibleMainNavigation(page, locale);
    for (const expected of required.menus) {
      const panel = navigation
        .locator(`details.${expected.className}`)
        .nth(expected.index);
      const summary = panel.locator(':scope > summary');
      await expect(summary).toHaveAccessibleName(expected.name);
      await expect(panel).not.toHaveAttribute('open');
      await summary.focus();
      await expect(summary).toHaveCSS('outline-style', 'solid');
      await expect(summary).not.toHaveCSS('outline-width', '0px');
      await summary.press('Enter');
      await expect(panel).toHaveAttribute('open', '');
      await expect(panel.locator(':scope > ul')).toBeVisible();
      await expect(
        panel.getByRole('link', { name: expected.firstLink, exact: true }),
      ).toHaveAttribute('href', expected.firstHref);
      await expect(panel.locator(':scope > ul > li').first()).toContainText(
        expected.firstLink,
      );
      await expect(panel.getByRole('link')).toHaveCount(expected.links.length);
      for (const [name, href] of expected.links)
        await expect(
          panel.getByRole('link', { name, exact: true }),
        ).toHaveAttribute('href', href);
      await assertTouchTargets(page.getByRole('banner'));
      await summary.press('Space');
      await expect(panel).not.toHaveAttribute('open');
      await expect(panel.locator(':scope > ul')).toBeHidden();
    }
    const languages = page.getByRole('navigation', {
      name: required.languageName,
      exact: true,
    });
    const mobileMenu = page.locator('.mobile-navigation');
    const menuSummary = mobileMenu.locator(':scope > summary');
    if (await menuSummary.isVisible()) {
      await menuSummary.focus();
      await expect(menuSummary).toHaveCSS('outline-style', 'solid');
      await menuSummary.press('Space');
      await expect(mobileMenu).not.toHaveAttribute('open');
      await expect(menuSummary).toHaveAccessibleName(required.menu);
      await expect(languages).toHaveCount(0);
      await menuSummary.press('Enter');
      await expect(mobileMenu).toHaveAttribute('open', '');
      await expect(menuSummary).toHaveAccessibleName(required.close);
      await expect(languages).toBeVisible();
    }
    const other = languages.getByRole('link', {
      name: required.otherLanguage,
      exact: true,
    });
    await expect(other).toHaveAttribute('href', required.pair);
    await other.focus();
    await expect(other).toHaveCSS('outline-style', 'solid');
    await other.press('Enter');
    await expect(page).toHaveURL(required.pair);
  });

  test(`${locale}: cabeçalho identifica página atual e contexto de notícias`, async ({
    page,
  }) => {
    for (const scenario of required.activePages) {
      await page.goto(scenario.path);
      const navigation = await visibleMainNavigation(page, locale);
      const current = navigation.locator(':scope > ul > li > a[aria-current]');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveAttribute('href', scenario.href);
      await expect(current).toHaveAttribute('aria-current', scenario.current);
    }
    for (const path of ['/', '/404.html']) {
      await page.goto(path);
      const navigation = await visibleMainNavigation(page, 'pt');
      await expect(
        navigation.locator('a[aria-current], summary[data-current]'),
      ).toHaveCount(0);
    }
  });

  test(`${locale}: navegação principal oferece foco visível, hover e retorno nativo à Home`, async ({
    page,
  }) => {
    await page.goto(required.path);
    const navigation = await visibleMainNavigation(page, locale);
    const research = navigation.getByRole('link', {
      name: required.items[2].label,
      exact: true,
    });
    const background = await research.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    await research.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(research).toBeFocused();
    await expect(research).toHaveCSS('outline-style', 'solid');
    await expect(research).not.toHaveCSS('outline-width', '0px');
    await page.keyboard.press('Tab');
    await research.hover();
    await expect(research).not.toHaveCSS('background-color', background);
    await research.focus();
    await research.press('Enter');
    await expect(page).toHaveURL(required.items[2].href);
    const next = await visibleMainNavigation(page, locale);
    const home = next.getByRole('link', { name: required.home, exact: true });
    await home.focus();
    await home.press('Enter');
    await expect(page).toHaveURL(required.path);
  });

  test(`${locale}: links diretos e setas têm funções distintas e estado aberto persistente`, async ({
    page,
  }) => {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(required.path);
      await page.mouse.move(0, 0);
      const navigation = await visibleMainNavigation(page, locale);
      if (width === 1440) await assertDesktopArrowSpacing(navigation);
      for (const expected of required.menus) {
        const panel = navigation
          .locator(`details.${expected.className}`)
          .nth(expected.index);
        const summary = panel.locator(':scope > summary');
        const chevron = summary.locator('.nav-chevron');
        const interaction =
          expected.className === 'submenu' ? panel.locator('..') : summary;
        const before = await interaction.evaluate(
          (el) => getComputedStyle(el).backgroundColor,
        );
        await summary.focus();
        await summary.press('Enter');
        await expect(panel).toHaveAttribute('open', '');
        await expect(interaction).not.toHaveCSS('background-color', before);
        await expect(chevron).toHaveCSS(
          'transform',
          'matrix(-1, 0, 0, -1, 0, 0)',
        );
        await summary.press('Space');
        await expect(panel).not.toHaveAttribute('open');
        if (expected.className === 'submenu') {
          await expect(summary).toHaveCSS('border-left-width', '0px');
          const direct = panel.locator('..').locator(':scope > a');
          await expect(direct).toHaveAttribute('href', expected.firstHref);
          await expect(direct).toHaveAccessibleName(
            required.items[expected.index === 0 ? 1 : 3].label,
          );
        }
      }
      const about = navigation.locator(':scope > ul > li > a').nth(1);
      await about.focus();
      await about.press('Enter');
      await expect(page).toHaveURL(required.items[1].href);
    }
  });

  test(`${locale}: menu estreito usa linhas completas e submenus indentados no fluxo`, async ({
    page,
  }) => {
    for (const width of [320, 390, 800, 1239, 1240]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(required.path);
      const navigation = await visibleMainNavigation(page, locale);
      await expect(page.locator('.wordmark')).not.toHaveCSS(
        'position',
        'absolute',
      );
      await assertMobileNavigationAlignment(navigation);
      const rows = navigation.locator(':scope > ul > li');
      await expect(rows).toHaveCount(6);
      const navBox = (await navigation.boundingBox())!;
      for (const row of await rows.all()) {
        const box = (await row.boundingBox())!;
        expect(Math.abs(box.x - navBox.x)).toBeLessThanOrEqual(1);
        expect(Math.abs(box.width - navBox.width)).toBeLessThanOrEqual(1);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
      for (const row of [rows.nth(1), rows.nth(3)]) {
        const link = row.locator(':scope > a');
        const summary = row.locator(':scope > details > summary');
        const linkBox = (await link.boundingBox())!;
        const arrowBox = (await summary.boundingBox())!;
        expect(Math.abs(linkBox.x - navBox.x)).toBeLessThanOrEqual(1);
        expect(Math.abs(arrowBox.width - 44)).toBeLessThanOrEqual(1);
        expect(arrowBox.x).toBeGreaterThanOrEqual(linkBox.x + linkBox.width);
        expect(arrowBox.x - linkBox.x - linkBox.width).toBeLessThanOrEqual(8);
        expect(
          Math.abs(arrowBox.x + arrowBox.width - navBox.x - navBox.width),
        ).toBeLessThanOrEqual(1);
      }
      const resourceBox = (await navigation
        .locator('.resource-menu > summary')
        .boundingBox())!;
      expect(Math.abs(resourceBox.width - navBox.width)).toBeLessThanOrEqual(1);
      const about = navigation.locator('details.submenu').first();
      const summary = about.locator(':scope > summary');
      const following = rows.nth(2);
      const previousY = (await following.boundingBox())!.y;
      await summary.click();
      await assertMobileNavigationAlignment(navigation);
      const links = about.locator(':scope > ul');
      const expandedBox = (await links.boundingBox())!;
      const summaryBox = (await summary.boundingBox())!;
      expect(expandedBox.y).toBeGreaterThanOrEqual(
        summaryBox.y + summaryBox.height,
      );
      expect((await following.boundingBox())!.y).toBeGreaterThan(previousY);
      for (const link of await links.getByRole('link').all()) {
        const box = (await link.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(navBox.x + 8);
        expect(box.x + box.width).toBeLessThanOrEqual(
          navBox.x + navBox.width + 1,
        );
      }
      await assertTouchTargets(page.getByRole('banner'));
      await summary.click();
      expect((await following.boundingBox())!.y).toBe(previousY);
    }
  });

  test(`${locale}: C06/C10 respeita movimento reduzido nos chevrons`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(required.path);
    const navigation = await visibleMainNavigation(page, locale);
    for (const expected of required.menus) {
      const panel = navigation
        .locator(`details.${expected.className}`)
        .nth(expected.index);
      const summary = panel.locator(':scope > summary');
      const chevron = summary.locator('.nav-chevron');
      await expect(chevron).toHaveCSS('transition-duration', '0s');
      await expect(chevron).toHaveCSS('transform', 'none');
      await summary.press('Enter');
      await expect(panel).toHaveAttribute('open', '');
      await expect(chevron).toHaveCSS(
        'transform',
        'matrix(-1, 0, 0, -1, 0, 0)',
      );
      await summary.press('Space');
      await expect(panel).not.toHaveAttribute('open');
      await expect(chevron).toHaveCSS('transform', 'none');
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const chevron of await navigation.locator('.nav-chevron').all())
      await expect(chevron).toHaveCSS('transition-duration', '0.15s');
  });

  test(`${locale}: C11 fecha após saída conjunta de ponteiro e foco`, async ({
    page,
    javaScriptEnabled,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    if (javaScriptEnabled) {
      await page.clock.install();
      await page.clock.pauseAt(new Date());
    }
    await page.goto(required.path);
    const navigation = await visibleMainNavigation(page, locale);
    for (const expected of required.menus) {
      await page.mouse.move(0, 0);
      const panel = navigation
        .locator(`details.${expected.className}`)
        .nth(expected.index);
      const summary = panel.locator(':scope > summary');
      const links = panel.getByRole('link');
      if (!javaScriptEnabled) {
        await summary.press('Enter');
        await links.last().focus();
        await page.keyboard.press('Tab');
        await expect(panel).toHaveAttribute('open', '');
        await summary.press('Space');
        continue;
      }
      await summary.hover();
      await links.first().focus();
      await page.mouse.move(0, 0);
      await page.clock.runFor(200);
      await expect(panel).toHaveAttribute('open', '');
      await page.keyboard.press('Tab');
      await page.clock.runFor(200);
      await expect(links.nth(1)).toBeFocused();
      await expect(panel).toHaveAttribute('open', '');
      await links.last().focus();
      await page.keyboard.press('Tab');
      const nextFocus = await page.evaluateHandle(() => document.activeElement);
      await page.clock.runFor(200);
      await expect(panel).not.toHaveAttribute('open');
      expect(
        await page.evaluate((el) => document.activeElement === el, nextFocus),
      ).toBe(true);
      await nextFocus.dispose();

      // Sair para trás também fecha, mas passar pelo summary mantém aberto.
      await summary.hover();
      await links.first().focus();
      await page.mouse.move(0, 0);
      await page.keyboard.press('Shift+Tab');
      await page.clock.runFor(200);
      await expect(summary).toBeFocused();
      await expect(panel).toHaveAttribute('open', '');
      await page.keyboard.press('Shift+Tab');
      await page.clock.runFor(200);
      await expect(panel).not.toHaveAttribute('open');

      // O ponteiro mantém aberto após o foco sair; reentrada cancela fechamento.
      await summary.hover();
      await links.last().focus();
      await page.keyboard.press('Tab');
      await page.clock.runFor(200);
      await expect(panel).toHaveAttribute('open', '');
      await page.mouse.move(0, 0);
      await page.clock.runFor(100);
      await summary.hover();
      await page.clock.runFor(200);
      await expect(panel).toHaveAttribute('open', '');
      await page.mouse.move(0, 0);
      await page.clock.runFor(200);
      await expect(panel).not.toHaveAttribute('open');
    }
  });

  test(`${locale}: primeiro clique confirma hover e segundo clique fecha submenu`, async ({
    page,
    javaScriptEnabled,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const expected of required.menus) {
      await page.goto(required.path);
      await page.mouse.move(0, 0);
      const navigation = await visibleMainNavigation(page, locale);
      const panel = navigation
        .locator(`details.${expected.className}`)
        .nth(expected.index);
      const summary = panel.locator(':scope > summary');
      await expect(panel).not.toHaveAttribute('open');
      await summary.click();
      await expect(panel).toHaveAttribute('open', '');
      await expect(panel.locator(':scope > ul')).toBeVisible();
      await summary.click();
      await expect(panel).not.toHaveAttribute('open');

      if (!javaScriptEnabled) continue;

      // Reentrar após fechar deve permitir uma nova confirmação do hover.
      await page.mouse.move(0, 0);
      await summary.hover();
      await expect(panel).toHaveAttribute('open', '');
      await summary.click();
      await expect(panel).toHaveAttribute('open', '');
      // O foco mantém o painel aberto na saída; reentrar não renova a marcação.
      await page.mouse.move(0, 0);
      await summary.hover();
      await summary.click();
      await expect(panel).not.toHaveAttribute('open');

      for (const key of ['Enter', 'Space']) {
        await page.mouse.move(0, 0);
        await summary.hover();
        await expect(panel).toHaveAttribute('open', '');
        await summary.press(key);
        await expect(panel).not.toHaveAttribute('open');
        await summary.press(key);
        await expect(panel).toHaveAttribute('open', '');
        await summary.click();
        await expect(panel).not.toHaveAttribute('open');
      }
    }
  });

  test(`${locale}: desktop alinha painéis ao acionador e fecha por fora ou Escape com foco restituído`, async ({
    page,
    javaScriptEnabled,
  }) => {
    for (const width of [1241, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(required.path);
      const navigation = await visibleMainNavigation(page, locale);
      const menus = navigation.locator(':scope > ul > li > details');
      const about = menus.nth(0);
      const news = menus.nth(1);
      const aboutSummary = about.locator(':scope > summary');
      const newsSummary = news.locator(':scope > summary');
      await aboutSummary.focus();
      await aboutSummary.press('Enter');
      const controlBox = (await about.locator('..').boundingBox())!;
      const panelBox = (await about.locator(':scope > ul').boundingBox())!;
      expect(Math.abs(panelBox.x - controlBox.x)).toBeLessThanOrEqual(1);
      expect(panelBox.y).toBeGreaterThanOrEqual(
        controlBox.y + controlBox.height,
      );
      await newsSummary.focus();
      await newsSummary.press('Enter');
      await expect(about).not.toHaveAttribute('open');
      await expect(news).toHaveAttribute('open', '');
      for (const menu of await menus.all()) {
        const summary = menu.locator(':scope > summary');
        if ((await menu.getAttribute('open')) === null) {
          await summary.focus();
          await summary.press('Enter');
        }
        const box = (await menu.locator(':scope > ul').boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
        if (javaScriptEnabled) {
          await menu.getByRole('link').first().focus();
          await page.keyboard.press('Escape');
          await expect(menu).not.toHaveAttribute('open');
          await expect(summary).toBeFocused();
          await summary.press('Enter');
          await page
            .locator('main')
            .evaluate((el) =>
              (el as HTMLElement).focus({ preventScroll: true }),
            );
          const arrow = (await summary.locator('.nav-chevron').boundingBox())!;
          await page.mouse.click(
            arrow.x + arrow.width + 16,
            arrow.y + arrow.height / 2,
          );
          await expect(menu).not.toHaveAttribute('open');
          await expect(summary).not.toBeFocused();
        } else {
          await summary.press('Space');
          await expect(menu).not.toHaveAttribute('open');
        }
      }
      if (javaScriptEnabled) {
        for (const expected of required.menus) {
          const menu = navigation
            .locator(`details.${expected.className}`)
            .nth(expected.index);
          const group = menu.locator('..');
          await group.hover();
          await expect(menu).toHaveAttribute('open', '');
          await expect(navigation.locator('details[open]')).toHaveCount(1);
          await menu.getByRole('link').first().hover();
          await expect(menu).toHaveAttribute('open', '');
          await page.mouse.move(0, 0);
          await expect(menu).not.toHaveAttribute('open');
          if (expected.className === 'submenu') {
            const direct = group.locator(':scope > a');
            await direct.hover();
            await expect(menu).toHaveAttribute('open', '');
            await direct.click();
            await expect(page).toHaveURL(expected.firstHref);
            await page.mouse.move(0, 0);
            await page.goto(required.path);
          }
        }
      }
    }
  });
}
