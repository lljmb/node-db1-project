const Accounts = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
  const {name, budget} = req.body;
  if (!name || !budget) {
    res.status(400).json({message: 'name and budget are required'})
  } else if (typeof name !== 'string') { 
    res.status(400).json({message: 'name must be a string'})
  } else if (typeof budget !== 'number') {
    res.status(400).json({message: 'budget must be a number'})
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({message: 'name of account must be between 3 and 100 characters'})
  } else {
    req.body.name = name.trim()
    next()
  }
    } catch(err) {
      next(err)
    }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
  const accounts = await Accounts.getAll()
  const name = req.body.name.trim()
  const results = accounts.filter(account => {
  if (account.name === name){
    return account
  }
  })
  if (results.length > 0 ) {
    res.status(400).json({message: 'that name is taken'})
  }else {
    next()
  }
  } catch(err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    const account = await Accounts.getById(req.params.id)
    if (account) {
      next()
    } else {
      res.status(404).json({message: 'account not found'})
    }
  } catch(err) {
    next(err)
  }
}
 