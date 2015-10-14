

function Trie(seed, valid){
  this.root = new Node();
  root.letter = seed;
  root.valid = valid;
  root.letters = createArray();
}

function Node(){
  this.letter;
  this.letters = createArray();
  this.valid = false;
}

Trie.prototype.add = function(word) {
    console.log("\nAdding the word '" + word + "'");
    // protect from root damage
    var current = root;
    var match = (word[0] === current.letter);

    // checks if word even bleongs in this Trie
    if(!match) {
      return false;
    }
    console.log("Skipping the node for   " + word[0]);
    while(word.length>1){
      //console.log(word);
      // remove first letter from word (it already belongs)
      word = word.slice(1,word.length);
      // position of new fisrt letter
      var position = word[0].charCodeAt(0) - 97;
      // if position is empty, create a new node and dive in
      if(current.letters[position] === 0){
        //console.log("New node created for: " + word[0])
        // instantiate a temp variable
        console.log("Creating a new node for " + word[0]);
        var next = new Node();
        // set the new node's letter to the root's current letter
        next.letter = word[0];
        // add temp to the letters array in root
        current.letters[position] = next;
        // go 'down' the tree one level
        current = current.letters[position];
      // else position is filled, shift and dive in
      } else {
        console.log("Skipping the node for   " + word[0]);
        // // shift
        // word = word.slice(1,word.length);
        // // re-establish new position
        // var position = word[0].charCodeAt(0) - 97;
        // // dive down one level
        current = current.letters[position];
      }
    }
    return current.valid=true;
};

Trie.prototype.exists = function(word) {
    // TODO: returns whether or not the word exists within the Trie
    return false;
};

/* New recursive structure: helper and recursive methods */
Trie.prototype.printPrettyTrie = function() {
    // protects the root from being smashed down to a leaf
    var current = root;
    console.log("\nRoot: ")
    console.log(current.letter + " " + (current.valid ? 'valid' : ''));
    print(current, '  ');
};

Trie.prototype.printTrieList = function(word) {
    var wordList = [];
    // TODO: prints all of the words contained within the Trie
    console.log("Total List Length: " + wordList.length)
};

/******************************|
|       Helper Functions       |
|******************************/
function createArray(){
  return Array.apply(null, Array(26))
    .map(Number.prototype.valueOf,0);
}

function print(current, space) {
    current.letters.forEach(function(element){
    if(element !== 0){
      console.log(space + element.letter + " " + (element.valid ? 'valid' : ''));

      print(element, space + '  ');
    }
  });
}

/******************************|
|         Driver Code          |
|******************************/
var trie = new Trie('a', true);

var wordList = ['a', 'ace', 'aces', 'aced', 'acre', 'acres', 'act', 'acted', 'acting', 'acts'];
wordList.forEach(function(word) {
  trie.add(word);
})

// checks for existence of words previously added (all should be true)
// var first = trie.exists('ace');
// var second = trie.exists('acre');
// var third = trie.exists('acted');
//
// prints out tree structure
trie.printPrettyTrie();

// // prints out full list of words
// trie.printTrieList();
