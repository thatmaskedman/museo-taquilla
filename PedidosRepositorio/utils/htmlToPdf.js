const { ReadStream, createWriteStream } = require('fs');
const { create, CreateOptions } = require('html-pdf');

/**
 * @returns {Promise<void>}
 */
const convert = async (template, vars, to) => {
    const replacedHTML = getReplaced(template, vars);
    
    await read(replacedHTML).then(s => write(s, to)).catch(err => {
        console.log(err)

        throw err
    })
}

/**
 * @returns {Promise<ReadStream>}
 */
const read = (html) => {

    return new Promise((resolve, reject) => {

        create(html, { format: 'Letter' }).toStream((err, s) => {
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