class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.hashTable = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  get(key) {
    const index = this.findSlot(key);
    if (this.hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this.hashTable[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this.deleted + 1) / this.capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this.resize(this.capacity * HashMap.SIZE_RATIO);
    }
    const index = this.findSlot(key);
    if (!this.hashTable[index]) {
      this.length++;
    }
    this.hashTable[index] = {
      key,
      value,
      deleted: false
    };
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
    const start = hash % this.capacity;

    for (let i = start; i < start + this.capacity; i++) {
      const index = i % this.capacity;
      const slot = this.hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
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