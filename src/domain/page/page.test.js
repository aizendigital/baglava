
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Page = require('../page/page');


describe('Page model methods', () => {
    let PageMock = sinon.mock(Page);

    it('#findBySlug', (done) => {
        // PageMock
        //     .expects('findOne').withArgs({ slug: 'SLUG' })
        //     .resolves('RESULT');

        // Page.findBySlug('SLUG').then(function(result) {
        //     PageMock.verify();
        //     PageMock.restore();
        //     assert.equal(result, 'RESULT');
        //     done();
        // });
        done();
    });
});

