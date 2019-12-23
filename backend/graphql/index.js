const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } = graphql

// Userbase
const User = require('../schema/models/User')
const Gym = require('../schema/models/Gym')

const Plan = require('../schema/models/Plan')
const Attendance = require('../schema/models/Attendance')
const Trainer = require('../schema/models/Tariner')
const GymOwner = require('../schema/models/GymOwner')
const Admin = require('../schema/models/Admin')
const Invoice = require('../schema/models/Invoice')

const Feedback = require('../schema/models/Feedback')
const Request = require('../schema/models/Request')
const Notification = require('../schema/models/Notification')
const Notice = require('../schema/models/Notice')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        firstName: {type: GraphQLNonNull(GraphQLString)},
        lastName: {type: GraphQLNonNull(GraphQLString)},
        address: {type: GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLNonNull(GraphQLString)},
        gender: {type: GraphQLString},
        height: {type: GraphQLString},
        weight: {type: GraphQLString},
        email: {type: GraphQLNonNull(GraphQLString)},
        username: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        phoneNumber: {type: GraphQLNonNull(GraphQLString)},
        city: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)},
        displayPicture: {type: GraphQLNonNull(GraphQLString)},
        registerationFee: {type: GraphQLNonNull(GraphQLString)},
        dateLastLogin: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        dateJoined: {type: GraphQLNonNull(GraphQLString)},
        planCycleStart: {type: GraphQLNonNull(GraphQLString)},
        plan: {
            type: PlanType,
            resolve(parent, args) {
                return Plan.findOne({users: {$in: parent.id}})
            }
        },
        gym: {
            type: GymType,
            resolve(parent, args) {
                return Gym.findOne({users: {$in: parent.id}})
            }
        },
        trainer: {
            type: TrainerType,
            resolve(parent, args) {
                return Trainer.findOne({users: {$in: parent.id}})
            }
        },
        requests: {
            type: GraphQLList(RequestType),
            resolve(parent, args) {
                return Request.find({user: parent.id})
            }
        },
        feedbacks: {
            type: GraphQLList(RequestType),
            resolve(parent, args) {
                return Feedback.find({user: parent.id})
            }
        },
        notifications: {
            type: GraphQLList(NotificationType),
            resolve(parent, args) {
                return Notification.find({user: parent.id})
            }
        },
        attendance: {
            type: GraphQLList(NotificationType),
            resolve(parent, args) {
                return Attendance.find({user: parent.id})
            }
        },
        invoices: {
            type: GraphQLList(NotificationType),
            resolve(parent, args) {
                return Invoice.find({user: parent.id})
            }
        }
    })
})

const GymType = new GraphQLObjectType({
    name: 'Gym',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLString)},
        address: {type: GraphQLNonNull(GraphQLString)},
        city: {type: GraphQLNonNull(GraphQLInt)},
        state: {type: GraphQLNonNull(GraphQLInt)},
        country: {type: GraphQLNonNull(GraphQLInt)},
        owner: {
            type: GraphQLNonNull(GymOwnerType),
            resolve(parent, args) {
                return GymOwner.findOne({gym: parent.id})
            }
        },
        email: {type: GraphQLNonNull(GraphQLString)},
        dateJoined: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        pictures: {type: GraphQLString},
        services: {type: GraphQLString},
        phoneNumber: {type: GraphQLNonNull(GraphQLString)},
        GSTNumber: {type: GraphQLNonNull(GraphQLString)},
        plans: {
            type: GraphQLList(PlanType),
            resolve(parent, args) {
                return Plan.find({gym: parent.id})
            }
        },
        invoices: {
            type: GraphQLList(InvoiceType),
            resolve(parent, args) {
                return Invoice.find({gym: parent.id})
            }
        },
        attendance: {
            type: GraphQLList(AttendanceType),
            resolve(parent, args) {
                return Attendance.find({gym: parent.id})
            }
        },
        trainers: {
            type: GraphQLList(TrainerType),
            resolve(parent, args) {
                return Trainer.find({gym: parent.id})
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({gym: parent.id})
            }
        },
        requests: {
            type: GraphQLList(InvoiceType),
            resolve(parent, args) {
                return Request.find({gym: parent.id})
            }
        },
        feedbacks: {
            type: GraphQLList(FeedbackType),
            resolve(parent, args) {
                return Feedback.find({gym: parent.id})
            }
        },
        notifications: {
            type: GraphQLList(NotificationType),
            resolve(parent, args) {
                return Notification.find({gym: parent.id})
            }
        },
        notices: {
            type: GraphQLList(NoticeType),
            resolve(parent, args) {
                return Notice.find({gym: parent.id})
            }
        },
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const GymOwnerType = new GraphQLObjectType({
    name: 'GymOwner',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        gym: {
            type: GraphQLNonNull(GymType)
        },
        address: {type: GraphQLNonNull(GraphQLString)},
        city: {type: GraphQLNonNull(GraphQLString)},
        phoneNumber: {type: GraphQLNonNull(GraphQLString)},
        dateLastLogin: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const AdminType = new GraphQLObjectType({
    name: 'Admin',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        phoneNumber: {type: GraphQLNonNull(GraphQLString)},
        dateLastLogin: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const PlanType = new GraphQLObjectType({
    name: 'Plan',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLID)},
        description: {type: GraphQLNonNull(GraphQLID)},
        amount: {type: GraphQLNonNull(GraphQLID)},
        gym: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return Gym.findOne({plans: {$in: parent.id}})
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({plan: parent.id})
            }
        },
        dateStarted: {type: GraphQLNonNull(GraphQLString)},
        dateEnding: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const AttendanceType = new GraphQLObjectType({
    name: 'Attendance',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        user: {
            type: GraphQLNonNull(UserType),
            resolve(parent, args) {
                return User.findOne({attendance: {$in : parent.id}})
            }
        },
        gym: {
            type: GraphQLNonNull(GymType),
            resolve(parent, args) {
                return Gym.findOne({attendance: {$in : parent.id}})
            }
        },
        date: {type: GraphQLNonNull(GraphQLString)}
    })
})

