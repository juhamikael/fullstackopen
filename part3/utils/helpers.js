const generateId = () => {
  // Not used anymore since MongoDB generates the ID automatically and therefore this is deprecated
  return Math.floor(Math.random() * 1000000000);
};

exports.generateId = generateId;
