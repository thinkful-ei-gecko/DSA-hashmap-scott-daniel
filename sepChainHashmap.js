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
    let spot = this.hashTable[index];


    if (!spot) {
      this.length++;
      this.hashTable[index] = {
        key,
        value: val,
        next: null,
        deleted: false,
      };
      return;
    }
    while (spot.next) {
      spot = spot.next;
    }
    spot.value = val;
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
    let slot = this.hashTable[index];

    if (!slot) {
      return index;
    }

    if (key === slot.key) {
      return index;
    }
    while (slot.next !== null) {
      slot = slot.next;
    }
    slot.next = {
      key: key,
      value: null,
      next: null,
      deleted: false,
    }
    return index;
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