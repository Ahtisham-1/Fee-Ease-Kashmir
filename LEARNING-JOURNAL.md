# FeeEase Kashmir — Learning Journal

---

## July 14, 2026 — TypeScript Day 27

### What I learned
- **Compile-time vs Runtime**: TypeScript catches bugs while I write, not after users click. Like a mechanic checking the car in the garage vs the car breaking on the road.
- **Type inference**: TypeScript is smart — `let fees = 1500` already knows it's a number. I don't need to write `: number` everywhere.
- **Type aliases**: `type Student = { ... }` defines the shape once. If I miss a property anywhere, TypeScript catches it. Like an AI car that won't start without a seatbelt.

### What confused me
- Didn't know the difference between `type` and `interface` — learned that `type` is enough for now, `interface` matters more in React.
- Thought `void` was a type alias — it's actually a return type for functions (learning tomorrow).

### What I do tomorrow
- Concept 4: Function parameter types + return types (what `void` actually means)

---

## July 15, 2026 — TypeScript Day 28

### What I learned
- **Function types**: `void` means a function does work but returns nothing — like a cook who makes food silently. A function that returns `number` is like the server who puts food on the table.
- **Typed arrays**: `Fee[]` means every item in the array must match the Fee shape. Same jar, different labels.
- **Optional properties**: `note?: string` means the property can be there or not — both are fine.
- **Union types**: `"Tution" | "Exam" | "Transport"` restricts values to only these options — like a restaurant menu.
- **Narrowing**: Check the type first, then act — like checking if someone is a child before giving a discount.
- **Type assertions (`as`)**: Telling TypeScript "I know better" — risky if wrong, like guiding a mechanic over the phone.
- **Generics**: A jar you can fill with anything — `Array<Student>` is the same as `Student[]`.

### What I audited
Ran a full TypeScript audit on my codebase. Found 6 gaps:
1. Types not exported from data.ts
2. `newTransactionObject` has no `: Transaction` annotation
3. `newParentObject` has no `: Parent` annotation
4. `newStudentObject` has no `: Student` annotation
5. `FeeMonth` duplicates `Fee` — should extend it
6. Dead `options` object in `showTransactions()`

### What I do tomorrow
- Fix all 6 TypeScript gaps — fully convert the project
