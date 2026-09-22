const STORAGE_KEY = "hyperliquid.layouts.4";

function patchLayout(layouts) {
  const patch = (breakpoint, id, values) => {
    const item = layouts[breakpoint]?.find((item) => item.i === id);

    if (!item) {
      console.warn(`[HL UI] ${id} not found in ${breakpoint} layout`);
      return;
    }

    Object.assign(item, values);
  };

  /*
   * LG — 16 columns
   *
   * | watchlist 2 | chart 8 | market 3 | trading 3 |
   */
  patch("lg", "favoriteCoins", {
    x: 0,
    y: 0,
    w: 2,
    h: 20.4,
    minW: 2,
    minH: 4,
  });

  patch("lg", "coinInfo", {
    x: 2,
    y: 0,
    w: 8,
    h: 2,
    minW: 7,
  });

  patch("lg", "chart", {
    x: 2,
    y: 2,
    w: 8,
    h: 18.4,
  });

  patch("lg", "marketData", {
    x: 10,
    y: 0,
    w: 3,
    h: 20.4,
  });

  patch("lg", "tradingInterface", {
    x: 13,
    y: 0,
    w: 3,
    h: 20.4,
  });

  patch("lg", "accountTable", {
    x: 0,
    y: 20.4,
    w: 13,
    h: 14,
  });

  patch("lg", "accountInfo", {
    x: 13,
    y: 20.4,
    w: 3,
    h: 14,
  });

  /*
   * MD — 14 columns
   *
   * | watchlist 3 | chart 7 | right side 4 |
   */
  patch("md", "favoriteCoins", {
    x: 0,
    y: 0,
    w: 3,
    h: 25.6,
    minW: 2,
    minH: 4,
  });

  patch("md", "coinInfo", {
    x: 3,
    y: 0,
    w: 7,
    h: 2,
    minW: 2,
  });

  patch("md", "chart", {
    x: 3,
    y: 2,
    w: 7,
    h: 23.6,
  });

  patch("md", "accountInfo", {
    x: 10,
    y: 41,
    w: 4,
    h: 10,
  });

  patch("md", "tradingInterface", {
    x: 10,
    y: 0,
    w: 4,
    h: 16,
    minH: 10,
  });

  patch("md", "marketData", {
    x: 10,
    y: 16,
    w: 4,
    h: 20,
    minH: 10,
  });

  patch("md", "accountTable", {
    x: 0,
    y: 20.6,
    w: 10,
    h: 12,
    minH: 10,
  });

  /*
   * Remove Hyperliquid's desktop restriction that originally capped
   * the favorites widget at ~2 grid rows.
   */
  const lgFavorites = layouts.lg?.find(
    (item) => item.i === "favoriteCoins"
  );

  const mdFavorites = layouts.md?.find(
    (item) => item.i === "favoriteCoins"
  );

  if (lgFavorites) {
    delete lgFavorites.maxH;
  }

  if (mdFavorites) {
    delete mdFavorites.maxH;
  }

  return layouts;
}

function applyLayoutPatch() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    console.warn(`[HL UI] ${STORAGE_KEY} not found`);
    return false;
  }

  try {
    const layouts = JSON.parse(raw);
    const patched = patchLayout(layouts);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(patched)
    );

    return true;
  } catch (error) {
    console.error("[HL UI] Failed to patch layout", error);
    return false;
  }
}

applyLayoutPatch();