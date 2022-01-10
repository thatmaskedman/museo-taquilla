const { ReadStream, createWriteStream } = require('fs');
const { create, CreateOptions } = require('html-pdf');

/**
 * @returns {Promise<void>}
 */
const convert = async (template, vars, to, opts = undefined) => {
    const replacedHTML = getReplaced(template, vars);
    
    await read(replacedHTML, opts).then(s => write(s, to)).catch(err => {
        console.log(err)

        throw err
    })
}

/**
 * @param {string} HTML
 * @param {CreateOptions} opts
 * @returns {Promise<ReadStream>}
 */
const read = (html, opts = { format: 'Letter' }) => {

    return new Promise((resolve, reject) => {

        create(html, opts).toStream((err, s) => {
          if (err) reject(err)
    
          else resolve(s)
        });

    });
}

/**
 * 
 * @param {ReadStream} stream 
 * @param {import('fs').PathLike} to 
 */
const write = async (stream, to) => {
    const dest = createWriteStream(to);

    stream.pipe(dest)
}

const getReplaced = (template, vars) => {
    let result = template;

    for (const [name, value] of Object.entries(vars)) {
      result = result.replace(getReplaceRegexp(name), value);
    }

    return result;
}

const getReplaceRegexp = (name) => new RegExp(`{{\\s*${name}\\s*}}`, 'g');

module.exports = {
    convert
}