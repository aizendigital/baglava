module.exports.generateModelSlug = async function (title, model, rand) {
    let slug = slugify(title);
    if (!slug) slug = Math.random().toString(36).substring(7);//TODO add persian support later
    if (rand) slug = slug + '-' + rand;
    if (!await model.findOne({ slug: slug })) {
        return slug;
    } else {
        return generateModelSlug(title, model, Math.random().toString(36).substring(7));
    }
}