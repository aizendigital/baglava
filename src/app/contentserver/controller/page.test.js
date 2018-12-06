
'use strict';

const mongoose = require('mongoose');
const assert = require('assert');
const sinon = require('sinon');
const PageController = require('./page.js');

require('../../../domain/page/page.js');

describe('Page controller methods', () => {
    /*
    var Page = mongoose.model('Page');
    var mongooseMock = sinon.mock(mongoose);
    var pageMock = sinon.mock(Page);

    it('#getPage', (done) => {
        var page = {'title': 'TITLE', 'slug': 'SLUG', 'body': 'BODY'};

        pageMock
            .expects('findBySlug').withArgs('SLUG')
            .resolves(page);

        mongooseMock
            .expects('model').withArgs('Page').returns(pageMock);

        var pageController = new PageController(mongooseMock);
        var ctx;
        pageController.findBySlug(ctx, next);
        mongooseMock.verify();
        mongooseMock.restore();
        assert.equal(ctx.body, page);
        done();
    });
    */
});
