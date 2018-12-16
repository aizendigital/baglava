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

        try {
            let page = await pageModel.findBySlug(slug);

            if (!page) {
                ctx.throw(404);
            }
            ctx.body = { data: page , error : null };
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.log.error(err);
            ctx.throw(500);
        }
    };

}

module.exports = PageController;
