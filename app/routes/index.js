import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        reload: {
            refreshModel: true
        }
    },
    i18nLoader: Ember.inject.service('i18n-loader'),
    beforeModel() {
        const fingerprintHash = Ember.isBlank(window.DEMO_ASSET_FINGERPRINT_HASH) ? '' : `-${window.DEMO_ASSET_FINGERPRINT_HASH}`;
        return this.get('i18nLoader')
            .load({
                url: `/locales/${this.get('i18n').locale}/translations${fingerprintHash}.json`
            });
    }
});
