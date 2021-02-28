document.getElementById("create-categories")
    .addEventListener('click', generateCategories)

function clear_selected() {
    let to_delete = []
    document.getElementById("selected_div").childNodes.forEach(node => {
        if (node.classList != null && node.classList.contains("select")) {
            to_delete.push(node)
        }
    })
    to_delete.forEach(e => e.remove())
}

function generateCategories() {
    clear_selected();

    let cats = [];
    metas.forEach(meta => {
        const num = parseInt(document.getElementById(meta).value)
        const list = cat_dict[meta]

        let a = sample(list, num)
        if (a) {cats  = cats.concat(a)}
    })

    let cats_list = document.getElementById("cats")
    cats_list.innerHTML = ''
    cats_list.style.display = "flex"

    cats.forEach(function (cat, index) {
        const new_cat = document.createElement('div')
        const new_number = document.createElement('button')
        const new_text = document.createElement('button')

        new_cat.className = "cat-button"
        new_cat.addEventListener('click', function() {
            // doesn't work
            if (new_cat.classList.contains("checked")){
                new_cat.classList.remove("checked");
                remove_from_selected(index + 1)
            } else {
                new_cat.classList.add("checked");
                add_to_selected(index + 1)
            }
        })

        new_number.className = "cat-button number"
        new_number.textContent = String(index + 1)

        new_text.className = "cat-button text"
        new_text.textContent = cat

        cats_list.appendChild(new_cat);
        new_cat.appendChild(new_number)
        new_number.after(new_text)
    })
}

function sample(list, n) {
    let result = new Array(n),
        len = list.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = list[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function remove_from_selected(val) {
    document.getElementById("selected_div").childNodes.forEach(node => {
        if (node.textContent === String(val)) {
            node.remove()
        }
    })
}

function add_to_selected(val) {
    const new_button = document.createElement("button")
    new_button.textContent = String(val)
    new_button.classList.add("select")
    document.getElementById("selected_div").appendChild(new_button)
}

const metas = ["wordy", "oddball", "fiendish", "related"]

const wordyCats = [
    "Begins with a vowel",
    "Homophone",
    "Probably has no full rhymes",
    "7 letters",
    "More vowels than consonants",
    "Ends with the same letter it starts with",
    "Is still a word with first letter removed",
    "Is still a word with last letter removed",
    "4 or more syllables",
    "Starts with the next letter someone says",
    "Alternates between consonants and vowels",
    "Contains 3 or more of the same letter",
    "Tough to spell",
    "Contains an animal",
    "Is both a noun and a verb (spelled the same)",
    "Rhymes with a fruit or vegetable",
    "Can be divided into two different words",
    "Is 6 or more letters, every letter is different",
    "Contains J, Q, X or Z",
    "Anagram",
    "Has multiple pronunciations"
]

const oddballCats = [
    "Too heavy to hold in one hand",
    "Owned by everybody here",
    "Often stolen",
    "Holds Liquid",
    "Found on OS maps",
    "Uses electricity",
    "Bigger than an elephant",
    "Designed to contain other things",
    "Could be identified from its silhouette",
    "Makes a loud noise",
    "Easy to throw far",
    "Something you cut",
    "Long and thin",
    "Emits light",
    "Can be opened",
    "Existed before humans",
    "In the room of at least one player",
    "Weapon",
    "Might be purchased for a hobby",
    "Flat",
    "Fragile",
    "Symbollic",
    "Expensive",
    "Bright",
    "Sharp",
    "Fictional",
    "Round, cylindrical or Spherical",
    "Seasonal",
    "Something you hang",
    "something that melts",
    "Could be in a child's A-Z book" ,
    "Usually made from just one material"
]

const fiendishCats = [
    "Likely subject of a painting",
    "Appears in a famous film title",
    "Couldn't be carried in one hand but 4 people could ",
    "Appears in a common idiom",
    "Insult",
    "Has human body part but not alive e.g. coin",
    "Falls slowly",
    "Often used or seen at night time",
    "Has a distinctive smell",
    "Uncommon to see just one",
    "Not seen by any player in the last year",
    "Sparks terror",
    "Traditionally more associated with one gender",
    "Can be recognisably drawn in 3 seconds",
    "Found in water",
    "Has holes in it",
    "Transparent or Translucent",
    "Floats",
    "In a 2-word phrase with a colour"
]

const relatedCats = [
    "Related to Harry Potter",
    "Related to Plants",
    "Related to Christmas",
    "Relted to religion",
    "Related to Shakespeare",
    "Related to royalty",
    "Related to time",
    "Related to animals",
    "Related to hair",
    "Related to the Olympics",
    "Related to cookery",
    "Related to transport",
    "Related to weddings",
    "Related to disease",
    "Related to luck or superstition"
]

cat_dict = {
    "wordy": wordyCats,
    "oddball": oddballCats,
    "fiendish": fiendishCats,
    "related": relatedCats
}