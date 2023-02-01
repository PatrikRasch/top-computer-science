class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this.head;
    }
    if (this.head) {
      let tail = this.head;
      while (tail.nextNode !== null) tail = tail.nextNode;
      tail.nextNode = new Node(value);
    }
  }

  prepend(value) {
    if (!this.head) {
      this.head = new Node(value, null);
      return this.head;
    } else {
      let temp = new Node(value);
      temp.nextNode = this.head;
      this.head = temp;
    }
    return this.head;
  }

  size() {
    let counter = 0;
    if (!this.head) {
      return counter;
      // return console.log("The length of the list is", counter);
    } else {
      counter = 1;
      let temp = this.head;
      while (temp.nextNode !== null) {
        temp = temp.nextNode;
        counter++;
      }
      // console.log("The length of the list is", counter);
      return counter;
    }
  }

  front() {
    if (!this.head) return console.log("There is no head as the list is empty");
    console.log("The head of the list is:", this.head);
    return this.head;
  }

  back() {
    if (!this.head) {
      console.log("There is no tail as there are no nodes in the list");
      return;
    } else {
      let temp = this.head;
      while (temp.nextNode !== null) {
        temp = temp.nextNode;
        if (temp.nextNode === null) {
          console.log("The tail of the list is:", temp);
          return temp;
        }
      }
    }
  }

  at(index) {
    // Only do index number of loops forward into the list, return clg message
    // If that index number node doesn't exist, return clg message

    if (index > list.size()) {
      return console.log("There is no node at this index as the list is only", list.size(), "nodes long");
    }
    let numOfSteps = 0;
    let temp = this.head;
    while (index > numOfSteps && temp !== null) {
      numOfSteps++;
      temp = temp.nextNode;
    }
    if (!temp) {
      console.log("There is no node at this index as the list is only", list.size(), "nodes long");
    } else {
      console.log("The node found at index", index, "is", temp);
    }
    return temp;
  }

  pop() {
    let temp = this.head;
    let counter = 2;
    // let backTemp = this.head;
    while (counter < list.size()) {
      counter++;
      temp = temp.nextNode;
    }
    temp.nextNode = null;
  }

  contains(value) {
    let temp = this.head;
    while (temp !== null) {
      temp = temp.nextNode;
      if (temp.value === value) {
        console.log("True! The value " + value + " exists in the list.");
        return true;
      }
      if (temp.nextNode === null) {
        console.log("False! The value " + value + " does not exist in the list.");
        return false;
      }
    }
  }

  find(value) {
    let temp = this.head;
    let numOfSteps = 0;
    if (temp.value === value) {
      console.log("The index of the value is", numOfSteps);
      return true;
    }
    while (temp !== null) {
      numOfSteps++;
      temp = temp.nextNode;
      if (temp.value === value) {
        console.log("The index of the value is", numOfSteps);
        return numOfSteps;
      }
      if (temp.nextNode === null) {
        console.log("The value does not exist");
        return false;
      }
    }
  }
  toString() {
    let temp = this.head;
    let tempHolder = "";
    while (temp !== null) {
      temp = temp.nextNode;
      tempHolder += temp.value.toString() + " -> ";
      if (temp.nextNode === null) {
        tempHolder += null;
        console.log(tempHolder);
        return;
      }
    }
  }
}

let list = new LinkedList();
list.append(5);
list.append(6);
list.append(7);
list.append(8);
list.prepend(4);
list.prepend(3);
list.size();
list.front();
list.back();
list.at(1);
list.pop();
list.contains(5);
list.contains(10);
list.find(5);
list.find(100);
list.toString();

console.log("The whole list:", list);

// Completed task 1 - 10. Skipped 11 and 12 for now as I want to fasttrack towards React and linked lists seem quite straightforward.

// Build the following functions in the LinkedList class
// 1. append(value) adds a new node containing value to the end of the list
// 2. prepend(value) adds a new node containing value to the start of the list
// 3. size returns the total number of nodes in the list
// 4. head returns the first node in the list
// 5. tail returns the last node in the list
// 6. at(index) returns the node at the given index
// 7. pop removes the last element from the list
// 8. contains(value) returns true if the passed in value is in the list and otherwise returns false.
// 9. find(value) returns the index of the node containing value, or null if not found.
// 10. toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

// Extra Credit:
// 11. insertAt(value, index) that inserts a new node with the provided value at the given index.
// 12. removeAt(index) that removes the node at the given index.
// Extra Credit Tip: When you insert or remove a node, consider how it will affect the existing nodes. Some of the nodes will need their nextNode link updated.
