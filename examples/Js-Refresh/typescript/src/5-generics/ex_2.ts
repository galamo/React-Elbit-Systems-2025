// Create Generic function that knows to merge 2 objects ( generic object)

const company1 = {
  name: "TechCorp",
  employees: 150,
  location: "New York",
};

const company2 = {
  name: "HealthSolutions",
  revenue: 5000000,
  industry: "Healthcare",
};

function mergeGenericObjects<T, K>(obj1: T, obj2: K): T & K {
  return { ...obj1, ...obj2 };
}

