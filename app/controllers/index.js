import Ember from 'ember';

export default Ember.Controller.extend({
    buttonI18nKey: Ember.computed('i18n.locale', function () {
        const locale = this.get('i18n.locale');
        return `showIn.${(locale === 'en' ? 'fr' : 'en')}`;
    }),
    i18nLoader: Ember.inject.service('i18n-loader'),
    actions: {
        toggleLocale() {
            this.set('i18n.locale', (this.get('i18n.locale') === 'en' ? 'fr' : 'en'));
            this.transitionToRoute('index', { queryParams: { reload: Date.now() } });
        }
    }
});
