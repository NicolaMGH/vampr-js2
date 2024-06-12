class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberAway = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberAway++
    }
    return numberAway;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get ancestors () {
    let ancestors = [this];
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      ancestors.push(currentVampire);
    }
    return ancestors;
  }

  closestCommonAncestor(vampire) {
    for (let ancestor of this.ancestors) {
      if (vampire.ancestors.includes(ancestor)) {
        return ancestor;
      }
    }
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    }

    for (const vamp of this.offspring) {
      let findVamp = vamp.vampireWithName(name);
      if (findVamp) {
        return findVamp;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vampCount = 0;
    for (const vamp of this.offspring) {
      vampCount++
      vampCount += vamp.totalDescendents
    }
    return vampCount;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millVampArray = [];
    if (this.yearConverted > 1980) {
      millVampArray.push(this);
    }
    for (const vamp of this.offspring) {
      const vamps = vamp.allMillennialVampires;
      millVampArray = millVampArray.concat(vamps);
    }
    return millVampArray;
  }
}

module.exports = Vampire;

