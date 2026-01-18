import { getCurrentLocale, IWording, Locale } from './types';
import { WORDING_EN } from './locales/en';
import { WORDING_ZH } from './locales/zh';

/**
 * Locale-specific WORDING translations
 */
const WORDING_MAP: Record<Locale, IWording> = {
	en: WORDING_EN,
	zh: WORDING_ZH,
};

/**
 * Get WORDING for the current locale
 * Falls back to Chinese if locale is not found
 */
export function getWording(): IWording {
	const locale = getCurrentLocale();
	return WORDING_MAP[locale] || WORDING_ZH;
}

/**
 * Current locale WORDING - exported for direct use
 * Note: This is evaluated at module load time
 */
export const WORDING = getWording();

// Re-export types for convenience
export { getCurrentLocale, IWording, Locale } from './types';
export { WORDING_EN } from './locales/en';
export { WORDING_ZH } from './locales/zh';
