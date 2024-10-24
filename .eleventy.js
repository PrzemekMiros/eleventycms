module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/css/"); 
    eleventyConfig.addPassthroughCopy("src/assets/img/"); 
    eleventyConfig.addPassthroughCopy("src/content/"); 

    // Collections blog
    eleventyConfig.addCollection('posts', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/posts/**/*.md').reverse();
    });
        
    
    return {
        dir: {
            input: "src",
            includes: "includes",
            output: "public",
            data: "content"
        }
    };
};