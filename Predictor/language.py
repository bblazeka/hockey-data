import nltk
from nltk.tree import Tree
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

def recognize_words(text):
    text = nltk.word_tokenize(text)
    text = nltk.pos_tag(text)
    return text

def extract_entities(text):
    entities = []
    for sent in nltk.sent_tokenize(text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if type(chunk) == Tree:
                print(chunk.label())
                print(' '.join(c[0] for c in chunk.leaves()))
                entities.append({
                    "type":chunk.label(), 
                    "text": ' '.join(c[0] for c in chunk.leaves())
                })
    # can be person, organization or gpe = Geopolitical entity
    return entities

def process_text(text):
    names = []
    words = recognize_words(text)
    #for word in words:
    #    if word[1] == 'NNP':
    #        names.append(word[0])
    names = extract_entities(text)
    return words, names