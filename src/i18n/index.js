import I18n from 'react-native-i18n'
import fr from './locales/fr'
import en from './locales/en'

I18n.fallbacks = true

I18n.translations = {
	en,
	fr
}
// I18n.locale = 'spanish';

export default I18n
