'use strict';

require('../../../domain/page/page');

function PageController(mongoose) {

    let pageModel = mongoose.model('Page');

    /**
     * Path: /api/v1/page
     * Method: Get
     */

    this.getPage = async function (ctx, next) {
        let slug = ctx.params.slug;
        let page = await pageModel.findBySlug(slug).catch(err => {
            ctx.throw(404);
        });

        if (!page) {
            ctx.throw(404);
        }
        ctx.body = { data: page, error: null };

    };

}

module.exports = PageController;
