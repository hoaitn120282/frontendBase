import _ from 'lodash';
import pluralize from 'pluralize';

export const getTranslate = (language = {}, { text, lang = '', pluralize: isPluralize = false }) => {
    const { data: languages = {}, locale = '' } = language;
    text = _.camelCase(text);
    if (isPluralize) {
        text = pluralize(_.camelCase(text), true);
    }

    const langData = languages[lang] || languages[locale] || {};
    return _.get(langData, text, _.capitalize(_.lowerCase(_.deburr(text))));
};

export const translate = (language = {}) => {
    return (text, lang = '') => {
        return getTranslate(language, { text, lang });
    };
};
