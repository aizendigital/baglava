'use strict';

require('../../../domain/page/page');
const pageModel = require('../../../domain/page/page');



class PageController{
    
    /**
     * Path: /api/v1/page
     * Method: Get
     */

    async getPage (ctx, next) {
        let page = await pageModel.findBySlug(ctx.params.slug).catch(err => {
            ctx.throw(404);
        });

        if (!page) {
            ctx.throw(404);
        }
        ctx.body = { data: page, error: null };

    };

}


module.exports = PageController;
