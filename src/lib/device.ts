/** Device signals shared by the TV layout and the rendering tiers (see ./performance.ts). */
export interface DeviceSignals {
  userAgent: string;
  /** `navigator.deviceMemory`, in GiB. Chromium-only. */
  deviceMemory?: number;
  hardwareConcurrency?: number;
  /** `navigator.connection.saveData`. */
  saveData?: boolean;
  /** No pointing device at all — the only input is a D-pad remote. */
  hasNoPointer?: boolean;
}

const TV_USER_AGENT =
  /\bTV\b|SmartTV|GoogleTV|MiTV|HbbTV|NetCast|Web0S|webOS|Tizen|BRAVIA|CrKey|Chromecast|\bAFT[A-Z]|Roku|VIDAA/i;

export function readDeviceSignals(win: Window = window): DeviceSignals {
  const nav = win.navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  return {
    userAgent: nav.userAgent,
    deviceMemory: nav.deviceMemory,
    hardwareConcurrency: nav.hardwareConcurrency || undefined,
    saveData: nav.connection?.saveData,
    hasNoPointer: win.matchMedia("(any-pointer: none)").matches,
  };
}

/** A TV user agent, or a device whose only input is a D-pad remote. */
export function isTelevision({ userAgent, hasNoPointer }: DeviceSignals): boolean {
  return TV_USER_AGENT.test(userAgent) || hasNoPointer === true;
}

/**
 * Tags `<html data-device="tv">` so the stylesheet can keep content inside the TV title-safe
 * area — many sets overscan up to 5% of each edge.
 */
export function initDeviceType(win: Window = window): boolean {
  const television = isTelevision(readDeviceSignals(win));
  if (television) win.document.documentElement.dataset.device = "tv";
  return television;
}
