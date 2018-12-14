
'use strict';

const pageModel = require('../../../domain/page/page');


class PageController {


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
    async getPage(ctx, next) {

        let slug = ctx.params.slug;

        try {
            let page = await this.pageModel.findBySlug(slug);

            if (!page) {
                ctx.throw(404);
            }
            ctx.body = page;
            next();
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.log.error(err);
            ctx.throw(500);
        }
    };

    constructor() {
        this.pageModel = pageModel;
        this.getPage = this.getPage.bind(this);
    }


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

}

module.exports = PageController;
