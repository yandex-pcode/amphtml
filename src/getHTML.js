const excludedTags = ['amp-analytics', 'amp-experiment', 'amp-bind-state'];

/**
 * Returns
 * @param {HTMLElement} root
 * @param {String[]} attrs
 * @param {Function} callback
 */
export function getHTML (root, attrs, callback) {
    let result = [];

    appendToResult(root, attrs, result);

    callback(result.join('').replace(/\s{2,}/g, ' '));
}


/**
 *
 * @param {HTMLElement} node
 * @param {String[]} attrs
 * @param {String[]} result
 */
function appendToResult (node, attrs, result) {
    if (node.nodeType === Node.TEXT_NODE) {
        result.push(node.textContent);
        return;
    }

    if (node && excludedTags.indexOf(node.tagName) === -1 && node.innerText) {
        appendOpenTag(node, attrs, result);

        let childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
           appendToResult(childNodes[i], attrs, result);
        }

        result.push('</' + node.tagName.toLowerCase() + '>');
    }
}


/**
 *
 * @param {HTMLElement} node
 * @param {String[]} attrs
 * @param {String[]} result
 */
function appendOpenTag (node, attrs, result) {
    result.push('<' + node.tagName.toLowerCase());

    attrs.forEach(function (attr) {
        if (node.hasAttribute(attr)) {
            result.push(' ' + attr + '="' + node.getAttribute(attr) + '"');
        }
    });

    result.push('>');
}
