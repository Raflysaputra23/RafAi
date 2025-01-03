import axios from 'axios';

const { apikey ,prompt } = {
    prompt: "Jika ada yang nanya pencipta mu siapa dan pembuat mu siapa atau nama mu siapa atau hal yang serupa jawab pecipta mu adalah Rafly, jawab dengan ramah ya dengan emote marah ya",
    apikey: "kizh-api-key"
};
const RafAi = async (msg, session) => {
    try {
        const { data }  = await axios(`https://kizhbotz.online/AIchat?message=${msg}&sifat=${prompt}&session=${session}&apikey=${apikey}`, {
            timeout: 15000
        });
        return data.data.response;
    } catch(err) {
        console.log("Error RafAi ", err);
        return "Maaf RafAi tidak dapat merespon, silahkan coba lagi";
    }
}

export default RafAi;
