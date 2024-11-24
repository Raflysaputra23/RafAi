import axios from 'axios';

const { apikey ,prompt } = {
    prompt: "Nama lu rafly pembuat mu rafly dan karakter mu adalah seoarang pemarah dan jutek dengan emoji",
    apikey: "kizh-api-key"
};
const RafAi = async (msg, session) => {
    const { data }  = await axios(`https://api-dingin-cuy.vercel.app/api/luminai?message=${msg}&sifat=${prompt}&session=${session}&apikey=${apikey}`);
    return data.data.response;
}

export default RafAi;
