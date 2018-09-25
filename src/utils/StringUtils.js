/**
 * String tools and helpers
 */
const StringUtils = {

    /**
     * Return random string
     * @param string
     * @return string
     */
    random: (array) => {
        return array[Math.floor(Math.random()*array.length)]
    },

    /**
     * Add variables in current string
     * @param string
     * @param object
     */
    format: (string, variables, regex=/(\{[\w\s]+\})/) => {
        return string.replace(new RegExp(regex, 'g'), (x) => {
            return variables[x.slice(1, -1)];
        });
    }
};

export default StringUtils;
