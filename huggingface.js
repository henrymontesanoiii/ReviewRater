import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();
const access_token= process.env.huggingfacekey;
const inference= new HfInference(access_token);

const model = "nlpconnect/vit-gpt2-image-captioning";
const imageUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.speedhunters.com%2F2023%2F10%2Fis-the-best-g87-bmw-m2-a-modified-one%2F&psig=AOvVaw0yPC0_0WBxieUuLlPyl6y3&ust=1712019991230000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjRjc7pn4UDFQAAAAAdAAAAABAF";
const response = await fetch(imageUrl);
const imagebBlob = await response.blob();

const result = await inference.imageToText({
    data: imagebBlob,
    model: model
});
console.log(result);