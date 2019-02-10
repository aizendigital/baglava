
'use strict';
const pino = require('koa-pino-logger')();


class Page{
    static async findBySlug(slug){
        const [pages] = await global.db.query('SELECT * FROM page as p WHERE p.slug = :slug', { slug });
        const page = pages[0];
        return page;
    }
}


module.exports = Page;
