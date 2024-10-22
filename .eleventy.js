module.exports = function(eleventyConfig) {
    // Konfiguracja
    eleventyConfig.addPassthroughCopy("src/assets/css/main.css"); // Kopiuj plik CSS do folderu output
    
    
    return {
        dir: {
            input: "src",
            includes: "includes",
            output: "public"
        }
    };
};