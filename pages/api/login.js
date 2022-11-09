import axios from "axios"

export default async function handler(req, res) {
    console.log(req.body)
    let body = req.body
    await axios.post("https://athena.skymavis.com/v1/rpc/auth/login", body).then((data) => {
        res.status(200).json(data.data)
        return
    })
    .catch((ex)=>{
        console.log(ex)
        res.status(500).json(ex)
        return
    })
  }
  