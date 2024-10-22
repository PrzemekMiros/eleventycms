module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/css/main.css"); 
    
    return {
        dir: {
            input: "src",
            includes: "includes",
            output: "public"
        }
    };
};