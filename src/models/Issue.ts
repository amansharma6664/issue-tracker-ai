import mongoose from "mongoose";


const IssueSchema = new mongoose.Schema({
title: String,
description: String,
priority: String,
userId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });


export default mongoose.models.Issue || mongoose.model("Issue", IssueSchema);