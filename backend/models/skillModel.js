import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String }
})

const skillModel = mongoose.models.skill || mongoose.model("skill", skillSchema)

export default skillModel