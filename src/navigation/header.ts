// Progressive desktop interactions; native details preserve navigation without JS.
const desktopNavigation = document.querySelector<HTMLElement>(
  '.desktop-navigation',
);
if (desktopNavigation) {
  const panels = Array.from(
    desktopNavigation.querySelectorAll<HTMLDetailsElement>(
      'details[data-nav-submenu]',
    ),
  );
  const desktop = window.matchMedia('(min-width: 1241px)');
  const closeTimers = new Map<HTMLDetailsElement, number>();
  const hoverOpened = new Set<HTMLDetailsElement>();

  function cancelClose(panel: HTMLDetailsElement) {
    window.clearTimeout(closeTimers.get(panel));
    closeTimers.delete(panel);
  }

  function closePanel(panel: HTMLDetailsElement) {
    cancelClose(panel);
    hoverOpened.delete(panel);
    panel.open = false;
  }

  function closePanels(except?: HTMLDetailsElement) {
    for (const panel of panels) {
      if (panel === except) continue;
      closePanel(panel);
    }
  }

  // Also enforces exclusivity in browsers that do not support details[name].
  for (const panel of panels) {
    const item = panel.closest('li')!;
    const summary = panel.querySelector<HTMLElement>(':scope > summary')!;
    summary.addEventListener('click', (event) => {
      if (
        desktop.matches &&
        event instanceof PointerEvent &&
        event.pointerType === 'mouse' &&
        panel.open &&
        hoverOpened.has(panel)
      ) {
        // The first mouse click confirms the opening already caused by hover.
        event.preventDefault();
      }
      hoverOpened.delete(panel);
    });
    summary.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') hoverOpened.delete(panel);
    });
    item.addEventListener('pointerenter', (event) => {
      if (!desktop.matches || event.pointerType !== 'mouse') return;
      cancelClose(panel);
      closePanels(panel);
      if (!panel.open) hoverOpened.add(panel);
      panel.open = true;
    });
    item.addEventListener('pointerleave', (event) => {
      if (!desktop.matches || event.pointerType !== 'mouse') return;
      cancelClose(panel);
      closeTimers.set(
        panel,
        window.setTimeout(() => {
          closeTimers.delete(panel);
          if (!panel.contains(document.activeElement)) closePanel(panel);
        }, 150),
      );
    });
    panel.addEventListener('toggle', () => {
      if (!panel.open) hoverOpened.delete(panel);
      if (desktop.matches && panel.open) closePanels(panel);
    });
  }

  document.addEventListener('click', (event) => {
    if (!desktop.matches || !(event.target instanceof Node)) return;
    for (const panel of panels) {
      if (!panel.contains(event.target)) closePanel(panel);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !desktop.matches)
      return;
    const openPanel = panels.find((panel) => panel.open);
    if (!openPanel) return;
    event.preventDefault();
    closePanels();
    openPanel.querySelector<HTMLElement>(':scope > summary')?.focus();
  });

  desktop.addEventListener('change', () => closePanels());
}
