const {Trie} = require('./trie');

const trie = new Trie();

// insert few values
trie.insert("peter");
trie.insert("piper");
trie.insert("picked");
trie.insert("pickled");
trie.insert("pepper");
trie.insert("peppez");

// check contains method
try{
    console.assert(trie.contains("picked"), true);  
    console.log(`success`);
} catch (err) {
    console.log(`failure: ${err}`);
}

try{
    console.assert(trie.contains("pepper"), true); 
    console.log(`success`);
} catch (err) {
    console.log(`failure: ${err}`);
}

trie.delete("pepper");
trie.delete("peppe");

// check findPrefix method
try {
    console.assert(trie.findPrefix("pi"), ['pickled', 'picked', 'piper']);
    console.log(`success`);
} catch (err) {
    console.log(`failure: ${err}`);
}

try {
    console.assert(trie.findPrefix("pe"), ['peppez', 'peter']);
    console.log(`success`);
} catch (err) {
    console.log(`failure: ${err}`);
} 