module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/css/"); 
    eleventyConfig.addPassthroughCopy("src/assets/img/"); 
    eleventyConfig.addPassthroughCopy("src/admin"); 
    
    return {
        dir: {
            input: "src",
            includes: "includes",
            output: "public"
        }
    };
};