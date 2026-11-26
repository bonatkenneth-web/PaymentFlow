'use strict';

const { withStellarRetry } = require('../../utils/withStellarRetry');

class StellarWalletProvider {
  name = 'stellar_wallet';
  capabilities = Object.freeze(['signed_transaction', 'status_query', 'reconciliation']);

  submitPayment(transaction, retryOptions) {
    const { server } = require('../../config/stellarConfig');
    return withStellarRetry(() => server.submitTransaction(transaction), {
      ...retryOptions,
      label: 'submitTransaction',
    });
  }

  queryStatus(...args) {
    return require('../stellarService').verifyTransaction(...args);
  }

  reconcile(school) {
    return require('../stellarService').syncPaymentsForSchool(school);
  }
}

module.exports = StellarWalletProvider;
