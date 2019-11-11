const LinkedList = require('./LinkedList');

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.hashTable = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  get(key) {
    const hash = HashMap.hashString(key);
    const index = hash % this.capacity;
    const slot = this.hashTable[index];

    if (slot === undefined) {
      throw new Error('Key error');
    }
    if (slot.head === undefined) {
      return slot.value;
    }
    return slot;
  }

  set(key, val) {
    const loadRatio = (this.length + this.deleted + 1) / this.capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this.resize(this.capacity * HashMap.SIZE_RATIO);
    }
    const index = this.findSlot(key);
    if (!this.hashTable[index] || this.hashTable[index].next === null) {
      this.length++;
      this.hashTable[index] = {
        key,
        value: val,
        next: null,
        deleted: false,
      };
      return;
    }
    if (this.hashTable[index].next) {
      console.log(this.hashTable[index].value)
      this.hashTable[index].next.value = val;
    }

    //   if (spot.overwrite) {
    //     this.hashTable[index] = {
    //       key,
    //       value,
    //       deleted: false
    //     })
    // else {
    //   this.hashTable[index] = {
    //     key,
    //     value,
    //     next: null,
    //     deleted: false,
    //   };
    // }
  }

  delete(key) {
    const index = this.findSlot(key);
    const slot = this.hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this.deleted++;
  }

  findSlot(key) {
    const hash = HashMap.hashString(key);
    const index = hash % this.capacity;
    const slot = this.hashTable[index];

    // const indexObj = {
    //   index: index,
    //   // overwrite: false,
    // }

    if (!slot) {
      return index;
    }

    if (key === slot.key) {
      return index;
    }
    slot.next = {
      key: key,
      value: null,
    }
    return index;


    // if (slot !== undefined && slot.head === undefined) {
    //   let linkedList = new LinkedList();
    //   linkedList.insertFirst(slot);
    //   this.hashTable[index] = linkedList;
    //   indexObj.isLL = true;
    // } else if (slot !== undefined && slot.head !== undefined) {
    //   indexObj.isLL = true;
    // }

    // return indexObj
  }

  resize(size) {
    const oldSlots = this.hashTable;
    this.capacity = size;
    this.length = 0;
    this.deleted = 0;
    this.hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap;