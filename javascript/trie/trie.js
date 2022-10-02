class Node {
    constructor(key) {
        this.key = key;
        this.parent = null;
        this.children = {};
        this.end = false;
    }

    getWord() {
        const word = [];
        let node = this;

        while (node != null) {
            word.unshift(node.key);
            node = node.parent;
        }

        return word.join('');
    }
}

class Trie {
    constructor() {
        this.root = new Node(null);
    }

    /**
     * Given a word, insert the word into the Trie.
     * @param {String} word - word being inserted into the trie
     */
    insert(word) {
        let node = this.root;

        // for each character in the word
        for(let i = 0; i < word.length; i++) {
            let char = word[i];

            // if the character node doesn't exist, create it
            if(!node.children[char]) {
                node.children[char] = new Node(char);
                node.children[char].parent = node;
            }

            // proceed to the next depth
            node = node.children[char];

            // mark the node as corresponding to the end of a word
            if(i == word.length - 1) {
                node.end = true;
            }
        }
    }

    /**
     * Given a word, determines if the word exists in the trie.
     * @param {String} word
     * @returns Boolean
     */
    contains(word) {
        let node = this.root;

        // for each character in the word
        for(let i = 0; i < word.length; i++) {
            let char = word[i];
            if(node.children[char]) {
                // go to the next depth
                node = node.children[char];
            } else {
                // no child matching that character exists
                return false;
            }
        }

        // at the end of the word, check if the node corresponds to the
        // end of a word and return that value
        return node.end;
    }

    /**
     * Given a prefix, returns a list of words starting with the prefix
     * @param {String} prefix 
     * @returns Array of words starting with the prefix 
     */
    findPrefix(prefix) {
        let node = this.root;
        let wordsStartingWithPrefix = [];

        // for each character in the word
        for(let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if(node.children[char]) {
                // verify that the prefix exists in the trie
                node = node.children[char];
            } else {
                return wordsStartingWithPrefix;
            }
        }

        // we've verified that the prefix exists, now return
        // all words that start with the prefix
        this.#findAllWords(node, wordsStartingWithPrefix);
        return wordsStartingWithPrefix;
    }

    delete(word) {
        if(!word) return;
        let node = this.root;

        // for each character in the word
        for(let i = 0; i < word.length; i++) {
            let char = word[i];
            if(node.children[char]) {
                // verify that the word exists in the trie
                node = node.children[char];
            } else {
                return false;
            }
        }

        if(node.end && node.getWord() === word) {
            const hasChildren = Object.keys(node.children).length > 0;
            if(hasChildren) {
                node.end = false;
            } else {
                delete node.parent.children[node.key];
            }

            return true;
        }

        return false;
    }

    /**
     * Given a node and an array, populate the array with all words
     * associated with the node and its children
     * @param {Node} node Trie Node 
     * @param {Array} arr Passed by reference array for storing words
     */
    #findAllWords(node, arr) {
        if(node.end) {
            arr.unshift(node.getWord());
        }

        for(let key in node.children) {
            this.#findAllWords(node.children[key], arr);
        }
    }
}

module.exports = {
    Trie
}