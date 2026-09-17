// ========================================
// BRAIN BRAWL 2026
// QUESTION BANK 2
// 3RD + 4TH YEAR
// ========================================

window.questions = [
    {
        id: 1,
        question: "Which keyword is used to prevent any changes in a variable value in C?",
        options: [
            "volatile",
            "constant",
            "const",
            "static"
        ],
        answer: "const",
        marks: 1
    },
    {
        id: 2,
        question: "What is the output of printf(\"%d\", 5 / 2); in C?",
        options: [
            "2.5",
            "2",
            "2.0",
            "Runtime Error"
        ],
        answer: "2",
        marks: 1
    },
    {
        id: 3,
        question: "Which of the following is the correct format specifier for double in C?",
        options: [
            "%d",
            "%f",
            "%lf",
            "%s"
        ],
        answer: "%lf",
        marks: 1
    },
    {
        id: 4,
        question: "What will happen if you access an array element outside its bounds in C?",
        options: [
            "Compile-time error",
            "Garbage value or Segmentation Fault",
            "Array index out of bounds exception",
            "Program will automatically expand the array"
        ],
        answer: "Garbage value or Segmentation Fault",
        marks: 1
    },
    {
        id: 5,
        question: "Which storage class retains variable values between function calls?",
        options: [
            "auto",
            "extern",
            "register",
            "static"
        ],
        answer: "static",
        marks: 1
    },
    {
        id: 6,
        question: "What does malloc() return on failure?",
        options: [
            "0",
            "-1",
            "NULL",
            "Void"
        ],
        answer: "NULL",
        marks: 1
    },
    {
        id: 7,
        question: "Which operator is used to access structure members using a pointer to the structure?",
        options: [
            ".",
            "->",
            "*",
            "&"
        ],
        answer: "->",
        marks: 1
    },
    {
        id: 8,
        question: "What is the size of a union in C?",
        options: [
            "Sum of sizes of all members",
            "Size of the largest member",
            "Size of the smallest member",
            "Fixed 8 bytes"
        ],
        answer: "Size of the largest member",
        marks: 1
    },
    {
        id: 9,
        question: "Which header file is required for dynamic memory allocation functions like malloc() and calloc()?",
        options: [
            "<stdio.h>",
            "<string.h>",
            "<stdlib.h>",
            "<conio.h>"
        ],
        answer: "<stdlib.h>",
        marks: 1
    },
    {
        id: 10,
        question: "What is a \"Dangling Pointer\" in C?",
        options: [
            "A pointer pointing to NULL",
            "A pointer pointing to deallocated/freed memory",
            "An uninitialized pointer",
            "A pointer pointing to a constant variable"
        ],
        answer: "A pointer pointing to deallocated/freed memory",
        marks: 1
    },
    {
        id: 11,
        question: "What is the default return type of getchar() function?",
        options: [
            "char",
            "char*",
            "int",
            "void"
        ],
        answer: "int",
        marks: 1
    },
    {
        id: 12,
        question: "What is the output of this C code?\n\nint x = 5;\nif (x = 0)\n    printf(\"True\");\nelse\n    printf(\"False\");",
        options: [
            "True",
            "False",
            "Compile Error",
            "Nothing is printed"
        ],
        answer: "False",
        marks: 1
    },
    {
        id: 13,
        question: "What is the output of this C code?\n\nint a = 10, b = 20;\nprintf(\"%d\", a > b ? a : b);",
        options: [
            "10",
            "20",
            "1",
            "0"
        ],
        answer: "20",
        marks: 1
    },
    {
        id: 14,
        question: "What will be the output of sizeof(\"Hello\") on a 64-bit system?",
        options: [
            "5",
            "6",
            "4",
            "8"
        ],
        answer: "6",
        marks: 1
    },
    {
        id: 15,
        question: "What is the output of this C code?\n\nint x = 3;\nprintf(\"%d\", ++x * x++);",
        options: [
            "12",
            "16",
            "Undefined behavior (Compiler dependent)",
            "20"
        ],
        answer: "Undefined behavior (Compiler dependent)",
        marks: 1
    },
    {
        id: 16,
        question: "Which feature of C++ allows a function to have multiple definitions with different parameter signatures?",
        options: [
            "Function Overriding",
            "Function Overloading",
            "Dynamic Binding",
            "Encapsulation"
        ],
        answer: "Function Overloading",
        marks: 1
    },
    {
        id: 17,
        question: "Which keyword is used to allocate memory dynamically in C++?",
        options: [
            "malloc",
            "alloc",
            "new",
            "create"
        ],
        answer: "new",
        marks: 1
    },
    {
        id: 18,
        question: "What is the default access modifier for members of a class in C++?",
        options: [
            "public",
            "private",
            "protected",
            "friend"
        ],
        answer: "private",
        marks: 1
    },
    {
        id: 19,
        question: "Which mechanism is used to achieve Runtime Polymorphism in C++?",
        options: [
            "Operator Overloading",
            "Function Overloading",
            "Virtual Functions",
            "Templates"
        ],
        answer: "Virtual Functions",
        marks: 1
    },
    {
        id: 20,
        question: "What is a Constructor?",
        options: [
            "A method used to delete an object",
            "A special member function called automatically during object creation",
            "A function with no return type that must be static",
            "A friend function of a class"
        ],
        answer: "A special member function called automatically during object creation",
        marks: 1
    },
    {
        id: 21,
        question: "Which operator cannot be overloaded in C++?",
        options: [
            "+",
            "==",
            "::",
            "[]"
        ],
        answer: "::",
        marks: 1
    },
    {
        id: 22,
        question: "What is an Abstract Class in C++?",
        options: [
            "A class with no constructor",
            "A class containing at least one Pure Virtual Function",
            "A class with private member variables only",
            "A class that cannot have derived classes"
        ],
        answer: "A class containing at least one Pure Virtual Function",
        marks: 1
    },
    {
        id: 23,
        question: "Which STL container works on a LIFO (Last In First Out) principle?",
        options: [
            "std::queue",
            "std::vector",
            "std::stack",
            "std::deque"
        ],
        answer: "std::stack",
        marks: 1
    },
    {
        id: 24,
        question: "What is the syntax for a Pure Virtual Function in C++?",
        options: [
            "virtual void show() = 0;",
            "void show() = pure;",
            "virtual void show() = NULL;",
            "abstract void show();"
        ],
        answer: "virtual void show() = 0;",
        marks: 1
    },
    {
        id: 25,
        question: "What happens when an object is passed by value to a function in C++?",
        options: [
            "A pointer to the object is passed",
            "A copy constructor is invoked",
            "An assignment operator is called",
            "Memory is allocated on the heap"
        ],
        answer: "A copy constructor is invoked",
        marks: 1
    },
    {
        id: 26,
        question: "What is the output of this C++ code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int &ref = x;\n    ref = 20;\n    cout << x;\n    return 0;\n}",
        options: [
            "10",
            "20",
            "Garbage value",
            "Compile error"
        ],
        answer: "20",
        marks: 1
    },
    {
        id: 27,
        question: "What is the complexity of accessing an element in std::vector by index v[i]?",
        options: [
            "O(1)",
            "O(N)",
            "O(log N)",
            "O(N²)"
        ],
        answer: "O(1)",
        marks: 1
    },
    {
        id: 28,
        question: "What is the output of this C++ code?\n\n#include <iostream>\nusing namespace std;\nclass Test {\npublic:\n    Test() { cout << \"A\"; }\n    ~Test() { cout << \"B\"; }\n};\nint main() {\n    Test t;\n    return 0;\n}",
        options: [
            "A",
            "B",
            "AB",
            "BA"
        ],
        answer: "AB",
        marks: 1
    },
    {
        id: 29,
        question: "Which keyword is used to handle exceptions in C++?",
        options: [
            "try",
            "catch",
            "throw",
            "All of the above"
        ],
        answer: "All of the above",
        marks: 1
    },
    {
        id: 30,
        question: "What is the output of this C++ code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n    int arr[] = {10, 20, 30};\n    cout << -2[arr];\n    return 0;\n}",
        options: [
            "-20",
            "-30",
            "Compiler Error",
            "10"
        ],
        answer: "-30",
        marks: 1
    },
    {
        id: 31,
        question: "Which of the following data structures is immutable in Python?",
        options: [
            "List",
            "Set",
            "Dictionary",
            "Tuple"
        ],
        answer: "Tuple",
        marks: 1
    },
    {
        id: 32,
        question: "What will be the output of print(type([])) in Python?",
        options: [
            "<class 'tuple'>",
            "<class 'list'>",
            "<class 'array'>",
            "<class 'set'>"
        ],
        answer: "<class 'list'>",
        marks: 1
    },
    {
        id: 33,
        question: "What is the output of print(2 ** 3 ** 2) in Python?",
        options: [
            "64",
            "512",
            "8",
            "81"
        ],
        answer: "512",
        marks: 1
    },
    {
        id: 34,
        question: "Which keyword is used to define a function in Python?",
        options: [
            "func",
            "function",
            "def",
            "define"
        ],
        answer: "def",
        marks: 1
    },
    {
        id: 35,
        question: "What does the pass statement do in Python?",
        options: [
            "Terminates the loop",
            "Skips the current iteration",
            "Acts as a placeholder doing nothing",
            "Raises an exception"
        ],
        answer: "Acts as a placeholder doing nothing",
        marks: 1
    },
    {
        id: 36,
        question: "What is the output of print(\"Python\"[::-1])?",
        options: [
            "Python",
            "nohtyP",
            "P",
            "n"
        ],
        answer: "nohtyP",
        marks: 1
    },
    {
        id: 37,
        question: "Which of the following methods is used to add an element at the end of a list?",
        options: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        answer: "append()",
        marks: 1
    },
    {
        id: 38,
        question: "What is the output of bool([]) in Python?",
        options: [
            "True",
            "False",
            "None",
            "Error"
        ],
        answer: "False",
        marks: 1
    },
    {
        id: 39,
        question: "How do you create a set in Python?",
        options: [
            "s = []",
            "s = ()",
            "s = {1, 2, 3}",
            "s = \"1, 2, 3\""
        ],
        answer: "s = {1, 2, 3}",
        marks: 1
    },
    {
        id: 40,
        question: "What is the output of this Python code?\n\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)",
        options: [
            "[1, 2, 3]",
            "[1, 2, 3, 4]",
            "[4, 1, 2, 3]",
            "Error"
        ],
        answer: "[1, 2, 3, 4]",
        marks: 1
    },
    {
        id: 41,
        question: "Which special variable holds the name of the current running module in Python?",
        options: [
            "__main__",
            "__name__",
            "__module__",
            "__init__"
        ],
        answer: "__name__",
        marks: 1
    },
    {
        id: 42,
        question: "What is the output of print(3 * 'abc')?",
        options: [
            "abcabcabc",
            "3abc",
            "abc3",
            "TypeError"
        ],
        answer: "abcabcabc",
        marks: 1
    },
    {
        id: 43,
        question: "Which list comprehension expression creates a list of even numbers from 0 to 8?",
        options: [
            "[x for x in range(10) if x % 2 == 0]",
            "[x if x % 2 == 0 for x in range(10)]",
            "[x for x in range(10) while x % 2 == 0]",
            "[even(x) for x in range(10)]"
        ],
        answer: "[x for x in range(10) if x % 2 == 0]",
        marks: 1
    },
    {
        id: 44,
        question: "What will print(10 // 3) output?",
        options: [
            "3.333",
            "3",
            "3.0",
            "1"
        ],
        answer: "3",
        marks: 1
    },
    {
        id: 45,
        question: "What is the output of set([1, 2, 2, 3, 4, 4])?",
        options: [
            "{1, 2, 2, 3, 4, 4}",
            "{1, 2, 3, 4}",
            "[1, 2, 3, 4]",
            "(1, 2, 3, 4)"
        ],
        answer: "{1, 2, 3, 4}",
        marks: 1
    },
    {
        id: 46,
        question: "What is the worst-case time complexity of QuickSort?",
        options: [
            "O(N)",
            "O(N log N)",
            "O(N²)",
            "O(log N)"
        ],
        answer: "O(N²)",
        marks: 1
    },
    {
        id: 47,
        question: "Which data structure follows the LIFO (Last In First Out) principle?",
        options: [
            "Queue",
            "Linked List",
            "Stack",
            "Tree"
        ],
        answer: "Stack",
        marks: 1
    },
    {
        id: 48,
        question: "In Binary Search, the minimum condition required for the array is:",
        options: [
            "Array size must be even",
            "Array must be sorted",
            "Array elements must be integers",
            "Array must not contain duplicates"
        ],
        answer: "Array must be sorted",
        marks: 1
    },
    {
        id: 49,
        question: "Which of the following tree traversals visits the root node last?",
        options: [
            "Pre-order",
            "In-order",
            "Post-order",
            "Level-order"
        ],
        answer: "Post-order",
        marks: 1
    },
    {
        id: 50,
        question: "What is the time complexity to insert an element at the beginning of a Singly Linked List?",
        options: [
            "O(1)",
            "O(N)",
            "O(log N)",
            "O(N²)"
        ],
        answer: "O(1)",
        marks: 1
    },
    {
        id: 51,
        question: "Which data structure is used for Breadth-First Search (BFS) in a graph?",
        options: [
            "Stack",
            "Queue",
            "Priority Queue",
            "Hash Table"
        ],
        answer: "Queue",
        marks: 1
    },
    {
        id: 52,
        question: "What is the balance factor of a node in an AVL tree defined as?",
        options: [
            "Height(Left Subtree) + Height(Right Subtree)",
            "Height(Left Subtree) - Height(Right Subtree)",
            "Height(Root) - Height(Leaf)",
            "Nodes(Left) - Nodes(Right)"
        ],
        answer: "Height(Left Subtree) - Height(Right Subtree)",
        marks: 1
    },
    {
        id: 53,
        question: "Minimum number of stacks required to implement a Queue is:",
        options: [
            "1",
            "2",
            "3",
            "Cannot be implemented"
        ],
        answer: "2",
        marks: 1
    },
    {
        id: 54,
        question: "What is the auxiliary space complexity of Merge Sort?",
        options: [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N²)"
        ],
        answer: "O(N)",
        marks: 1
    },
    {
        id: 55,
        question: "In a Max-Heap, where is the maximum element located?",
        options: [
            "At the leaf node",
            "At the root node",
            "At the middle node",
            "Random position"
        ],
        answer: "At the root node",
        marks: 1
    },
    {
        id: 56,
        question: "What condition indicates a Circular Queue is full (where N is size)?",
        options: [
            "front == rear",
            "(rear + 1) % N == front",
            "rear == N - 1",
            "front == 0"
        ],
        answer: "(rear + 1) % N == front",
        marks: 1
    },
    {
        id: 57,
        question: "In-order traversal of a Binary Search Tree (BST) yields elements in:",
        options: [
            "Reverse order",
            "Sorted (Ascending) order",
            "Random order",
            "Level-by-level order"
        ],
        answer: "Sorted (Ascending) order",
        marks: 1
    },
    {
        id: 58,
        question: "Which hashing technique resolves collisions by creating a linked list at each table index?",
        options: [
            "Linear Probing",
            "Quadratic Probing",
            "Separate Chaining",
            "Double Hashing"
        ],
        answer: "Separate Chaining",
        marks: 1
    },
    {
        id: 59,
        question: "What is the average time complexity for lookup in a Hash Table?",
        options: [
            "O(1)",
            "O(N)",
            "O(log N)",
            "O(N log N)"
        ],
        answer: "O(1)",
        marks: 1
    },
    {
        id: 60,
        question: "Which algorithm is used to find the Shortest Path in a weighted graph with non-negative edge weights?",
        options: [
            "Prim's Algorithm",
            "Kruskal's Algorithm",
            "Dijkstra's Algorithm",
            "Floyd-Warshall Algorithm"
        ],
        answer: "Dijkstra's Algorithm",
        marks: 1
    },
    {
        id: 61,
        question: "What is the output of this Python code?\n\ndef func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))",
        options: [
            "[1] then [2]",
            "[1] then [1, 2]",
            "[1, 2] then [1, 2]",
            "Error"
        ],
        answer: "[1] then [1, 2]",
        marks: 1
    },
    {
        id: 62,
        question: "What does the following C code output?\n\nint x = 1;\nwhile(x <= 5) {\n    if(x == 3)\n        break;\n    printf(\"%d \", x++);\n}",
        options: [
            "1 2 3",
            "1 2",
            "1 2 3 4 5",
            "Infinite loop"
        ],
        answer: "1 2",
        marks: 1
    },
    {
        id: 63,
        question: "What is the output of this C++ code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    cout << (x << 2);\n    return 0;\n}",
        options: [
            "10",
            "20",
            "2.5",
            "7"
        ],
        answer: "20",
        marks: 1
    },
    {
        id: 64,
        question: "What will be the output of this Python slicing code?\n\nlst = [10, 20, 30, 40, 50]\nprint(lst[1:4:2])",
        options: [
            "[20, 30]",
            "[20, 40]",
            "[10, 30]",
            "[30, 50]"
        ],
        answer: "[20, 40]",
        marks: 1
    },
    {
        id: 65,
        question: "What is the output of this C code involving pointers?\n\nint a[] = {10, 20, 30, 40};\nint *p = a;\nprintf(\"%d\", *(p + 2));",
        options: [
            "10",
            "20",
            "30",
            "Garbage value"
        ],
        answer: "30",
        marks: 1
    },
    {
        id: 66,
        question: "What will be printed by this C++ function?\n\nvoid solve(int n) {\n    if (n == 0) return;\n    solve(n - 1);\n    cout << n << \" \";\n}\n// solve(3) called",
        options: [
            "3 2 1",
            "1 2 3",
            "3 3 3",
            "0 1 2 3"
        ],
        answer: "1 2 3",
        marks: 1
    },
    {
        id: 67,
        question: "What is the result of the Python expression [1, 2] + [3, 4]?",
        options: [
            "[4, 6]",
            "[1, 2, 3, 4]",
            "[[1, 2], [3, 4]]",
            "TypeError"
        ],
        answer: "[1, 2, 3, 4]",
        marks: 1
    },
    {
        id: 68,
        question: "What is the output of this C recursion program?\n\nint fun(int n) {\n    if (n == 1) return 1;\n    return n + fun(n - 1);\n}\n// fun(4) called",
        options: [
            "10",
            "24",
            "4",
            "16"
        ],
        answer: "10",
        marks: 1
    },
    {
        id: 69,
        question: "What is the output of this Python code?\n\nd = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 3))",
        options: [
            "KeyError",
            "None",
            "3",
            "0"
        ],
        answer: "3",
        marks: 1
    },
    {
        id: 70,
        question: "What is the outcome of the following C++ code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n    int a = 10, b = 0;\n    try {\n        if (b == 0) throw \"Div by zero\";\n    } catch(const char* msg) {\n        cout << msg;\n    }\n    return 0;\n}",
        options: [
            "10",
            "0",
            "Div by zero",
            "Runtime Exception Crash"
        ],
        answer: "Div by zero",
        marks: 1
    },
    {
        id: 71,
        question: "What will be the output of this Python code?\n\nnums = [1, 2, 3, 4]\nprint(list(map(lambda x: x * 2, nums)))",
        options: [
            "[1, 4, 9, 16]",
            "[2, 4, 6, 8]",
            "[1, 2, 3, 4, 1, 2, 3, 4]",
            "<map object at 0x...>"
        ],
        answer: "[2, 4, 6, 8]",
        marks: 1
    },
    {
        id: 72,
        question: "What is the output of this C code?\n\nchar str[] = \"Pointer\";\nchar *p = str;\nprintf(\"%c\", *p++);",
        options: [
            "P",
            "o",
            "r",
            "Address of str"
        ],
        answer: "P",
        marks: 1
    },
    {
        id: 73,
        question: "What will this Python loop print?\n\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i, end=\"\")",
        options: [
            "12345",
            "1245",
            "12",
            "345"
        ],
        answer: "1245",
        marks: 1
    },
    {
        id: 74,
        question: "What is the output of this C++ program?\n\n#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    cout << (x == 0 ? \"Zero\" : \"Non-Zero\");\n    return 0;\n}",
        options: [
            "0",
            "Zero",
            "Non-Zero",
            "Compile Error"
        ],
        answer: "Zero",
        marks: 1
    },
    {
        id: 75,
        question: "What is the output of this Python code?\n\na = (1, 2, 3)\na[0] = 10\nprint(a)",
        options: [
            "(10, 2, 3)",
            "[10, 2, 3]",
            "TypeError",
            "(1, 2, 3)"
        ],
        answer: "TypeError",
        marks: 1
    }
];
