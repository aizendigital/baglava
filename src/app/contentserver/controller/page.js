
'use strict';

require('../../../domain/page/page.js');

/**
 * @swagger
 * resourcePath: /api/v1/page
 */

/**
 * @swagger
 * path: /{slug}
 * operations:
 *   - httpMethod: GET
 *     summary: By passing in an appropriate slug, it retrieves the corresponding static html to render
 *     nickname: getPage
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: page slug
 *         required: true
 *         type: string
 */
var getPage = function (pageModel) {
    return async function (ctx, next) {
        var slug = ctx.params.slug;
        
        try {
            var page = await pageModel.findBySlug(slug);

            if (!page) {
                ctx.throw(404);
            }
            ctx.body = page;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.log.error(err);
            ctx.throw(500);
        }
    };
};

function PageController(mongoose) {
    var pageModel = mongoose.model('Page');
    this.getPage = getPage(pageModel);
}

module.exports = PageController;

/**
 * @swagger
 * models:
 *   Page:
 *     id: Page
 *     properties:
 *       title:
 *         type: String
 *       slug:
 *         type: String
 *       body:
 *         type: String
 */
