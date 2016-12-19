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
 * @param {HTMLElement} node
 * @param {String[]} attrs
 * @param {String[]} result
 */
function appendToResult (node, attrs, result) {
    let stack = [];

    if (!node) {
        return result;
    }

    stack.push(node);

    while (stack.length > 0) {
        node = stack.pop();

        if (typeof node === 'string') {
            result.push(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
            result.push(node.textContent);
        } else if (node && excludedTags.indexOf(node.tagName) === -1 && node.innerText) {
            appendOpenTag(node, attrs, result);
            stack.push(`</${node.tagName.toLowerCase()}>`);

            if (node.childNodes && node.childNodes.length > 0) {
                for (let i = node.childNodes.length - 1; i >= 0; i--) {
                    stack.push(node.childNodes[i]);
                }
            }
        }
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
            result.push(` ${attr}="${node.getAttribute(attr)}"`);
        }
    });

    result.push('>');
}