const RequestType = new GraphQLObjectType({
    name: 'Request',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        user: {
            type: GraphQLNonNull(UserType),
            resolve(parent, args) {
                return User.findOne({requests: {$in: parent.id}})
            }
        },
        gym: {
            type: GraphQLNonNull(GymType),
            resolve(parent, args) {
                return Gym.findOne({requests: {$in: parent.id}})
            }
        },
        admin: {
            type: AdminType,
            resolve(parent, args) {
                return Admin.findById(parent.admin)
            }
        },
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        reply: {type: GraphQLString},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)},
        validated: {type: GraphQLNonNull(GraphQLBoolean)},
        rejected: {type: GraphQLNonNull(GraphQLBoolean)},
        isOpen: {type: GraphQLNonNull(GraphQLBoolean)}
    })
})

const FeedbackType = new GraphQLObjectType({
    name: 'Feedback',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        user: {
            type: GraphQLNonNull(UserType),
            resolve(parent, args) {
                return User.findOne({feedbacks: {$in: parent.id}})
            }
        },
        gym: {
            type: GraphQLNonNull(GymType),
            resolve(parent, args) {
                return Gym.findOne({feedbacks: {$in: parent.id}})
            }
        },
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        reply: {type: GraphQLString},
        isOpen: {type: GraphQLNonNull(GraphQLBoolean)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const NoticeType = new GraphQLObjectType({
    name: 'Notice',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        gym: {type: GraphQLNonNull(GymType)},
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        user: {
            type: GraphQLNonNull(UserType),
            resolve(parent, args) {
                return User.findOne({notifications: {$in: parent.id}})
            }
        },
        gym: {
            type: GraphQLNonNull(GymType),
            resolve(parent, args) {
                return Gym.findOne({notifications: {$in: parent.id}})
            }
        },
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)},
    })
})

const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        user: {
            type: GraphQLNonNull(UserType),
            resolve(parent, args) {
                return User.findOne({invoices: {$in: parent.id}})
            }
        },
        gym: {
            type: GraphQLNonNull(GymType),
            resolve(parent, args) {
                return Gym.findOne({invoices: {$in: parent.id}})
            }
        },
        plan: {
            type: GraphQLNonNull(PlanType),
            resolve(parent, args) {
                return Plan.findById(parent.id)
            }
        },
        amount: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const TrainerType = new GraphQLObjectType({
    name: 'Trainer',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        gym: {
            type: GraphQLNonNull(GymType),
            resolve(parent, args) {
                return Gym.findOne({trainers: {$in: parent.id}})
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({trainer: parent.id})
            }
        },
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        dateCreated: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)}
    })
})

const AuthDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: () => ({
        userId: {type: GraphQLNonNull(GraphQLString)},
        userType: {type: GraphQLNonNull(GraphQLString)},
        token: {type: GraphQLNonNull(GraphQLString)},
        tokenExpiration: {type: GraphQLNonNull(GraphQLString)}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        loginUser: {
            type: GraphQLNonNull(AuthData),
            args: {
                method: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                try {
                    const user = await User.findOne({
                        $or: [
                            {email: args.method},
                            {username: args.method},
                            {phoneNumber: args.method},
                        ]
                    })
                    if(!user) {
                        throw new Error('User does not exist')
                    }
                    const isEqual = await bcrypt.compare(args.password, user.password)
                    if(!isEqual) throw new Error('Invalid Password')
                    const token = jwt.sign({userId: user.id}, 'ninenine', {
                        expiresIn: '8760h'
                    })
                    return { userId: user.id, token: token, userType: 'User', tokenExpiration: 8760 }
                }
                catch (err) {
                    console.log('Error loggin the User in: ', err)
                    return err
                }
            }
        },
        loginGymOwner: {
            type: GraphQLNonNull(AuthData),
            args: {
                method: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                try {
                    const gymOwner = await GymOwner.findOne({
                        $or: [
                            {email: args.method},
                            {phoneNumber: args.method},
                        ]
                    })
                    if(!gymOwner) {
                        throw new Error('User does not exist')
                    }
                    const isEqual = await bcrypt.compare(args.password, gymOwner.password)
                    if(!isEqual) throw new Error('Invalid Password')
                    const token = jwt.sign({userId: gymOwner.id}, 'ninenine', {
                        expiresIn: '8760h'
                    })
                    return { userId: gymOwner.id, token: token, userType: 'GymOwner', tokenExpiration: 8760 }
                }
                catch (err) {
                    console.log('Error loggin the GymOwner in: ', err)
                    return err
                }
            }
        },
        loginAdmin: {
            type: GraphQLNonNull(AuthData),
            args: {
                method: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                try {
                    const admin = await Admin.findOne({
                        $or: [
                            {email: args.method},
                            {phoneNumber: args.method},
                        ]
                    })
                    if(!admin) {
                        throw new Error('User does not exist')
                    }
                    const isEqual = await bcrypt.compare(args.password, admin.password)
                    if(!isEqual) throw new Error('Invalid Password')
                    const token = jwt.sign({userId: admin.id}, 'ninenine', {
                        expiresIn: '8760h'
                    })
                    return { userId: admin.id, token: token, userType: 'Admin', tokenExpiration: 8760 }
                }
                catch (err) {
                    console.log('Error loggin the Admin in: ', err)
                    return err
                }
            }
        },
        getUser: {
            type: GraphQLNonNull(UserType),
            async resolve(parent, args, req) {
                try {
                    if(!req.userId) {
                        throw new Error('Unauthenticated!')
                    }
                    return await User.findById(req.userId)
                }
                catch (err) {
                    console.log('Error getting the User in: ', err)
                    return err
                }
            }
        },
        getUserById: {
            type: GraphQLNonNull(UserType),
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args, req) {
                try {
                    if(!req.userId) {
                        throw new Error('Unauthenticated!')
                    }
                    return await User.findById(args.userId)
                }
                catch (err) {
                    console.log('Error getting the User By ID: ', err)
                    return err
                }
            }
        },
        getAllUsers: {
            type: GraphQLList(UserType),
            resolve(parent, args, req) {
                try {
                    if(!req.userId && req.userType == 'Admin') throw new Error('Unauthenticated or Unauthorized!')
                    return await User.find()
                }
                catch (err) {
                    console.log('Error getting the All Users: ', err)
                    return err
                }
            }
        },
        getGymUsersByGymId: {
            type: GraphQLNonNull(UserType),
            args: {
                gymId: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args, req) {
                try {
                    if(!req.userId) {
                        throw new Error('Unauthenticated!')
                    }
                    return await User.find({gym: args.gymId})
                }
                catch (err) {
                    console.log('Error getting the Gym Users : ', err)
                    return err
                }
            }
        },
        getAllGyms: {
            type: GraphQLList(UserType),
            resolve(parent, args, req) {
                try {
                    if(!req.userId && req.userType == 'Admin') throw new Error('Unauthenticated or Unauthorized!')
                    return await Gym.find()
                }
                catch (err) {
                    console.log('Error getting All Gyms: ', err)
                    return err
                }
            }
        },
        getAllGymsOwners: {
            type: GraphQLList(UserType),
            resolve(parent, args, req) {
                try {
                    if(!req.userId && req.userType == 'Admin') throw new Error('Unauthenticated or Unauthorized!')
                    return await Gym.find()
                }
                catch (err) {
                    console.log('Error getting the All GymOwners: ', err)
                    return err
                }
            }
        },
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createGym: {
            type: AuthDataType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)},
                phoneNumber: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                const teacher = await Teacher.findOne({ email: args.email })
                if(teacher) {
                    throw new Error('User exists already')
                }
                const hashedPassword = await bcrypt.hash(args.password, 12)
                const newTeacher = new Teacher({
                    name: args.name,
                    email: args.email,
                    password: hashedPassword,
                    age: args.age,
                    phoneNumber: args.phoneNumber,
                    isAvailable: false,
                    isOnline: true,
                    dateJoined: new Date().toDateString(),
                    dateLastLogin: new Date().toDateString()
                })
                const savedTeacher = await newTeacher.save()
                const token = jwt.sign({userId: savedTeacher.id}, 'ninenine', {
                    expiresIn: '8760h'
                })
                return { userId: savedTeacher.id, token: token, typeUser: 'Teacher', tokenExpiration: 8760 }
            }
        },
        createUser: {
            type: AuthDataType,
            args: {
                firstName: {type: GraphQLNonNull(GraphQLString)},
                lastName: {type: GraphQLNonNull(GraphQLString)},
                username: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                address: {type: GraphQLNonNull(GraphQLString)},
                phoneNumber: {type: GraphQLNonNull(GraphQLString)},
                gender: {type: GraphQLString},
                displayPicture: {type: GraphQLString},
                age: {type: GraphQLNonNull(GraphQLString)},
                height: {type: GraphQLString},
                weight: {type: GraphQLString},
                city: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                try {
                    const user = await User.findOne({ 
                        $or: [
                            { email: args.email },
                            { username: args.username },
                            { phoneNumber: args.phoneNumber }
                        ]
                    })
                    if(user) {
                        if(user.username == user.username) throw new Error('Username in use already')
                        else if(user.phoneNumber == args.phoneNumber) throw new Error('Phone Number in use already')
                        else throw new Error('Email in use already')
                    }
                    const hashedPassword = await bcrypt.hash(args.password, 12)
                    const picture = args.displayPicture ? args.displayPicture : await [[[API]]]
                    // console.log(hashedPassword)
                    var newUser = new User({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        password: hashedPassword,
                        address: args.address,
                        age: args.age,
                        city: args.city,
                        gender: args.gender ? args.gender : 'U',
                        height: args.height ? args.height : null,
                        weight: args.weight ? args.weight : null,
                        displayPicture: picture,
                        phoneNumber: args.phoneNumber,
                        dateCreated: new Date().toDateString(),
                        dateLastLogin: new Date().toDateString()
                    })
                    newSubscription.save()
                    const token = jwt.sign({userId: newUser.id}, 'ninenine', {
                        expiresIn: '8760h'
                    })
                    return { userId: newUser.id, token: token, userType: 'User', tokenExpiration: 8760 }
                }
                catch (err) {
                    return err
                }
            }
        },
        loginStudent: {
            type: AuthDataType,
            args: {
                method: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent , args) {
                try {
                    const student = await Student.findOne({ email: args.method })
                    if(!student) {
                        console.log('User does not Exist')
                        throw new Error('User does not exist')
                    }
                    const isEqual = await bcrypt.compare(args.password, student.password)
                    if(!isEqual) throw new Error('Invalid Password')
                    const token = jwt.sign({userId: student.id}, 'ninenine', {
                        expiresIn: '8760h'
                    })
                    return { userId: student.id, token: token, typeUser: 'Student', tokenExpiration: 8760 }
                }
                catch (err) {
                    return err
                }
            }
        },
        loginTeacher: {
            type: AuthDataType,
            args: {
                method: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                try {
                    const teacher = await Teacher.findOne({ email: args.method })
                    if(!teacher) {
                        console.log('User does not Exist')
                        throw new Error('User does not exist')
                    }
                    const isEqual = await bcrypt.compare(args.password, teacher.password)
                    if(!isEqual) throw new Error('Invalid Password')
                    const token = jwt.sign({userId: teacher.id}, 'ninenine', {
                        expiresIn: '8760h'
                    })
                    return { userId: teacher.id, token: token, typeUser: 'Teacher', tokenExpiration: 8760 }
                }
                catch (err) {
                    return err
                }
            }
        },
        updateStudent: {
            // Abstracted v<0.5
            type: StudentType,
            args: {
                studentId: {type: GraphQLString},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                address: {type: GraphQLString},
                phoneNumber: {type: GraphQLString}
            },
            async resolve(parent, args) {
                try {
                    if(!req.userId) {
                        throw new Error('Unauthenticated')
                    }
                    if(!args.studentId) {
                        args.studentId = req.userId
                    }
                    const oldStudentInfo = await Student.findById(args.studentId)
                    var updatedStudent
                    if(!(oldStudentInfo.name == args.name)) {
                        updatedStudent = 
                    }
                    else if(!(oldStudentInfo.email == args.email)) {
                        
                    }
                    else if(!(oldStudentInfo.password == args.password)) {
                        
                    }
                    else if(!(oldStudentInfo.phoneNumber == args.phoneNumber)) {
                        
                    }
                }
                catch (err) {
                    console.log('Error Updating Student Details: ', err)
                    return err
                }
            }
        },
        updateTeacher: {
            // Abstracted v<0.5
            type: TeacherType,
            args: {

            }

        },
        endSession: {
            type: DoubtSession,
            args: {
                doubtSessionId: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args, req) {
                try {

                }
                catch (err) {
                    console.log('Error Ending the Session: ', err)
                    return err
                }
            }
        }
        // enrollStudent : ADMINROLE
        // enrollTeacher: ADMINROLE
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})