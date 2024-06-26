import express from "express";
import Replicate from "replicate";

const app = express();

console.log("🚀 ~ app.get ~ process.env.REPLICATE_API_TOKEN:", process.env.REPLICATE_API_KEY)

app.use(express.json());

app.post('/generate', async (req, res) => {
    //const prompt = req.body.prompt;
    const { prompt } = req.body;
    
    console.log("🚀 ~ app.post ~ prompt:", prompt)
    if (!prompt){
        return res.status(400).json({ error: 'prompt is reqiered' });
    }
    
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY
    });

    const input = {
        cfg: 4.5,
        prompt,
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 79,
        negative_prompt: "ugly, distorted"
    };

    const output = await replicate.run("stability-ai/stable-diffusion-3", { input });
    console.log("🚀 ~ hola :", output)

    res.json(output)
})

app.listen(3001, () => console.log('Server on port 3001'));