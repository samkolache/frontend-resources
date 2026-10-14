const FRUITS = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cherry",
  "Coconut",
  "Grape",
  "Grapefruit",
  "Kiwi",
  "Lemon",
  "Lime",
  "Mango",
  "Orange",
  "Papaya",
  "Peach",
  "Pear",
  "Pineapple",
  "Raspberry",
  "Strawberry",
  "Watermelon",
];

// Stand-in for a network call, with variable latency so responses can race.
export function searchFruits(query: string): Promise<string[]> {
  const needle = query.trim().toLowerCase();
  const matches = FRUITS.filter((fruit) =>
    fruit.toLowerCase().includes(needle),
  );
  return new Promise((resolve) =>
    setTimeout(() => resolve(matches), 100 + Math.random() * 300),
  );
}
