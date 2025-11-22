# Hebrew → Transliteration Pronunciation Guide

This project converts fully-pointed Hebrew (consonants, vowels, cantillation, punctuation) into a **maximally historical**, **phonologically explicit** Latin-based transliteration.
It does **not** follow Modern Israeli Hebrew.
Instead, it attempts to approximate **Tiberian** and **earlier Semitic** pronunciation.

Below is the pronunciation key.

---

## **Consonants**

| Hebrew | Transliteration | IPA       | Notes                                                                                   |
| ------ | --------------- | --------- | --------------------------------------------------------------------------------------- |
| א      | **ʾ**           | ʔ         | Glottal stop. Preserved everywhere.                                                     |
| ב / בּ | **v / b**       | v, b      | Soft = v; Dagesh = b.                                                                   |
| ג / גּ | **ɣ / g**       | ɣ, g      | Soft = voiced fricative; Dagesh = stop.                                                 |
| ד / דּ | **ð / d**       | ð, d      | Soft = eth; Dagesh = d.                                                                 |
| ה      | **h**           | h         | Breath consonant.                                                                       |
| ו      | **w**           | w         | Always /w/, never /v/. Mater lectionis resolved in post-processing.                     |
| ז      | **z**           | z         | —                                                                                       |
| ח      | **χ**           | χ         | Voiceless uvular fricative (stronger than German *ch*).                                 |
| ט      | **ʈ**           | ʈˤ        | Emphatic /ṭ/ (retroflex or pharyngealized).                                             |
| י      | **j**           | j         | Consonantal *yod*. May be absorbed into long vowels (e.g., **ij → ī**).                 |
| כ / כּ | **x / k**       | x, k      | Soft = velar fricative; Dagesh = k.                                                     |
| ל      | **l**           | l         | —                                                                                       |
| מ      | **m**           | m         | —                                                                                       |
| נ      | **n**           | n         | —                                                                                       |
| ס      | **s**           | s         | Samekh, plain /s/.                                                                      |
| ע      | **ƹ**           | ʕ         | Voiced pharyngeal (similar to Arabic ʿayn).                                             |
| פ / פּ | **f / p**       | f, p      | Soft = f; Dagesh = p.                                                                   |
| צ      | **c**           | sˤ or tsʼ | Emphatic /ṣ/ (alveolar or affricated).                                                  |
| ק      | **q**           | q         | Uvular stop.                                                                            |
| ר      | **r**           | r or rˤ   | Alveolar trill or pharyngealized trill (Tiberian).                                      |
| שׁ     | **ʃ**           | ʃ         | Shin.                                                                                   |
| שׂ     | **ɬ**           | ɬ         | Sin, reconstructed as a voiceless lateral fricative (like Welsh *ll* or Nahuatl *tl̥*). |
| ת / תּ | **þ / t**       | θ, t      | Soft tav = /θ/; Dagesh = /t/.                                                           |

---

## **Vowels**

| Hebrew | Transliteration           | IPA    | Notes                                                    |
| ------ | ------------------------- | ------ | -------------------------------------------------------- |
| בְּ    | **ə**                     | ə      | **Sheva** (vocal). Silent sheva handled algorithmically. |
| ֱ      | **ĕ**                     | ĕ      | Hatef-segol.                                             |
| ֲ      | **ă**                     | ă      | Hatef-patah.                                             |
| ֳ      | **ŏ**                     | ŏ      | Hatef-qamats.                                            |
| ִ      | **i**                     | i      | Hiriq.                                                   |
| ֵ      | **ē**                     | eː     | Tsere, long.                                             |
| ֶ      | **e**                     | e      | Segol, short.                                            |
| ַ      | **a**                     | a      | Patah.                                                   |
| ָ      | **ā**                     | aː     | Qamats.                                                  |
| ֹ      | **ō**                     | oː     | Holam.                                                   |
| ֻ      | **u**                     | u      | Qubuts.                                                  |
| ּ      | *(handled in consonants)* | —      | Dagesh produces stop values.                             |
| ׇ      | **å**                     | ɔ or o | Qamats qatan.                                            |

---

## **Diphthongs & Merged Vowels**

Some vowel + consonant combinations collapse to historical long vowels:

| Sequence     | Output | IPA | Example                           |
| ------------ | ------ | --- | --------------------------------- |
| **ij**       | **ī**  | iː  | אִישׁ → īʃ                        |
| **íj**       | **ī́** | íː | Accented variant.                 |
| **wō**       | **ō**  | oː  | Contraction of mater-waw.         |
| **ww**       | **ū**  | uː  | Double waw → historical long *u*. |
| Final **jw** | **w**  | w   | Mater + glide simplified.         |

These rules are applied *after* grapheme concatenation.

---

## **Schwa Elision (ə)**

The engine removes or vocalizes sheva according to simplified Tiberian patterns:

* CəC → CʼC when elided
* VCəC with permissible onsets → VʼC
* Cə# → Cʼ (before punctuation)

A literal apostrophe (ʼ) is used to mark underlying elision sites.

Example:

| Hebrew      | Raw       | Output       |
| ----------- | --------- | ------------ |
| בְּרֵאשִׁית | bərēʾʃijþ | **brēʾʃījþ** |

---

## **Divine Names**

Two traditional substitutions are applied:

| Hebrew  | Intermediate | Output      |
| ------- | ------------ | ----------- |
| יְהוָה  | jəhwāh       | **ʾăðōnāj** |
| יְהֹוִה | jəhwih       | **ʾĕlōhīm** |

These follow liturgical convention.

---

## **Punctuation**

| Hebrew | Output | Meaning                         |
| ------ | ------ | ------------------------------- |
| ׀      | **/**  | Paseq divider                   |
| ׃      | **:**  | End of verse                    |
| ־      | **-**  | Maqaf (hyphen)                  |
| ׆      | **⸮**  | Inverted nun (masoretic siglum) |
| ֮      | **.**  | Masora dot                      |

Cantillation marks are removed but can optionally be converted to combining accents.

---

## **Notes on Design Philosophy**

* The goal is **maximal historical transparency**, not modern Israeli pronunciation.
* Emphatics are preserved as *q, ʈ, c*.
* Gutturals (ʾ, h, χ, ƹ) remain distinct.
* Sin (שׂ) is restored as a **lateral fricative** (**ɬ**), consistent with comparative Semitic evidence.
* Matres lectionis (*waw*, *yod*) are resolved into long vowels only when appropriate.
* Schwa behavior approximates Tiberian patterns without attempting full prosodic reconstruction.
