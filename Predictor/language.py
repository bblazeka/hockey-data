import nltk
from nltk.tree import Tree
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

def classify(text):
    text_type = "OTHER"
    if "in net" in text or "is starting" in text:
        text_type = "START"
    return text_type

def extract_entities(text):
    entities = []
    for sent in nltk.sent_tokenize(text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if type(chunk) == Tree:
                print(chunk.label())
                print(' '.join(c[0] for c in chunk.leaves()))
                if chunk.label() == "PERSON":
                    entities.append({
                        "type": chunk.label(), 
                        "text": ' '.join(c[0] for c in chunk.leaves())
                    })
    # can be person, organization or gpe = Geopolitical entity
    return entities

def process_text(text):
    names = []
    words = classify(text)
    print(words)
    if words == "START":
        print(text)
    names = extract_entities(text)
    return words, names