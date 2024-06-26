import express from "express";
import Replicate from "replicate";

const app = express();

console.log("🚀 ~ app.get ~ process.env.REPLICATE_API_TOKEN:", process.env.REPLICATE_API_KEY)

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
});
app.use(express.json());

app.post('/generate', async (req, res) => {
    //const prompt = req.body.prompt;
    const { prompt } = req.body;
    
    console.log("🚀 ~ app.post ~ prompt:", prompt)
    if (!prompt){
        return res.status(400).json({ error: 'prompt is reqiered' });
    }
    

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

app.post('/chat',async (req, res)=>{
    
    const { prompt } = req.body;

    const input = {
        top_k:0,
        top_p:0.9,
        prompt,
        temperature: 0.6,
        length_penalty: 1,
        max_new_tokens: 128,
        prompt_template: "{prompt}",
        presente_penalty: 1.15
    };
    for await(const event of replicate.stream("meta/meta-llama-3-8b", { input ,})){
        //process.stdout.write(event.toString());
        res.write(event.toString());
    }
    res.end();
})

app.listen(3001, () => console.log('Server on port 3001'));