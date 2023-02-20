const { json } = require('body-parser');
const Employee = require('./models/Employee');
const User = require('./models/User');

exports.resolvers = {
    Query:{

        getEmployees: async (parent, args) => {
            return Employee.find({})
        },

        getEmployeeByID: async (parent, args) => {
            try {
                return await Employee.findById(args.id);
            } catch (err) {
                if (!args.id) {
                    return ({message : "Oops! Please enter an ID for employee.", status: false});
                }
                else if (err.name === 'CastError') {
                    return({message:"Sorry! There is no employee with that id.", status: false});
                }
                    return ({message: "Something went wrong", status: false});
            }
        },

        login: async (parent, args) => {
            try {
                const userInfo = await User.findOne({ 
                    username: args.username 
                });

                if (userInfo && userInfo.password === args.password) {
                    return ({message: `Welcome, ${userInfo.username}! You have successfully logged in.`, status: true});
                } else {
                    return  ({message : "Sorry! Please check the username and password you entered.", status: false});
                }
            } catch (err) {
                return ({message:"Something went wrong while logging", status: false});
            }
        },

        Mutation: {
            addEmployee: async (parent, args) => {
                try {
                    let newEmp = new Employee({
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        gender: args.gender,
                        salary: args.salary,
                    });
    
                    const employ = await newEmp.save()
                    
                    if (employ) {
                        return({message:"Employee Successfully created."}, {employee: employ});
                    }
    
                } catch (err) {
                    if (!args.first_name || !args.last_name || !args.email || !args.gender || !args.salary) {
                        return ({message:"You missed some fields to enter.", status: false});
                    }

                    if (err.code === 11000) {
                        return ({message:"Employee exists with that email.", status: false});
                    }

                    else {
                        return ({message:"Something went wrong while creating new employee.", status: false});
                    }
                }
            },

            updateEmployee: async (parent, args) => {

                if (!args.first_name || !args.last_name || !args.email || !args.gender || !args.salary) {
                    return ({message:"Check! You didn't enter an id to update you employee.", status: false});
                }
    
                try {
    
                    return await Employee.findOneAndUpdate(
                        {
                            _id: args.id
                        },
                        {
                            $set: {
                                first_name: args.first_name,
                                last_name: args.last_name,
                                email: args.email,
                                gender: args.gender,
                                salary: args.salary
                            }
                        }, 
                        { new: true }
                    );
    
                } catch (err) {
    
                    if (!args.id || err.name === 'CastError') {
                        return({message :"Sorry! There is no employee with the id you entered.", status: false});
                    }
                    if (err.code === 11000) {
                        return({message :`Employee with this already exists`, status: false});
                    } else {
                        return({message :"Something went wrong while updating employee.", status: false});
                    }
                }
            },

            deleteEmployee: async (parent, args) => {
                if (!args.id) {
                    return({message : "Check! Check! You didn't enter id to delete your employee", status: false});
                }
                try{
                    return await Employee.findByIdAndDelete(args.id)
                }
                catch(err){
                    if (err.name === 'CastError') {
                        return({message:"There is no employee with the id you entered.", status: false});
                    }
                        return({message: "Something went wrong while deleting employee.", status: false});
                }
            },

            signup: async (parent, args) => {

                try {
                    const nUser = new User({
                        username: args.username,
                        email: args.email,
                        password: args.password
                    })
    
                    const user =  await nUser.save();
                    if (user) {
                        return({message:"Thank you! You have successfully created an account.", user:user});
                    }
                } catch (err) {
    
                    if (!args.username || !args.password || !args.email) {
                        return({message:"Please enter all the details.", status: false});
                    }
                    else if (err.code === 11000) {
                        return({message:"Oops! An account already exists with the same email.", status: false});
    
                    } else {
                        return({message: "Check! You have entered a value wrong for creating user", status: false});
                    }
                }
            }
        }
    }
}