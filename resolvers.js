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
                    throw new Error(`Oops! Please enter an ID for employee.`)
                }
                else if (err.name === 'CastError') {
                    throw new Error(`Sorry! There is no employee with that id.`)
                }
                throw new Error(`Something went wrong`)
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
                        return {
                            message: "Employee Successfully created.",
                            status: true,
                            employee: emp,
                        };
                    }
    
                } catch (err) {
                    if (!args.first_name || !args.last_name || !args.email || !args.gender || !args.salary) {
                        throw new Error("You missed some fields to enter.")
                    }

                    if (err.code === 11000) {
                        throw new Error("Employee exists with that email.")
                    }

                    else {
                        throw new Error("Something went wrong while creating new employee.")
                    }
                }
            },

            updateEmployee: async (parent, args) => {

                if (!args.first_name || !args.last_name || !args.email || !args.gender || !args.salary) {
                    throw new Error("Check! You didn't enter an id to update you employee.")
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
                        throw new Error("Sorry! There is no employee with the id you entered.");
                    }
                    if (err.code === 11000) {
                        throw new Error(`Employee with this already exists`)
                    } else {
                        throw new Error("Something went wrong while updating employee.")
                    }
                }
            },

            deleteEmployee: async (parent, args) => {
                if (!args.id) {
                    throw new Error( "Check! Check! You didn't enter id to delete your employee");
                }
                try{
                    return await Employee.findByIdAndDelete(args.id)
                }
                catch(err){
                    if (err.name === 'CastError') {
                        throw new Error("There is no employee with the id you entered.")
                    }
                    throw new Error("Something went wrong while deleting employee.")
                }
            },
        }
    }
}