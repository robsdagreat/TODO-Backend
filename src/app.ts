import express, {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes/todo'
import userRoutes from './routes/user'

const app: Express = express()

const PORT: string | number | undefined = process?.env?.PORT

app.use(cors())
app.use("/api/v1/todo",todoRoutes)
app.use("/api/v1/user", userRoutes)

const uri: string =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster10.v4ojilb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10`




mongoose.connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}, connected to MongoDB`);
    });
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1)
});

            