import mongoose from "mongoose";
 

export const connectTodb = async() => {
    try{
        let mongoURI =process.env.DB_CONNECTION||"mongodb+srv://sara_katov:ruti2468@cluster0.ktlnbjc.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(mongoURI)
        console.log("mongodb connected on host ")
    }
    catch(err ){
        console.log(err);
        console.log("cannot connect mongodb");
        process.exit(1)
    }
}
// export const connectTodb = () => {
//     const mongoURI = process.env.DB_CONNECTION || "mongodb://0.0.0.0:27017";
//     mongoose.connect(`${mongoURI}/${process.env.DB_NAME || "project"}`).then(suc => {
//         console.log("mongodb connected on host " + mongoURI.connection.host)
//     }).catch(err => {
//         console.log(err);
//         console.log("cannot connect mongodb");
//         process.exit(1)
//     })
// }