
'use strict';

const mongoose = require('mongoose');
const assert = require('assert');
const sinon = require('sinon');
const PageController = require('../page.js');

require('../../../../domain/page/page.js');

describe('Page controller methods', () => {
    /*
    let Page = mongoose.model('Page');
    let mongooseMock = sinon.mock(mongoose);
    let pageMock = sinon.mock(Page);

    it('#getPage', (done) => {
        let page = {'title': 'TITLE', 'slug': 'SLUG', 'body': 'BODY'};

        pageMock
            .expects('findBySlug').withArgs('SLUG')
            .resolves(page);

        mongooseMock
            .expects('model').withArgs('Page').returns(pageMock);

        let pageController = new PageController(mongooseMock);
        let ctx;
        pageController.findBySlug(ctx, next);
        mongooseMock.verify();
        mongooseMock.restore();
        assert.equal(ctx.body, page);
        done();
    });
    */
});
