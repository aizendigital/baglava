
'use strict';
const pino = require('koa-pino-logger')();


class Page{
    static async findBySlug(slug){
        const [pages] = await global.db.query('Select * From page as p Where p.slug = :slug', { slug });
        const page = pages[0];
        return page;
    }
}


module.exports = Page;
