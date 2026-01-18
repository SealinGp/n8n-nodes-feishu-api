import { Locale, getCurrentLocale } from '../types';
import { IDescriptionNames } from './types';
import { DESCRIPTION_NAMES_EN } from './en';
import { DESCRIPTION_NAMES_ZH } from './zh';

/**
 * Locale-specific description name translations
 */
const DESCRIPTION_NAMES_MAP: Record<Locale, IDescriptionNames> = {
	en: DESCRIPTION_NAMES_EN,
	zh: DESCRIPTION_NAMES_ZH,
};

/**
 * Get description names for the current locale
 * Falls back to Chinese if locale is not found
 */
export function getDescriptionNames(): IDescriptionNames {
	const locale = getCurrentLocale();
	return DESCRIPTION_NAMES_MAP[locale] || DESCRIPTION_NAMES_ZH;
}

/**
 * Current locale description names - exported for direct use
 * Note: This is evaluated at module load time
 */
export const DESCRIPTION_NAMES = getDescriptionNames();

// Re-export types and locale files for convenience
export { IDescriptionNames } from './types';
export { DESCRIPTION_NAMES_EN } from './en';
export { DESCRIPTION_NAMES_ZH } from './zh';
