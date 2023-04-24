const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

const findEmployeeByName = (name, employees) => employees.find( employee => employee.name === name);

const findManagerFor = (name, employees) => employees.find(employee => employee.id === name.managerId);

const findCoworkersFor = (name, employees) => employees.filter(employee => employee.managerId === name.managerId && employee.id !== name.id);

const findManagementChainForEmployee = (name, employees) => {
  let result = [];
  let findManager = (findManagerFor(name, employees));
  while(findManager) {
    result.unshift(findManager);
    findManager = findManagerFor(findManager, employees);
  }
  return result;
}

const generateManagementTree = (employees) => {
  const name = employees.find( employee => !employee.managerId); //just to find first employee with no manager ex: "moe"
  const managerOfName = (name, employees) => employees.filter(employee => employee.managerId === name.id).reduce((acc, employee) => {
    acc.push({...employee, reports: managerOfName(employee, employees)});
    return acc;
  }, []);
  return { ...name, reports: managerOfName(name, employees) }
};

const displayManagementTree = (employee, level = 0)=> {
  const arr = new Array(level);
  console.log(`${arr.fill('-').join('')}${employee.name}`)
  level = level + 1;
  employee.reports.forEach((employee)=> {
    displayManagementTree(employee, level)
  })
};

// Goal: Given a tree of employees, generate a text display which displays the hierarchy.

// Paste the following starting code into your acmeEmployees.js file:

spacer('displayManagementTree')

displayManagementTree(generateManagementTree(employees));
// Write a function that will achieve the following output in the terminal:

// moe
// -larry
// --shep
// ---shep Jr.
// -curly
// --groucho
// ---harpo
// -lucy